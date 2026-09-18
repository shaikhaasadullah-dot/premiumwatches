import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  max = 5,
  size = 'md',
  showCount = false,
  count,
  className,
}) => {
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const fillPercentage = Math.max(0, Math.min(1, rating - i));
          return (
            <div key={i} className="relative">
              <Star className={cn(iconSizes[size], 'text-zinc-700')} />
              {fillPercentage > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star className={cn(iconSizes[size], 'text-amber-400 fill-amber-400')} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-zinc-400 font-medium ml-1">
          {rating.toFixed(1)} {count !== undefined && `(${count})`}
        </span>
      )}
    </div>
  );
};
