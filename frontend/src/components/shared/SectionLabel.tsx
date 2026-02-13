import { cn } from '@/lib/utils';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-emerald-600 bg-emerald-50 rounded-full',
        className
      )}
    >
      {label}
    </span>
  );
}
