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
    <div className="space-y-5">
      {/* Stock status */}
      {isOutOfStock ? (
        <div role="status" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <p className="font-semibold">Currently out of stock</p>
          <p className="mt-0.5 text-xs text-rose-700">
            We&apos;re restocking this piece. Explore the related pieces below while you wait.
          </p>
        </div>
      ) : product.stock <= 10 ? (
        <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <span className="font-semibold">Small batch.</span> Only {product.stock} left in the
          studio.
        </div>
      ) : (
        <div
          role="status"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
          In stock · ready to ship
        </div>
      )}

      {!isOutOfStock && (
        <div className="space-y-3">
          <div className="flex items-stretch gap-3">
            {/* Quantity */}
            <div className="flex items-center rounded-xl border border-stone-500/50 bg-white p-1">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span
                aria-live="polite"
                aria-label={`Quantity ${quantity}`}
                className="w-10 text-center text-sm font-semibold tabular-nums text-stone-900"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= remainingStock}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={remainingStock === 0 || quantity > remainingStock}
              className="btn-primary flex-1 px-5"
            >
              {currentInCart > 0 ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Add more ({currentInCart} in bag)</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>Add to bag</span>
                </>
              )}
            </button>
          </div>

          {remainingStock === 0 && (
            <p className="text-xs text-amber-900">
              All {product.stock} available pieces are already in your bag.
            </p>
          )}
        </div>
      )}

      {/* Trust points */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-amber-800" aria-hidden="true" />
          <span>Express delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-800" aria-hidden="true" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-amber-800" aria-hidden="true" />
          <span>7-day returns</span>
        </div>
      </div>
    </div>
  );
}
