'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/format';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100/70 text-amber-900">
            <ShoppingBag className="h-7 w-7 stroke-1" aria-hidden="true" />
          </div>
          <p className="eyebrow">Your selection</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-stone-900 text-balance">
            Your basket is empty
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 text-pretty sm:text-base">
            Nothing here yet. Explore wheel-thrown ceramics, block-printed textiles, and warm
            lighting — all made by hand in small batches.
          </p>
          <Link href="/products" className="btn-primary mt-8">
            Explore the collection
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Your selection</p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
            Your basket
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {itemCount} {itemCount === 1 ? 'piece' : 'pieces'} reserved for the next 60 minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-xs font-semibold text-stone-500 transition-colors hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 sm:self-auto"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear basket
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Line items */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 py-6 sm:gap-6">
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:h-28 sm:w-24">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-800">
                      {product.category}
                    </p>
                    <h2 className="mt-1.5 font-display text-lg font-medium leading-snug text-stone-900">
                      <Link
                        href={`/products/${product.slug}`}
                        className="rounded transition-colors hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-stone-500">
                      {formatCurrency(product.price)} each · Inclusive of GST
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 transition-colors hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>

                  <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end">
                    <div className="flex items-center rounded-full border border-stone-300 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-l-full text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums text-stone-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        aria-label={
                          quantity >= product.stock
                            ? `Maximum available quantity of ${product.name} reached`
                            : `Increase quantity of ${product.name}`
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-r-full text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-semibold tabular-nums text-stone-900">
                        {formatCurrency(product.price * quantity)}
                      </span>
                      {quantity >= product.stock && (
                        <span className="mt-0.5 block text-[11px] text-amber-800">
                          Max {product.stock} available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-amber-900 transition-colors hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Continue shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="surface-card p-6 sm:p-7 lg:col-span-4 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-medium text-stone-900">Order summary</h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600">Subtotal</dt>
              <dd className="font-medium tabular-nums text-stone-900">{formatCurrency(subtotal)}</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-stone-600">Delivery</dt>
              <dd className="font-medium tabular-nums text-stone-900">
                {shipping === 0 ? (
                  <span className="font-semibold text-emerald-700">Free</span>
                ) : (
                  formatCurrency(shipping)
                )}
              </dd>
            </div>

            {shipping > 0 && (
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                Add {formatCurrency(999 - subtotal)} more for free express delivery.
              </p>
            )}

            <div className="flex items-baseline justify-between gap-4 border-t border-stone-200 pt-4">
              <dt className="text-base font-semibold text-stone-900">Total</dt>
              <dd className="font-display text-2xl font-medium tabular-nums text-stone-900">
                {formatCurrency(total)}
              </dd>
            </div>
            <p className="text-right text-xs text-stone-500">
              Inclusive of all taxes · {formatCurrency(tax)} GST
            </p>
          </dl>

          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-stone-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" aria-hidden="true" />
            <span>Secure checkout · Free returns within 7 days of delivery.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
