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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <ShoppingBag className="h-10 w-10 stroke-1" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your cart is empty</h1>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            You haven&apos;t added any items to your shopping cart yet. Explore our curated books and electronics catalog.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            Explore Catalog
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            You have <span className="font-semibold text-slate-900">{itemCount}</span>{' '}
            {itemCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Cart Line Items Table/List */}
        <div className="lg:col-span-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex flex-col sm:flex-row gap-5 py-6 first:pt-0 last:pb-0">
              {/* Product Thumbnail */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col justify-between space-y-2">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 capitalize">{product.category}</p>
                </div>

                {/* Pricing & Quantity Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label={`Decrease quantity of ${product.name}`}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold tabular-nums text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      aria-label={`Increase quantity of ${product.name}`}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Unit: {formatCurrency(product.price)}</span>
                    <span className="text-base font-bold tabular-nums text-slate-900">
                      {formatCurrency(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-medium tabular-nums text-slate-900">
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  formatCurrency(shipping)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated GST (18% included)</span>
              <span className="font-medium tabular-nums text-slate-900">
                {formatCurrency(tax)}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-indigo-600 bg-indigo-50 p-2.5 rounded-xl">
                Add {formatCurrency(999 - subtotal)} more to qualify for <strong>FREE Delivery</strong>!
              </p>
            )}

            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
              <span>Total Amount</span>
              <span className="text-xl tabular-nums text-indigo-700">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
            <span>Guaranteed safe checkout with 256-bit bank encryption.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
