import { cn } from '@/lib/utils';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-fp-orange-600 bg-fp-orange-50 rounded-full border border-fp-orange-100',
        className
      )}
    >
      {label}
    </span>
  );
}
