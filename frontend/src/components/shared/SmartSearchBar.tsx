import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Clock, ArrowRight, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOST_BOOKED,
  CLEANING_SERVICES,
  APPLIANCE_SERVICES,
  REPAIR_SERVICES,
  SALON_MEN,
  SALON_WOMEN,
  SERVICE_CATEGORIES,
} from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';

/* ── Build a flat searchable catalogue ──────────────── */
interface SearchableService {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  icon: string;
  price: number;
  rating: number;
  image: string;
}

function buildCatalogue(): SearchableService[] {
  const seen = new Set<string>();
  const all: SearchableService[] = [];

  const addItems = (items: ServiceItem[], catValue: string) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.value === catValue);
    for (const item of items) {
      if (seen.has(item.name.toLowerCase())) continue;
      seen.add(item.name.toLowerCase());
      all.push({
        id: item.id,
        name: item.name,
        category: catValue,
        categoryLabel: cat?.label || catValue,
        icon: cat?.icon || '🔧',
        price: item.price,
        rating: item.rating,
        image: item.image,
      });
    }
  };

  addItems(MOST_BOOKED, 'cleaning');
  addItems(CLEANING_SERVICES, 'cleaning');
  addItems(APPLIANCE_SERVICES, 'electrical');
  addItems(REPAIR_SERVICES, 'plumbing');
  addItems(SALON_MEN, 'salon');
  addItems(SALON_WOMEN, 'salon');

  // Also add the main service categories themselves
  for (const cat of SERVICE_CATEGORIES) {
    if (!seen.has(cat.label.toLowerCase())) {
      seen.add(cat.label.toLowerCase());
      all.push({
        id: `cat-${cat.value}`,
        name: cat.label,
        category: cat.value,
        categoryLabel: cat.label,
        icon: cat.icon,
        price: 0,
        rating: 0,
        image: '',
      });
    }
  }

  return all;
}

/* ── Dynamic placeholder texts ──────────────────────── */
const PLACEHOLDER_ITEMS = [
  'AC Service & Repair',
  'Haircut for Men',
  'Deep Cleaning',
  'Electrician Visit',
  'Plumber Consultation',
  'Facial & Cleanup',
  'Washing Machine Repair',
  'Carpenter Work',
  'Geyser Check-up',
  'Manicure & Pedicure',
  'Beard Trimming',
  'Kitchen Deep Cleaning',
  'Sofa Cleaning',
  'Bridal Makeup',
  'Water Purifier Service',
];

/* ── Trending searches ──────────────────────────────── */
const TRENDING_SEARCHES = [
  { text: 'AC Repair', icon: '❄️' },
  { text: 'Electrician', icon: '⚡' },
  { text: 'Deep Cleaning', icon: '🏠' },
  { text: 'Haircut', icon: '✂️' },
  { text: 'Plumber', icon: '🔧' },
  { text: 'Facial', icon: '💆' },
];

