import type { BookingStatus } from '@/types';
import { getStatusColor, getStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        colors.bg,
        colors.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <span
        className={cn(
          'rounded-full',
          size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
          status === 'in_progress' && 'pulse-active',
          status === 'en_route' && 'pulse-active'
        )}
        style={{
          backgroundColor: 'currentColor',
        }}
      />
      {label}
    </span>
  );
}
