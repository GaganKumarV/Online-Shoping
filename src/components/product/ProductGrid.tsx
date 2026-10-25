'use client';

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
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
          <PackageOpen className="h-8 w-8 stroke-1" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          We couldn&apos;t find any items matching your current filters. Try resetting or searching for different keywords.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
        >
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

