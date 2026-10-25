import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Laptop, Sparkles, Star, ShieldCheck, Zap } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/db';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-indigo-50/50 via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>The Premier Tech Store for Engineers & Creators</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance">
                Curated gear & essential software literature.
              </h1>

              <p className="max-w-xl text-lg text-slate-600 leading-relaxed text-pretty">
                From landmark distributed systems and software architecture texts to studio-grade headphones and mechanical keyboards. Hand-picked, genuine, and delivered fast across India.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 hover:shadow-indigo-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  Explore Catalog
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/products?category=electronics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <Laptop className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  Electronics
                </Link>

                <Link
                  href="/products?category=books"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <BookOpen className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  Books
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-slate-100 pt-6">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-lg tabular-nums">
                    <Star className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                    <span>4.85 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Average customer rating</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-slate-900 font-bold text-lg tabular-nums">
                    <Zap className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <span>24 Hours</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Fast dispatch</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold text-lg">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <span>100% Genuine</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Direct publisher warranty</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-3xl border border-slate-200/90 bg-white p-4 shadow-2xl shadow-indigo-500/10 sm:max-w-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Sony WH-1000XM5 Premium Headphones featured in GDG.com catalog"
                    fill
                    priority
                    sizes="(min-width: 1024px) 450px, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="rounded-full bg-indigo-600/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                      Editor&apos;s Pick
                    </span>
                    <h3 className="mt-1 text-base font-bold leading-tight">
                      Sony WH-1000XM5 Wireless Headphones
                    </h3>
                    <p className="text-xs text-slate-200">
                      Industry-leading noise cancellation for deep focus sessions.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <span className="text-xs text-slate-400">Featured Price</span>
                    <p className="text-lg font-bold tabular-nums text-slate-900">₹26,990</p>
                  </div>
                  <Link
                    href="/products/sony-wh-1000xm5-headphones"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select your focus area or browse our complete collection.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:flex"
          >
            All Categories <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Books Category Banner */}
          <Link
            href="/products?category=books"
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 transition duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Software Engineering & Tech Books
                </h3>
                <p className="max-w-md text-sm text-slate-600 leading-relaxed">
                  Seminal works on distributed systems, clean code craftsmanship, algorithms, system design interviews, and DevOps philosophy.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <span>Browse 13 Titles</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-indigo-50/80 -z-0 blur-2xl group-hover:bg-indigo-100 transition-colors" />
          </Link>

          {/* Electronics Category Banner */}
          <Link
            href="/products?category=electronics"
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 transition duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                  <Laptop className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Developer Hardware & Audio
                </h3>
                <p className="max-w-md text-sm text-slate-600 leading-relaxed">
                  Mechanical keyboards, ergonomic mice, 4K USB-C displays, active noise-cancelling headphones, and single-board computers.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <span>Browse 12 Tech Devices</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-violet-50/80 -z-0 blur-2xl group-hover:bg-violet-100 transition-colors" />
          </Link>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Top-rated selections verified from our live MySQL database.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View All ({featuredProducts.length}+) <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 shadow-2xl sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Equip your workspace with the best tools.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Order today and enjoy free express delivery, 7-day hassle-free replacements, and 100% authentic publisher and manufacturer editions.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
              >
                Browse All Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
