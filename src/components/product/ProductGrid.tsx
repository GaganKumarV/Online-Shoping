import React from 'react';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/60 p-8 text-center sm:p-12">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
          <PackageOpen className="h-8 w-8 stroke-1" aria-hidden="true" />
        </div>
        <p className="eyebrow">Nothing here yet</p>
        <h2 className="mt-2 font-display text-2xl font-medium text-stone-900">
          No pieces match that search
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
          Try a different word, clear the category filter, or browse the full collection. The
          right piece is probably a click away.
        </p>
        <Link href="/products" className="btn-primary mt-6">
          View all pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
