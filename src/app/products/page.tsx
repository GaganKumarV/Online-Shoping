import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/db';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilterParams } from '@/types';

export const metadata: Metadata = {
  title: 'All Pieces – Ceramics, Textiles, Lighting & Objects',
  description:
    'Browse handmade Indian home decor: wheel-thrown ceramics, block-printed textiles, artisan lighting, and small-batch objects.',
  openGraph: {
    title: 'All Pieces – Mati Living',
    description:
      'Browse wheel-thrown ceramics, block-printed textiles, artisan lighting, and small-batch objects made across India.',
  },
};

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  ceramics: 'Ceramics',
  textiles: 'Textiles',
  lighting: 'Lighting',
  decor: 'Objects',
};

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
    ? CATEGORY_LABELS[category.toLowerCase()] ??
      category.charAt(0).toUpperCase() + category.slice(1)
    : 'All pieces';

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="rounded transition-colors hover:text-stone-900">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <Link href="/products" className="rounded transition-colors hover:text-stone-900">
          Collection
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            <span aria-current="page" className="font-semibold text-stone-900">
              {categoryName}
            </span>
          </>
        )}
      </nav>

      {/* Heading */}
      <header className="max-w-2xl">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          {categoryName}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
          {category
            ? `Pieces from our ${categoryName.toLowerCase()} collection, made in small batches by artisan workshops across India.`
            : 'Wheel-thrown ceramics, block-printed textiles, warm lighting, and small-batch objects — all made by hand in India.'}
        </p>
      </header>

      <ProductFilters
        currentCategory={category}
        currentSort={sort}
        currentSearch={search || ''}
        categories={categories}
        totalProducts={products.length}
      />

      <ProductGrid products={products} />
    </div>
  );
}
