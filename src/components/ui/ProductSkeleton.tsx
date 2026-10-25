import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="surface-card p-4">
      <div className="mb-4 aspect-square w-full animate-pulse rounded-xl bg-stone-100 motion-reduce:animate-none" />
      <div className="space-y-2">
        <div className="h-3 w-20 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
        <div className="flex items-center justify-between pt-3">
          <div className="h-5 w-16 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
          <div className="h-11 w-20 animate-pulse rounded-xl bg-stone-100 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div role="status" aria-busy="true" className="space-y-4">
      <span className="sr-only">Loading products…</span>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
