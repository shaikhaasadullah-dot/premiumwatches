import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'outline' | 'sale' | 'new';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className }) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border transition-colors';

  const variants = {
    gold: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    dark: 'bg-zinc-800/80 border-zinc-700 text-zinc-300',
    outline: 'border-zinc-700 text-zinc-400',
    sale: 'bg-red-500/20 border-red-500/40 text-red-400 font-bold',
    new: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold',
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
};
