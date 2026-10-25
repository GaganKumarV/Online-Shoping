import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShieldCheck, Truck, Leaf } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/db';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60; // ISR cache revalidation every minute

const categories = [
  {
    slug: 'ceramics',
    label: 'Ceramics',
    description: 'Wheel-thrown bowls, cups, and vases fired in traditional kilns.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    count: 7,
  },
  {
    slug: 'textiles',
    label: 'Textiles',
    description: 'Block-printed covers, handwoven runners, and kantha throws.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
  {
    slug: 'lighting',
    label: 'Lighting',
    description: 'Terracotta pendants, cane shades, and warm evening light.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
  {
    slug: 'decor',
    label: 'Objects',
    description: 'Soapstone, brass, and reclaimed wood for the everyday shelf.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    count: 6,
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);
  const averageRating =
    featuredProducts.reduce((sum, product) => sum + product.rating, 0) /
    Math.max(featuredProducts.length, 1);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-24">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-px w-6 bg-amber-800" aria-hidden="true" />
              Handmade in India
            </p>

            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-stone-900 text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Made by hand. Made to be lived with.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600 text-pretty sm:text-lg">
              Wheel-thrown ceramics, block-printed textiles, and warm lighting from small
              workshops across India — chosen for the way they feel in a real home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary group">
                Explore the collection
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>

              <Link href="/products?category=ceramics" className="btn-secondary">
                Shop ceramics
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-stone-200 pt-6">
              <div>
                <dt className="sr-only">Average customer rating</dt>
                <dd className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-stone-900">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                  {averageRating.toFixed(1)} / 5
                </dd>
                <p className="mt-1 text-xs text-stone-500">Customer rating</p>
              </div>
              <div>
                <dt className="sr-only">Delivery</dt>
                <dd className="flex items-center gap-1.5 text-sm font-semibold text-stone-900">
                  <Truck className="h-4 w-4 text-amber-800" aria-hidden="true" />
                  Free over ₹999
                </dd>
                <p className="mt-1 text-xs text-stone-500">Express delivery</p>
              </div>
              <div>
                <dt className="sr-only">Returns</dt>
                <dd className="flex items-center gap-1.5 text-sm font-semibold text-stone-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                  7 days
                </dd>
                <p className="mt-1 text-xs text-stone-500">Easy returns</p>
              </div>
            </dl>
          </div>

          {/* Hero imagery */}
          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:ml-auto lg:mr-0 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone-100 shadow-sm sm:aspect-[5/6]">
                <Image
                  src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=85"
                  alt="Hand-thrown ceramic bowls and vessels in warm neutral tones"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 70vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/25 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-6 -left-4 hidden w-44 overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-xl sm:block lg:-left-10 lg:w-52">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80"
                    alt="Folded hand-block-printed textiles"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <p className="px-1 pb-1 pt-2 text-[11px] font-medium leading-snug text-stone-600">
                  Block-printed by hand in Rajasthan
                </p>
              </div>

              <div className="absolute -right-3 top-6 hidden items-center gap-2 rounded-full border border-stone-200 bg-white/95 px-3.5 py-2 text-[11px] font-semibold text-stone-700 shadow-md backdrop-blur-sm md:flex lg:-right-6">
                <Leaf className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                Small-batch, always
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div className="max-w-xl">
            <p className="eyebrow">Shop by craft</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-stone-900 text-balance sm:text-4xl">
              Four traditions, one home
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 sm:text-base">
              Each collection is made by a different community of makers. Start where your room
              needs it most.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-amber-900 hover:text-amber-700"
          >
            All pieces
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#faf8f5]/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-700 backdrop-blur-sm">
                  {cat.count} pieces
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-medium text-stone-900">{cat.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">{cat.description}</p>
                </div>
                <ArrowRight
                  className="mt-1.5 h-4 w-4 flex-shrink-0 text-amber-900 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div className="max-w-xl">
            <p className="eyebrow">The edit</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-stone-900 text-balance sm:text-4xl">
              Pieces worth living with
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 sm:text-base">
              Our most-loved pieces, chosen from the live artisan catalog.
            </p>
          </div>
          <Link
            href="/products?sort=rating"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-amber-900 hover:text-amber-700"
          >
            View all
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-amber-950 px-6 py-14 sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">
              Mati · Living
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-amber-50 text-balance sm:text-4xl lg:text-5xl">
              Bring a little handmade warmth home.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-amber-100/80 sm:text-base">
              Free express delivery over ₹999, seven-day returns, and every piece packed by hand
              with care.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-950 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-950"
              >
                Browse all pieces
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-700/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-stone-700/30 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}
