import { getServiceCategoryColor, formatPrice, formatDuration } from '@/lib/utils';
import type { Service } from '@/types';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const categoryColor = getServiceCategoryColor(service.category);

  return (
    <Link
      to={`/book/${service.id}`}
      className={cn(
        'group relative block bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden',
        className
      )}
    >
      {/* Colored left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: categoryColor }}
      />

      <div className="flex flex-col h-full">
        {/* Icon + Title */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
              {service.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">
                {formatDuration(service.estimatedDurationMinutes)}
              </span>
            </div>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: `${categoryColor}15` }}
          >
            {service.category === 'cleaning' && '🏠'}
            {service.category === 'plumbing' && '🔧'}
            {service.category === 'electrical' && '⚡'}
            {service.category === 'carpentry' && '🪚'}
            {service.category === 'painting' && '🎨'}
            {service.category === 'salon' && '✂️'}
          </div>
        </div>

        {/* Description (clamped) */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
          {service.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div>
            <span className="text-xs text-slate-400">Starting at</span>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(service.basePrice)}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-emerald-500 group-hover:gap-2 transition-all">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
