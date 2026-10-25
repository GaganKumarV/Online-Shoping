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

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-4 transition duration-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Pill */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur-md">
          {product.category}
        </span>

        {/* Stock Badge */}
        {isOutOfStock ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
            Only {product.stock} left
          </span>
        ) : null}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="mb-2">
            <RatingStars rating={product.rating} size="sm" />
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            <Link
              href={`/products/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 text-xs text-slate-500 line-clamp-2">{product.description}</p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">Price</span>
            <span className="text-base font-bold tabular-nums text-slate-900">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxInCart}
            aria-label={
              isOutOfStock
                ? `${product.name} is out of stock`
                : isMaxInCart
                ? `Max stock (${product.stock}) of ${product.name} in cart`
                : `Add ${product.name} to cart`
            }
            className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
              isOutOfStock
                ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                : isMaxInCart
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-900 text-white hover:bg-indigo-600 active:scale-95'
            }`}
          >
            {isMaxInCart ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>In Cart ({currentInCart})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
