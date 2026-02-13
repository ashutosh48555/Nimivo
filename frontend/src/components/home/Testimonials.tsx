import SectionLabel from '@/components/shared/SectionLabel';
import { MOCK_TESTIMONIALS } from '@/lib/constants';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel label="Testimonials" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Loved by thousands of homeowners
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-100"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
