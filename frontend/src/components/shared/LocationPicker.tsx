import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Navigation, X, Loader2, Search, Clock } from 'lucide-react';
import { useLocationStore } from '@/store/locationStore';
import { cn } from '@/lib/utils';

/* ── Google Places typings (minimal) ──────────────────── */
interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

/* ── Saved recent locations (localStorage) ──────────── */
const RECENT_KEY = 'fp-recent-locations';
const MAX_RECENT = 5;

function getRecent(): { label: string; lat: number | null; lng: number | null }[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function addRecent(loc: { label: string; lat: number | null; lng: number | null }) {
  const list = getRecent().filter((l) => l.label !== loc.label);
  list.unshift(loc);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
}

/* ── Component ────────────────────────────────────────── */
export default function LocationPicker() {
  const { label, setLocation } = useLocationStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState('');
  const [recentLocations] = useState(getRecent);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const googleLoaded = typeof google !== 'undefined' && google.maps?.places;

  // Init Google services
  useEffect(() => {
    if (googleLoaded) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      geocoder.current = new google.maps.Geocoder();
    }
  }, [googleLoaded]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  /* ── Google autocomplete search ──────────────────────── */
  const searchPlaces = useCallback(
    (input: string) => {
      if (!input.trim() || !autocompleteService.current) {
        setPredictions([]);
        return;
      }
      autocompleteService.current.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'in' },
          types: ['geocode', 'establishment'],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(results as unknown as PlacePrediction[]);
          } else {
            setPredictions([]);
          }
        }
      );
    },
    []
  );

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setPredictions([]);
      return;
    }
    const timer = setTimeout(() => searchPlaces(query), 300);
    return () => clearTimeout(timer);
  }, [query, searchPlaces]);

  /* ── Select a place from predictions ──────────────── */
  const selectPlace = useCallback(
    (prediction: PlacePrediction) => {
      const short = prediction.structured_formatting.main_text;
      if (geocoder.current) {
        geocoder.current.geocode({ placeId: prediction.place_id }, (results, status) => {
          if (status === 'OK' && results?.[0]?.geometry?.location) {
            const loc = results[0].geometry.location;
            setLocation(short, loc.lat(), loc.lng());
            addRecent({ label: short, lat: loc.lat(), lng: loc.lng() });
          } else {
            setLocation(short);
            addRecent({ label: short, lat: null, lng: null });
          }
        });
      } else {
        setLocation(short);
        addRecent({ label: short, lat: null, lng: null });
      }
      setQuery('');
      setPredictions([]);
      setOpen(false);
      setError('');
    },
    [setLocation]
  );

  /* ── Detect current location ─────────────────────── */
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setDetecting(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (geocoder.current) {
          geocoder.current.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setDetecting(false);
              if (status === 'OK' && results?.[0]) {
                // Try to get a concise name (locality or sublocality)
                const components = results[0].address_components;
                const locality =
                  components.find((c) => c.types.includes('sublocality_level_1'))?.long_name ||
                  components.find((c) => c.types.includes('locality'))?.long_name ||
                  components.find((c) => c.types.includes('administrative_area_level_2'))?.long_name ||
                  results[0].formatted_address.split(',')[0];
                setLocation(locality, latitude, longitude);
                addRecent({ label: locality, lat: latitude, lng: longitude });
                setOpen(false);
              } else {
                setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, latitude, longitude);
                setOpen(false);
              }
            }
          );
        } else {
          // Fallback without Google Geocoder — use a free reverse-geocoding call
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((r) => r.json())
            .then((data) => {
              const locality =
                data.address?.suburb ||
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.display_name?.split(',')[0] ||
                `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
              setLocation(locality, latitude, longitude);
              addRecent({ label: locality, lat: latitude, lng: longitude });
              setOpen(false);
            })
            .catch(() => {
              setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, latitude, longitude);
              setOpen(false);
            })
            .finally(() => setDetecting(false));
        }
      },
      (err) => {
        setDetecting(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location access denied. Please allow location in browser settings.');
        } else {
          setError('Unable to detect location. Please enter manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [setLocation]);

  /* ── Fallback search (no Google API key) ────────── */
  const searchFallback = useCallback(
    async (input: string) => {
      if (!input.trim()) return;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5&countrycodes=in`
        );
        const data = await res.json();
        // Map to the same shape as Google predictions
        const mapped: PlacePrediction[] = data.map((item: any) => ({
          place_id: item.place_id?.toString() || item.osm_id?.toString(),
          description: item.display_name,
          structured_formatting: {
            main_text: item.address?.suburb || item.address?.city || item.address?.town || item.display_name?.split(',')[0] || item.name,
            secondary_text: item.display_name?.split(',').slice(1).join(',').trim() || '',
          },
        }));
        setPredictions(mapped);
      } catch {
        setPredictions([]);
      }
    },
    []
  );

  // Fallback debounced search when Google not available
  useEffect(() => {
    if (googleLoaded) return;
    if (!query.trim()) {
      setPredictions([]);
      return;
    }
    const timer = setTimeout(() => searchFallback(query), 400);
    return () => clearTimeout(timer);
  }, [query, googleLoaded, searchFallback]);

  const selectFallbackPlace = useCallback(
    (prediction: PlacePrediction) => {
      setLocation(prediction.structured_formatting.main_text);
      addRecent({ label: prediction.structured_formatting.main_text, lat: null, lng: null });
      setQuery('');
      setPredictions([]);
      setOpen(false);
      setError('');
    },
    [setLocation]
  );

  const displayLabel = label || 'Select Location';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-52',
          open
            ? 'bg-white ring-2 ring-fp-blue-500 shadow-lg'
            : 'bg-slate-100 hover:bg-slate-200'
        )}
      >
        <MapPin className={cn('w-4 h-4 flex-shrink-0', label ? 'text-fp-orange-500' : 'text-slate-400')} />
        <span className={cn('truncate text-left flex-1', label ? 'text-slate-800 font-medium' : 'text-slate-500')}>
          {displayLabel}
        </span>
        <ChevronDown className={cn('w-4 h-4 flex-shrink-0 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Input */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search area, street, city..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fp-blue-500 focus:bg-white focus:border-transparent transition-all placeholder-slate-400"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setPredictions([]); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Detect Location Button */}
          <button
            onClick={detectLocation}
            disabled={detecting}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-fp-blue-50 transition-colors group border-b border-slate-50"
          >
            {detecting ? (
              <Loader2 className="w-5 h-5 text-fp-blue-600 animate-spin" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-fp-blue-50 flex items-center justify-center group-hover:bg-fp-blue-100 transition-colors">
                <Navigation className="w-4 h-4 text-fp-blue-600" />
              </div>
            )}
            <div className="text-left">
              <p className="font-semibold text-fp-blue-700 group-hover:text-fp-blue-800">
                {detecting ? 'Detecting...' : 'Use my current location'}
              </p>
              <p className="text-xs text-slate-400">Using GPS</p>
            </div>
          </button>

          {/* Error */}
          {error && (
            <div className="px-4 py-2 bg-red-50 text-xs text-red-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Predictions List */}
          {predictions.length > 0 && (
            <div className="max-h-[240px] overflow-y-auto">
              <p className="px-4 pt-2.5 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Search Results
              </p>
              {predictions.map((p) => (
                <button
                  key={p.place_id}
                  onClick={() => googleLoaded ? selectPlace(p) : selectFallbackPlace(p)}
                  className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors group/item"
                >
                  <MapPin className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0 group-hover/item:text-fp-orange-500 transition-colors" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {p.structured_formatting.main_text}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {p.structured_formatting.secondary_text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Locations */}
          {predictions.length === 0 && !query && recentLocations.length > 0 && (
            <div className="max-h-[200px] overflow-y-auto">
              <p className="px-4 pt-2.5 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Recent
              </p>
              {recentLocations.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setLocation(loc.label, loc.lat, loc.lng);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors group/item"
                >
                  <Clock className="w-4 h-4 text-slate-300 flex-shrink-0 group-hover/item:text-fp-blue-500 transition-colors" />
                  <span className="text-sm text-slate-700 truncate">{loc.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Empty state when searching */}
          {query && predictions.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-slate-400">No locations found</p>
              <p className="text-xs text-slate-300 mt-1">Try a different search term</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              {googleLoaded ? 'Powered by Google Maps' : 'Powered by OpenStreetMap'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export ChevronDown for internal use
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
