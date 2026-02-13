import SectionLabel from '@/components/shared/SectionLabel';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { Search, UserCheck, CheckCircle } from 'lucide-react';

const stepIcons = [Search, UserCheck, CheckCircle];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel label="How It Works" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            3 easy steps to get help
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            No accounts? No problem. Quick sign-up, choose a service, and
            we handle the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((item, i) => {
            const Icon = stepIcons[i];
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-8 border border-slate-100 text-center"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-fp-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-fp-blue-700/20">
                  {item.step}
                </div>

                <div className="w-14 h-14 mx-auto mb-5 bg-fp-blue-50 rounded-2xl flex items-center justify-center border border-fp-blue-100">
                  <Icon className="w-7 h-7 text-fp-orange-500" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>

                {/* Connector line */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
