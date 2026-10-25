'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, RotateCcw, X, Loader2 } from 'lucide-react';

interface ProductFiltersProps {
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
  categories: { name: string; slug: string; count: number }[];
  totalProducts: number;
}

export function ProductFilters({
  currentCategory = 'all',
  currentSort = 'featured',
  currentSearch = '',
  categories,
  totalProducts,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    startTransition(() => {
      router.push(query ? `/products?${query}` : '/products', { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get('filter-search');
    updateFilters({ search: typeof value === 'string' ? value.trim() : null });
  };

  const handleReset = () => {
    startTransition(() => router.push('/products', { scroll: false }));
  };

  const activeCategory = currentCategory || 'all';
  const hasActiveFilters =
    activeCategory !== 'all' || currentSearch.length > 0 || currentSort !== 'featured';

  return (
    <div className="surface-card space-y-4 p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Category pills */}
        <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => updateFilters({ category: null })}
            aria-pressed={activeCategory === 'all'}
            className={`inline-flex min-h-11 flex-shrink-0 snap-start items-center rounded-full px-4 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 ${
              activeCategory === 'all'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateFilters({ category: cat.slug })}
              aria-pressed={activeCategory === cat.slug}
              className={`inline-flex min-h-11 flex-shrink-0 snap-start items-center rounded-full px-4 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 ${
                activeCategory === cat.slug
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              {cat.name} <span className="ml-1.5 tabular-nums opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Search + sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form role="search" onSubmit={handleSearchSubmit} className="relative sm:w-56">
            <label htmlFor="filter-search" className="sr-only">
              Search within the product catalog
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              key={currentSearch}
              id="filter-search"
              name="filter-search"
              type="search"
              defaultValue={currentSearch}
              placeholder="Search pieces…"
              autoComplete="off"
              className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 py-2 pl-9 pr-9 text-sm text-stone-900 placeholder:text-stone-500 focus:border-amber-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
            {currentSearch && (
              <button
                type="button"
                onClick={() => updateFilters({ search: null })}
                aria-label="Clear the catalog search"
                className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </form>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-stone-600"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
              <span>Sort</span>
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="h-11 rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-800 focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Result status */}
      <div
        role="status"
        aria-live="polite"
        className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500"
      >
        <span className="inline-flex items-center gap-2">
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-800" aria-hidden="true" />}
          Showing <span className="font-semibold text-stone-800">{totalProducts}</span>{' '}
          {totalProducts === 1 ? 'piece' : 'pieces'}
          {currentCategory && currentCategory !== 'all' && (
            <span className="capitalize text-stone-500">in {currentCategory}</span>
          )}
        </span>
        {currentSearch && (
          <span className="max-w-full truncate">
            Search: <span className="font-medium text-stone-700">“{currentSearch}”</span>
          </span>
        )}
      </div>
    </div>
  );
}
