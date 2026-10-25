import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/db';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilterParams } from '@/types';

export const metadata: Metadata = {
  title: 'All Products – Books & Electronics',
  description: 'Browse our full catalog of tech books and electronics with flexible filters and sorting.',
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/products" className="hover:text-slate-900 transition-colors">
          Catalog
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-slate-900">{categoryName}</span>
          </>
        )}
      </nav>

      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {category ? `${categoryName}` : 'All Pieces'}
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Discover handpicked tech publications and developer electronics. All items are verified authentic and backed by our express delivery.
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

