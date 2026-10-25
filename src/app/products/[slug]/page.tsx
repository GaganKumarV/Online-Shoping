import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/lib/db';
import { formatCurrency } from '@/lib/format';
import { RatingStars } from '@/components/ui/RatingStars';
import { ProductDetailActions } from '@/components/product/ProductDetailActions';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  ceramics: 'Ceramics',
  textiles: 'Textiles',
  lighting: 'Lighting',
  decor: 'Objects',
};

const CARE_NOTES: Record<string, string> = {
  ceramics:
    'Food-safe glazes where noted. Hand wash with warm water and mild soap, and avoid sudden temperature changes. Small variations in glaze and form are part of the making.',
  textiles:
    'Gentle machine wash cold on its own, then line dry in the shade. Natural dyes may soften with time. Warm iron on the reverse if needed.',
  lighting:
    'Dust with a dry cloth. Use a warm LED bulb. Hardwired pieces should be fitted by a qualified electrician.',
  decor:
    'Dust gently with a dry cloth. Keep brass and wood away from prolonged moisture so their natural patina develops evenly.',
};

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} – Mati Living`,
      description: product.description,
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug, 4);
  const categoryLabel =
    CATEGORY_LABELS[product.category.toLowerCase()] ??
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="rounded transition-colors hover:text-stone-900">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <Link href="/products" className="rounded transition-colors hover:text-stone-900">
          Collection
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <Link
          href={`/products?category=${product.category}`}
          className="rounded transition-colors hover:text-stone-900"
        >
          {categoryLabel}
        </Link>
        <ChevronRight className="hidden h-3.5 w-3.5 text-stone-400 sm:block" aria-hidden="true" />
        <span
          aria-current="page"
          className="hidden max-w-[16rem] truncate font-semibold text-stone-900 sm:block"
        >
          {product.name}
        </span>
      </nav>

      {/* Product */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Media */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-stone-100">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 92vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center text-[11px] text-stone-500 sm:text-left">
            Every piece is finished by hand, so subtle variations are expected and celebrated.
          </p>
        </div>

        {/* Details */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-50">
                {categoryLabel}
              </span>
              <RatingStars rating={product.rating} size="md" />
            </div>

            <h1 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-stone-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-stone-600 text-pretty sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 border-y border-stone-200 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold tabular-nums text-stone-900">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-stone-500">Inclusive of GST</span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Free express delivery over ₹999 · 7-day returns
              </p>
            </div>

            <div className="mt-6">
              <ProductDetailActions product={product} />
            </div>

            {/* Craft & care */}
            <div className="mt-8 divide-y divide-stone-200 border-t border-stone-200">
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded text-sm font-semibold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  Materials &amp; care
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-2 pr-6 text-sm leading-relaxed text-stone-600">
                  {CARE_NOTES[product.category.toLowerCase()] ??
                    'Made by hand from natural materials. Wipe gently with a dry cloth and avoid harsh cleaners.'}
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded text-sm font-semibold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  Shipping &amp; returns
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </summary>
                <div className="mt-2 space-y-1.5 pr-6 text-sm leading-relaxed text-stone-600">
                  <p>Dispatched within 1–2 working days. Express delivery in 2–4 working days.</p>
                  <p>Free shipping on orders over ₹999; ₹99 below that.</p>
                  <p>Seven-day returns in original packaging. Contact support@matiliving.in.</p>
                </div>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded text-sm font-semibold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  How it&apos;s made
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-2 pr-6 text-sm leading-relaxed text-stone-600">
                  Sourced directly from small artisan workshops across India. Pieces are made in
                  limited batches, which is why stock is often low and no two are exactly alike.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-stone-200 pt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep looking</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-stone-900">
                More in {categoryLabel.toLowerCase()}
              </h2>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-amber-900 hover:text-amber-700"
            >
              See all <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all pieces
        </Link>
      </div>
    </div>
  );
}
