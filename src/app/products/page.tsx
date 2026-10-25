import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/db';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilterParams } from '@/types';

export const metadata: Metadata = {
  title: 'All Pieces – Ceramics, Textiles, Lighting \u0026 Decor',
  description: 'Browse our handmade Indian home decor: ceramics, block-printed textiles, artisan lighting, and slow-made objects.',
};

export const revalidate = 60;

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: ProductFilterParams['sort'];
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category;
  const search = searchParams.search;
  const sort = searchParams.sort || 'featured';
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;

  const [products, categories] = await Promise.all([
    getProducts({
      category,
      search,
      sort,
      minPrice,
      maxPrice,
    }),
    getCategories(),
  ]);

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Pieces';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/products" className="hover:text-stone-900 transition-colors">
          Catalog
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-stone-900">{categoryName}</span>
          </>
        )}
      </nav>

      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
          {category ? `${categoryName}` : 'All Pieces'}
        </h1>
        <p className="text-sm text-stone-500 max-w-2xl">
          Handmade in India by skilled artisans. Discover ceramics, block-printed textiles, artisan lighting, and slow-made objects for your home.
        </p>
      </div>

      {/* Interactive Filters Bar */}
      <ProductFilters
        currentCategory={category}
        currentSort={sort}
        currentSearch={search || ''}
        categories={categories}
        totalProducts={products.length}
      />

      {/* Products Grid / Empty state */}
      <ProductGrid products={products} />
    </div>
  );
}

