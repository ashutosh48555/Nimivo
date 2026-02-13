import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { ServiceItem } from '@/lib/constants';

interface ServiceCategoryRowProps {
  title: string;
  subtitle?: string;
  seeAllLink?: string;
  items: ServiceItem[];
}

export default function ServiceCategoryRow({
  title,
  subtitle,
  seeAllLink,
  items,
}: ServiceCategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -400 : 400,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          {seeAllLink && (
            <Link
              to={seeAllLink}
              className="text-sm font-semibold text-fp-blue-600 hover:text-fp-blue-700 transition-colors whitespace-nowrap"
            >
              See all
            </Link>
          )}
        </div>

        {/* Scrollable Row */}
        <div className="relative">
          {/* Left Arrow — always visible when scrollable */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-[90px] z-20 w-10 h-10 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {items.map((item) => (
              <Link
                to="/book"
                key={item.id}
                className="flex-shrink-0 w-[170px] sm:w-[190px] group/card"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                  {item.badge && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] font-bold bg-fp-orange-500 text-white rounded-md z-10 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <h4 className="text-sm font-medium text-slate-900 leading-snug mb-1 line-clamp-2 group-hover/card:text-fp-blue-700 transition-colors">
                  {item.name}
                </h4>

                <div className="flex items-center gap-1 text-xs mb-1">
                  <Star className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                  <span className="font-semibold text-slate-900">
                    {item.rating.toFixed(2)}
                  </span>
                  <span className="text-slate-400">({item.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow — always visible when scrollable */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-[90px] z-20 w-10 h-10 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
