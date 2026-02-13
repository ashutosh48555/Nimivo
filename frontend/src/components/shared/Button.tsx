import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 text-white hover:shadow-lg hover:shadow-fp-orange-500/30 hover:scale-105 active:scale-95 border border-transparent',
  secondary:
    'bg-fp-blue-900 text-white hover:bg-fp-blue-800 hover:shadow-lg hover:shadow-fp-blue-900/20 active:scale-95',
  outline:
    'border-2 border-fp-blue-200 text-fp-blue-700 hover:bg-fp-blue-50 active:bg-fp-blue-100 hover:border-fp-blue-300',
  ghost: 'text-fp-slate-500 hover:bg-fp-slate-50 hover:text-fp-blue-700',
  danger: 'bg-fp-error text-white hover:bg-red-600 shadow-sm active:scale-95',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs rounded-full uppercase tracking-wide',
  md: 'px-6 py-3 text-sm rounded-full',
  lg: 'px-8 py-4 text-base rounded-full font-bold',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-heading transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fp-orange-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
