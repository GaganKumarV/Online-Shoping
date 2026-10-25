'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { RatingStars } from '@/components/ui/RatingStars';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();

  const cartItem = items.find((i) => i.product.id === product.id);
  const currentInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isMaxInCart = currentInCart >= product.stock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock && !isMaxInCart) {
      addItem(product, 1);
    }
  };

  const buttonLabel = isOutOfStock
    ? `${product.name} is out of stock`
    : isMaxInCart
      ? `Maximum stock of ${product.name} is already in your bag`
      : `Add ${product.name} to bag`;

  return (
    <article className="group flex flex-col">
      {/* Product image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-4"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 46vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        />

        {isOutOfStock ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-stone-900/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            Sold out
          </span>
        ) : isLowStock ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#faf8f5]/95 px-2.5 py-1 text-[11px] font-semibold text-amber-900 backdrop-blur-sm">
            Only {product.stock} left
          </span>
        ) : null}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-800">
            {product.category}
          </p>
          <RatingStars rating={product.rating} size="sm" showValue={false} />
        </div>

        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-stone-900">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 rounded transition-colors hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <span className="block text-base font-semibold tabular-nums text-stone-900">
              {formatCurrency(product.price)}
            </span>
            <span className="mt-0.5 block text-[11px] text-stone-500">
              {isOutOfStock ? 'Restocking soon' : 'Inclusive of GST'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxInCart}
            aria-label={buttonLabel}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2 ${
              isOutOfStock
                ? 'cursor-not-allowed bg-stone-100 text-stone-400'
                : isMaxInCart
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'bg-amber-900 text-white hover:bg-amber-800'
            }`}
          >
            {isMaxInCart ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
