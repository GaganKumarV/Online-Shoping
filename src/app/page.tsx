import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Star, ShieldCheck, Truck, Package } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/db';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60; // ISR cache revalidation every minute

const categories = [
  {
    slug: 'ceramics',
    label: 'Ceramics',
    description: 'Hand-thrown bowls, cups, vases, and serving platters fired in traditional kilns.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    count: 7,
  },
  {
    slug: 'textiles',
    label: 'Textiles',
    description: 'Block-printed cushion covers, hand-woven runners, and heritage kantha throws.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
  {
    slug: 'lighting',
    label: 'Lighting',
    description: 'Terracotta pendant lamps, woven cane shades, and beeswax candle collections.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
  {
    slug: 'decor',
    label: 'Decor & Objects',
    description: 'Soapstone figurines, brass bookends, rattan trays, and handmade wall art.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#faf8f5] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="space-y-7 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-800 shadow-sm">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Handcrafted. Slow-made. Honest materials.</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl text-balance leading-tight">
                Beautiful things for your everyday home.
              </h1>

              <p className="max-w-xl text-lg text-stone-600 leading-relaxed text-pretty">
                From wheel-thrown ceramics and block-printed textiles to hand-knotted lighting — every piece in our collection is made by Indian artisans using traditional craft techniques.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber-900/20 transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
                >
                  Explore Collection
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/products?category=ceramics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
                >
                  Shop Ceramics
                </Link>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-6">
                <div>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-base tabular-nums">
                    <Star className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                    <span>4.8 / 5</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">Customer rating</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-stone-900 font-bold text-base tabular-nums">
                    <Truck className="h-4 w-4 text-amber-800" aria-hidden="true" />
                    <span>24 hrs</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">Fast dispatch</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-emerald-700 font-bold text-base">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Artisan</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">100% handmade</p>
                </div>
              </div>
            </div>

            {/* Right Hero Mosaic */}
            <div className="relative lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80"
                      alt="Handmade ceramic bowls"
                      fill
                      priority
                      sizes="(min-width: 1024px) 250px, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
                      alt="Block-printed textiles"
                      fill
                      sizes="(min-width: 1024px) 250px, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80"
                      alt="Handcrafted lighting"
                      fill
                      sizes="(min-width: 1024px) 250px, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                      alt="Artisan home decor objects"
                      fill
                      sizes="(min-width: 1024px) 250px, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Shop by Craft
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Each category is a tradition — explore them all.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1 text-sm font-semibold text-amber-900 hover:text-amber-700 sm:flex"
          >
            All Pieces <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-base font-bold">{cat.label}</h3>
                <p className="mt-0.5 text-xs text-white/80 line-clamp-2">{cat.description}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
                  {cat.count} pieces <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Featured Pieces
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Curated top-rated selections from our live artisan catalog.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-amber-900 hover:text-amber-700"
          >
            View All <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-6 py-14 shadow-2xl sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-800/30 px-3 py-1 text-xs font-semibold text-amber-300">
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
              Free shipping on orders above ₹999
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Bring handmade warmth into your home.
            </h2>
            <p className="text-base text-stone-300 leading-relaxed">
              Shop our full artisan collection. Free express delivery, 7-day easy returns, and every piece packed with care.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                Browse All Pieces
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-amber-800/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-stone-700/40 blur-2xl" />
        </div>
      </section>
    </div>
  );
}
