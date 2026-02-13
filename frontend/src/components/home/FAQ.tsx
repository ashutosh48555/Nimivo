import { useState } from 'react';
import SectionLabel from '@/components/shared/SectionLabel';
import { FAQ_ITEMS } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel label="FAQ" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-48 pb-4' : 'max-h-0'
                  )}
                >
                  <p className="px-6 text-sm text-slate-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
