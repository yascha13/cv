import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  const variants = {
    default: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border border-slate-300 bg-white hover:bg-slate-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button
      className={cn('rounded-md px-4 py-2 text-sm font-medium transition', variants[variant], className)}
      {...props}
    />
  );
}
