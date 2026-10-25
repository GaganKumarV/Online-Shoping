import React from 'react';
import { ProductGridSkeleton } from '@/components/ui/ProductSkeleton';

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-3 w-40 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
      <div className="space-y-3">
        <div className="h-9 w-64 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
      </div>
      <div className="surface-card h-32 animate-pulse bg-stone-50 motion-reduce:animate-none" />
      <ProductGridSkeleton />
    </div>
  );
}
