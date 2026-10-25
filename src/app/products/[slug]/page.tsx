import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/lib/db';
import { formatCurrency } from '@/lib/format';
import { RatingStars } from '@/components/ui/RatingStars';
import { ProductDetailActions } from '@/components/product/ProductDetailActions';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60;

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
    title: `${product.name} – Mati Living`,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/products" className="hover:text-slate-900 transition-colors">
          Catalog
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize hover:text-slate-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-semibold text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: Product Media Gallery */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-sm">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-50">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 550px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="flex flex-col justify-center space-y-6 lg:col-span-6">
          <div className="space-y-3">
            <span className="inline-block rounded-full bg-amber-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900">
              {product.category}
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <RatingStars rating={product.rating} size="md" />
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-medium text-slate-500">
                Verified Customer Feedback
              </span>
            </div>
          </div>

          {/* Pricing display */}
          <div className="border-t border-b border-slate-100 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold tabular-nums text-slate-900">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-slate-400">Inclusive of all taxes</span>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Overview
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
          </div>

          {/* Interactive Actions (Quantity, Stock status, Add to Cart) */}
          <ProductDetailActions product={product} />
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-200/80 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Related in {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Customers also viewed these curated recommendations.
              </p>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-semibold text-amber-900 hover:text-amber-900"
            >
              See more <ChevronRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Back to all products button */}
      <div className="pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all products
        </Link>
      </div>
    </div>
  );
}
