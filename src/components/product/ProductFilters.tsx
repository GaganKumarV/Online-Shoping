'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

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

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/products');
  };

  const hasActiveFilters =
    (currentCategory && currentCategory !== 'all') ||
    currentSearch.length > 0 ||
    (currentSort && currentSort !== 'featured');

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Top Filter Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => updateFilters('category', 'all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
              currentCategory === 'all' || !currentCategory
                ? 'bg-amber-900 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateFilters('category', cat.slug)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                currentCategory === cat.slug
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Sort & Search Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box within filters */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              defaultValue={currentSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters('search', (e.target as HTMLInputElement).value);
                }
              }}
              placeholder="Search in results…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="flex items-center gap-1 text-xs font-medium text-slate-600">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              <span>Sort:</span>
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => updateFilters('sort', e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-900"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results status indicator */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>
          Showing <span className="font-semibold text-slate-800">{totalProducts}</span>{' '}
          {totalProducts === 1 ? 'item' : 'items'}
        </span>
        {currentSearch && (
          <span>
            Search query: <span className="font-medium text-slate-700">“{currentSearch}”</span>
          </span>
        )}
      </div>
    </div>
  );
}

