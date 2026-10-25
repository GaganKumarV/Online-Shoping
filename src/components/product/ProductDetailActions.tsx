'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, items } = useCart();

  const cartItem = items.find((i) => i.product.id === product.id);
  const currentInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const remainingStock = Math.max(0, product.stock - currentInCart);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, remainingStock));
  };

  const handleAddToCart = () => {
    if (quantity > 0 && remainingStock >= quantity) {
      addItem(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Stock warning */}
      {isOutOfStock ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <p className="font-semibold">Currently Out of Stock</p>
          <p className="mt-0.5 text-xs text-rose-600">
            We are working with the supplier to replenish inventory soon.
          </p>
        </div>
      ) : product.stock <= 10 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800">
          <span className="font-bold">Hurry!</span> Only {product.stock} units left in stock.
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          In Stock ({product.stock} units available)
        </div>
      )}

      {!isOutOfStock && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="w-12 text-center text-sm font-bold tabular-nums text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= remainingStock}
              aria-label="Increase quantity"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={remainingStock === 0 || quantity > remainingStock}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-900 active:scale-98 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
          >
            {currentInCart > 0 ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Add More ({currentInCart} in cart)</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Trust & Guarantee points */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-amber-900" aria-hidden="true" />
          <span>Express Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-900" aria-hidden="true" />
          <span>100% Genuine</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-amber-900" aria-hidden="true" />
          <span>7-Day Replacement</span>
        </div>
      </div>
    </div>
  );
}