/* ── Component ──────────────────────────────────────── */
export default function SmartSearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('fp-recent-searches') || '[]'); }
    catch { return []; }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const catalogue = useMemo(() => buildCatalogue(), []);

  /* ── Typewriter placeholder effect ───────────────── */
  useEffect(() => {
    if (query) return; // Don't animate when user is typing
    const currentText = PLACEHOLDER_ITEMS[placeholderIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIdx < currentText.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), 60);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), 30);
      } else {
        setIsDeleting(false);
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_ITEMS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, placeholderIdx, query]);

  const dynamicPlaceholder = query ? '' : `Search for '${PLACEHOLDER_ITEMS[placeholderIdx].slice(0, charIdx)}'`;

  /* ── Fast fuzzy search ───────────────────────────── */
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/);

    return catalogue
      .map((item) => {
        const name = item.name.toLowerCase();
        const catLabel = item.categoryLabel.toLowerCase();

        // Multi-token matching
        let score = 0;
        let allTokensMatch = true;
        for (const token of tokens) {
          if (name.includes(token)) {
            score += name.startsWith(token) ? 3 : name.indexOf(token) === 0 ? 2 : 1;
          } else if (catLabel.includes(token)) {
            score += 0.5;
          } else {
            allTokensMatch = false;
          }
        }

        if (!allTokensMatch) return null;

        // Boost exact start matches
        if (name.startsWith(q)) score += 5;
        // Boost by rating
        score += item.rating / 10;

        return { ...item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, 8) as (SearchableService & { score: number })[];
  }, [query, catalogue]);

  /* ── Close on outside click ──────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* ── Keyboard navigation ─────────────────────────── */
  const [activeIdx, setActiveIdx] = useState(-1);

  /* ── Select a service ────────────────────────────── */
  const selectService = useCallback((name: string, id?: string) => {
    // Save to recent
    const updated = [name, ...recentSearches.filter((s) => s !== name)].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('fp-recent-searches', JSON.stringify(updated));

    setQuery('');
    setOpen(false);
    // Navigate to service detail if we have an id, otherwise search
    if (id) {
      navigate(`/service/${id}`);
    } else {
      // Try to find the item by name
      const found = catalogue.find((i) => i.name.toLowerCase() === name.toLowerCase());
      navigate(found ? `/service/${found.id}` : '/book');
    }
  }, [navigate, recentSearches, catalogue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
    if (!open) return;

    const maxIdx = results.length > 0 ? results.length - 1 : -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, maxIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0 && results[activeIdx]) {
      e.preventDefault();
      selectService(results[activeIdx].name, results[activeIdx].id);
    }
  }, [open, results, activeIdx, selectService]);

  useEffect(() => { setActiveIdx(-1); }, [query]);

  const handleTrendingClick = useCallback((text: string) => {
    setQuery(text);
    inputRef.current?.focus();
  }, []);

  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('fp-recent-searches');
  }, []);

  return (
    <div className="flex-1 relative" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className={cn(
            'h-4 w-4 transition-colors duration-200',
            open ? 'text-fp-blue-600' : 'text-slate-400 group-focus-within:text-fp-blue-600'
          )} />
        </div>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label="Search services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'block w-full pl-10 pr-9 py-2.5 border-none rounded-xl leading-5 text-slate-900 placeholder-slate-400 text-sm transition-all duration-200',
            open
              ? 'bg-white ring-2 ring-fp-blue-500 shadow-lg'
              : 'bg-slate-100 focus:bg-white focus:ring-2 focus:ring-fp-blue-500 focus:shadow-lg'
          )}
          placeholder={dynamicPlaceholder}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] overflow-hidden">

          {/* Search Results */}
          {results.length > 0 && (
            <div className="max-h-[320px] overflow-y-auto">
              <div className="px-4 pt-3 pb-1.5">
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Services
                </p>
              </div>
              {results.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => selectService(item.name, item.id)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors group/item',
                    idx === activeIdx ? 'bg-fp-blue-50' : 'hover:bg-slate-50'
                  )}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {highlightMatch(item.name, query)}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{item.categoryLabel}</span>
                      {item.price > 0 && (
                        <>
                          <span className="text-slate-200">·</span>
                          <span className="text-xs font-semibold text-fp-blue-700">₹{item.price}</span>
                        </>
                      )}
                      {item.rating > 0 && (
                        <>
                          <span className="text-slate-200">·</span>
                          <span className="text-xs text-amber-600">★ {item.rating.toFixed(1)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover/item:text-fp-blue-500 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Empty state when searching */}
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No services found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try a different keyword</p>
            </div>
          )}

          {/* Default view: Trending + Recent */}
          {!query && (
            <>
              {/* Trending Searches */}
              <div className="px-4 pt-3 pb-2">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-fp-orange-500" />
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Trending Now
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item.text}
                      onClick={() => handleTrendingClick(item.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-fp-blue-50 hover:text-fp-blue-700 rounded-full transition-colors border border-slate-100 hover:border-fp-blue-200"
                    >
                      <span>{item.icon}</span>
                      {item.text}
                      <TrendingUp className="w-3 h-3 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="border-t border-slate-50 mt-2 pt-2 pb-1">
                  <div className="flex items-center justify-between px-4 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        Recent
                      </p>
                    </div>
                    <button
                      onClick={clearRecent}
                      className="text-[10px] font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((text) => (
                    <button
                      key={text}
                      onClick={() => { setQuery(text); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-50 transition-colors"
                    >
                      <Clock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      <span className="text-sm text-slate-600 truncate">{text}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] text-slate-400">
              {catalogue.length} services available
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-500 font-mono">↑↓</kbd>
              navigate
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-500 font-mono ml-1">⏎</kbd>
              select
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Helper: highlight matching text ──────────────── */
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-fp-blue-700 font-bold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
