import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SpotlightCarousel() {
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
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-5">
          In the spotlight
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {/* Banner 1: Spotless Home */}
            <Link
              to="/offer/spotless-home"
              className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[calc(33.333%-11px)] h-[240px] rounded-2xl overflow-hidden bg-[#F5F0EB] relative group/b"
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <p className="text-[10px] font-bold tracking-widest text-amber-800 uppercase">
                  Featured
                </p>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    Spotless homes,
                    <br />
                    zero stress.
                  </h3>
                  <p className="text-sm text-slate-600 max-w-[200px] mt-1">
                    Professional deep cleaning starting at just ₹499
                  </p>
                </div>
                <span className="inline-flex self-start px-5 py-2 text-sm font-semibold bg-slate-900 text-white rounded-lg group-hover/b:bg-slate-700 transition-colors">
                  Explore
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                alt="Spotless homes — professional deep cleaning starting at ₹499"
                className="absolute right-0 top-0 w-[50%] h-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-0 top-0 w-[55%] h-full bg-gradient-to-r from-[#F5F0EB] to-[#F5F0EB]/20 z-[1]" />
            </Link>

            {/* Banner 2: Instant Help */}
            <Link
              to="/offer/instant-help"
              className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[calc(33.333%-11px)] h-[240px] rounded-2xl overflow-hidden relative group/b bg-fp-blue-700"
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <span className="self-start px-3 py-1 text-[10px] font-bold bg-fp-orange-500 text-white rounded-full shadow-md">
                  15 mins
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md">
                    Instant Help
                    <br />
                    on Demand
                  </h3>
                  <p className="text-sm text-white/80 max-w-[220px] mt-1">
                    Trained professionals at your doorstep — fast & reliable.
                  </p>
                </div>
                <span className="inline-flex self-start px-5 py-2 text-sm font-semibold bg-white text-slate-900 rounded-lg group-hover/b:bg-slate-100 transition-colors shadow-md">
                  Book Now
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
                alt="Instant help on demand — professionals at your doorstep in 15 minutes"
                className="absolute right-0 top-0 w-[50%] h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-fp-blue-700 via-fp-blue-700/95 via-60% to-fp-blue-700/30 z-[1]" />
            </Link>

            {/* Banner 3: Weekend Special */}
            <Link
              to="/offer/weekend-special"
              className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[calc(33.333%-11px)] h-[240px] rounded-2xl overflow-hidden relative group/b"
              style={{ background: 'linear-gradient(135deg, #E11D48 0%, #DB2777 100%)' }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <span className="self-start px-3 py-1 text-[10px] font-bold bg-green-500 text-white rounded-full shadow-md">
                  25% OFF
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md">
                    Weekend
                    <br />
                    Special Packages
                  </h3>
                  <p className="text-sm text-white/80 max-w-[200px] mt-1">
                    Curated service combos for a productive weekend.
                  </p>
                </div>
                <span className="inline-flex self-start px-5 py-2 text-sm font-semibold bg-white text-slate-900 rounded-lg group-hover/b:bg-slate-100 transition-colors shadow-md">
                  Book Now
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
                alt="Weekend special — 25% off curated service packages"
                className="absolute right-0 top-0 w-[50%] h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to right, #DB2777 0%, rgba(219,39,119,0.95) 55%, rgba(219,39,119,0.3) 100%)' }} />
            </Link>
          </div>

          {/* Scroll arrows — always visible when scrollable */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all"
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
