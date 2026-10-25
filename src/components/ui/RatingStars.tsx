import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingStars({ rating, showValue = true, size = 'sm' }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];

  return (
    <div
      className="inline-flex items-center gap-1.5"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}
    >
      <div className="flex items-center text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses} fill-amber-400`} aria-hidden="true" />
        ))}
        {hasHalfStar && <StarHalf className={`${sizeClasses} fill-amber-400`} aria-hidden="true" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses} text-stone-200 fill-stone-100`} aria-hidden="true" />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold tabular-nums text-stone-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
