'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Compass } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu on navigation or Escape.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#faf8f5]/95 backdrop-blur-md transition-shadow">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 px-4 py-1.5 text-center text-xs font-medium text-stone-200">
        <span>Artisan-made in India • Complimentary express shipping over ₹999</span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Anchor */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 transition-colors hover:text-amber-900 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-900 text-amber-50 shadow-sm">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-serif tracking-tight text-xl font-extrabold text-stone-900">
              Mati <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-800">Living</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex md:items-center md:gap-1 text-sm font-medium text-stone-700">
            <Link
              href="/products"
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
            >
              All Pieces
            </Link>
            <Link
              href="/products?category=ceramics"
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
            >
              Ceramics
            </Link>
            <Link
              href="/products?category=textiles"
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
            >
              Textiles
            </Link>
            <Link
              href="/products?category=lighting"
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
            >
              Lighting
            </Link>
            <Link
              href="/products?category=decor"
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
            >
              Objects
            </Link>
          </nav>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden flex-1 max-w-sm sm:block">
          <form role="search" onSubmit={handleSearchSubmit} className="relative">
            <label htmlFor="desktop-search" className="sr-only">
              Search artisanal decor
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              id="desktop-search"
              type="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vases, throws, lamps…"
              autoComplete="off"
              className="h-10 w-full rounded-full border border-stone-500/60 bg-white py-2 pl-9 pr-4 text-xs text-stone-900 placeholder:text-stone-500 focus:border-amber-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </form>
        </div>

        {/* Actions - Cart & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open shopping cart drawer with ${itemCount} items`}
            className="group relative flex h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-stone-800 transition hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4 text-stone-700 transition-transform group-hover:scale-105" aria-hidden="true" />
            <span className="hidden text-xs font-semibold uppercase tracking-wider sm:inline">Bag</span>
            {itemCount > 0 ? (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-900 px-1.5 text-xs font-bold tabular-nums text-white">
                {itemCount}
              </span>
            ) : (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-stone-100 px-1.5 text-xs font-medium tabular-nums text-stone-500">
                0
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close main navigation' : 'Open main navigation'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="border-t border-stone-200/60 bg-[#faf8f5] px-4 py-2 sm:hidden">
        <form role="search" onSubmit={handleSearchSubmit} className="relative">
          <label htmlFor="mobile-search" className="sr-only">
            Search artisanal decor
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          />
          <input
            id="mobile-search"
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ceramics, lighting, textiles…"
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-stone-500/60 bg-white py-2 pl-9 pr-3 text-xs text-stone-900 placeholder:text-stone-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </form>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-stone-200 bg-white px-4 py-4 md:hidden animate-slide-down motion-reduce:animate-none"
        >
          <div className="flex flex-col space-y-1">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              All Pieces
            </Link>
            <Link
              href="/products?category=ceramics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Artisan Ceramics
            </Link>
            <Link
              href="/products?category=textiles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Handwoven Textiles
            </Link>
            <Link
              href="/products?category=lighting"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Ambient Lighting
            </Link>
            <Link
              href="/products?category=decor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Hand-Carved Objects
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center justify-between rounded-lg border-t border-stone-100 px-3 pt-3 text-sm font-semibold text-stone-900 hover:bg-stone-100"
            >
              <span>View Shopping Bag</span>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                {itemCount}
              </span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
