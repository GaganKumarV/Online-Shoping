'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, BookOpen, Laptop, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function Header() {
  const router = useRouter();
  const { itemCount, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow">
      {/* Top micro-announcement banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-slate-200">
        <span>⚡ Free Express Delivery across India on orders over ₹999</span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-indigo-600 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-extrabold tracking-tight">
              GDG<span className="text-indigo-600">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex md:items-center md:gap-1">
            <Link
              href="/products"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              All Products
            </Link>
            <Link
              href="/products?category=books"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <BookOpen className="h-4 w-4 text-slate-500" aria-hidden="true" />
              Books
            </Link>
            <Link
              href="/products?category=electronics"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <Laptop className="h-4 w-4 text-slate-500" aria-hidden="true" />
              Electronics
            </Link>
          </nav>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden flex-1 max-w-md sm:block">
          <form role="search" onSubmit={handleSearchSubmit} className="relative">
            <label htmlFor="desktop-search" className="sr-only">
              Search books and electronics
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="desktop-search"
              type="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, headphones, tech…"
              autoComplete="off"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
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
            className="group relative flex h-10 items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4 text-slate-700 transition-transform group-hover:scale-105" aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">Cart</span>
            {itemCount > 0 ? (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold tabular-nums text-white">
                {itemCount}
              </span>
            ) : (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-xs font-medium tabular-nums text-slate-500">
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      <div className="border-t border-slate-100 px-4 py-2 sm:hidden">
        <form role="search" onSubmit={handleSearchSubmit} className="relative">
          <label htmlFor="mobile-search" className="sr-only">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="mobile-search"
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books & electronics…"
            autoComplete="off"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </form>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              All Products
            </Link>
            <Link
              href="/products?category=books"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              <BookOpen className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              Books
            </Link>
            <Link
              href="/products?category=electronics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              <Laptop className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              Electronics
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-slate-600" aria-hidden="true" />
                View Full Cart
              </span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                {itemCount} items
              </span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
