import SectionLabel from '@/components/shared/SectionLabel';
import ServiceCard from '@/components/shared/ServiceCard';
import { MOCK_SERVICES } from '@/lib/constants';
import type { Service } from '@/types';

export default function ServiceGrid() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel label="Our Services" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            What do you need help with?
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            From emergency plumbing to scheduled deep cleaning — pick a service
            and we'll send a verified professional to your door in minutes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service as Service} />
          ))}
        </div>
      </div>
    </section>
  );
}
