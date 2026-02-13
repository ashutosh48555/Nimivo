import { Star, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import SectionLabel from '../shared/SectionLabel';

// Duplicate testimonials to create a seamless loop
// We need enough items to fill the screen width multiple times for smoothness
const TESTIMONIALS_ROW1 = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS];
const TESTIMONIALS_ROW2 = [...[...MOCK_TESTIMONIALS].reverse(), ...[...MOCK_TESTIMONIALS].reverse(), ...[...MOCK_TESTIMONIALS].reverse()];

const TestimonialCard = ({ t }: { t: typeof MOCK_TESTIMONIALS[0] }) => (
  <div
    className="flex-shrink-0 w-[400px] p-6 mx-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-fp-blue-50 rounded-full flex items-center justify-center border border-fp-blue-100 group-hover:bg-fp-blue-600 transition-colors duration-300">
          {t.avatar ? (
            <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-fp-blue-600 group-hover:text-white transition-colors duration-300">
              {t.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 leading-tight text-lg">{t.name}</h4>
          <p className="text-sm text-slate-500">{t.city}</p>
        </div>
      </div>
      <Quote className="w-8 h-8 text-fp-blue-100 group-hover:text-fp-blue-200 transition-colors" />
    </div>

    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
          )}
        />
      ))}
    </div>

    <p className="text-slate-600 text-base leading-relaxed group-hover:text-slate-900 transition-colors line-clamp-3">
      "{t.text}"
    </p>
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <SectionLabel label="Testimonials" className="mb-4" />
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 font-heading mb-6">
          Trusted by thousands of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fp-blue-700 to-fp-blue-600">
            happy homeowners
          </span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See why 5000+ customers rate us 4.9/5 stars. We bring professionalism and peace of mind to your doorstep.
        </p>
      </div>

      <div className="relative w-full overflow-hidden pause-on-hover space-y-8 pb-10">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left to Right (animate-marquee moves Left) */}
        <div className="flex w-max animate-marquee">
          {TESTIMONIALS_ROW1.map((t, i) => (
            <TestimonialCard key={`${t.id}-r1-${i}`} t={t} />
          ))}
        </div>

        {/* Row 2: Right to Left (animate-marquee-reverse moves Right) */}
        <div className="flex w-max animate-marquee-reverse">
          {TESTIMONIALS_ROW2.map((t, i) => (
            <TestimonialCard key={`${t.id}-r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
