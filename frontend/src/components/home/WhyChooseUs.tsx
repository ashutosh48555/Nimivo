import SectionLabel from '@/components/shared/SectionLabel';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { Clock, ShieldCheck, IndianRupee, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  'shield-check': ShieldCheck,
  'indian-rupee': IndianRupee,
  'map-pin': MapPin,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel label="Why FastPAYS" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Built for speed, trust & convenience
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || Clock;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
