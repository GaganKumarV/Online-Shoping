'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  Calendar,
  CreditCard,
  MapPin,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/format';
import { Order } from '@/types';

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    // Retrieve order from session storage
    try {
      const stored = sessionStorage.getItem(`order_${params.orderId}`);
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read order from session storage', e);
    } finally {
      setIsRestored(true);
    }

    // Trigger celebratory confetti on mount, unless the visitor prefers reduced motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      try {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.62 },
          colors: ['#78350f', '#b45309', '#d97706', '#e7e5e4'],
        });
      } catch {
        // Confetti is decorative; failure is harmless.
      }
    }
  }, [params.orderId]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Success hero */}
      <div className="flex flex-col items-center space-y-5 rounded-3xl border border-stone-200 bg-gradient-to-b from-amber-50/70 to-white p-8 text-center shadow-sm sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800">
            {order?.paymentMethod === 'cod' ? 'Order confirmed' : 'Payment confirmed'}
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-stone-900 text-balance sm:text-5xl">
            Thank you — it&apos;s on its way.
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-stone-600 text-pretty">
            We&apos;ve received your order and our team has started packing it by hand.
          </p>
        </div>

        {/* Order Identifier Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <div className="rounded-xl border border-stone-200 bg-white px-4 py-2 font-mono font-bold text-stone-900 shadow-sm">
            Order ID: {order?.orderNumber || `MATI-${params.orderId.slice(0, 10).toUpperCase()}`}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2 text-stone-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            <span>{order?.createdAt ? formatDate(order.createdAt) : 'Just now'}</span>
          </div>
        </div>
      </div>

      {isRestored && !order && (
        <div role="status" className="surface-card p-6 text-sm text-stone-600">
          <p className="font-semibold text-stone-900">
            Receipt details aren&apos;t available in this browser tab
          </p>
          <p className="mt-1 leading-relaxed">
            Your order was placed successfully. Receipts are kept for the tab where checkout
            finished, so they may not appear after switching devices or browsers. Need a copy?
            Email <span className="font-medium text-stone-800">support@matiliving.in</span> with
            the order ID above.
          </p>
        </div>
      )}

      {/* Delivery tracking */}
      <div className="surface-card space-y-4 p-6 sm:p-7">
        <div>
          <p className="eyebrow">On the way</p>
          <h2 className="mt-2 font-display text-xl font-medium text-stone-900">Estimated delivery</h2>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-stone-50 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900 text-white">
              <Truck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Arriving in 2–4 business days</p>
              <p className="text-xs text-stone-500">Express delivery via Mati Express</p>
            </div>
          </div>
          <span className="self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 sm:self-auto">
            Confirmed & packing
          </span>
        </div>
      </div>

      {/* Detailed Order Breakdown */}
      {order && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Purchased items */}
          <div className="surface-card space-y-4 p-6 md:col-span-7">
            <h2 className="flex items-center gap-2 font-display text-xl font-medium text-stone-900">
              <Package className="h-5 w-5 text-amber-800" aria-hidden="true" />
              <span>Your pieces ({order.items.length})</span>
            </h2>

            <div className="divide-y divide-stone-100">
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4 py-3.5">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-stone-900 truncate">{product.name}</h3>
                    <p className="text-xs text-stone-500">
                      Qty: {quantity} × {formatCurrency(product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-stone-900">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 border-t border-stone-100 pt-4 text-xs text-stone-600">
              <div className="flex justify-between gap-4">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums text-stone-900">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Delivery</span>
                <span className="font-medium tabular-nums text-emerald-700">
                  {order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-stone-200 pt-3">
                <span className="text-sm font-semibold text-stone-900">
                  {order.paymentMethod === 'cod' ? 'Total due' : 'Total paid'}
                </span>
                <span className="font-display text-xl font-medium tabular-nums text-stone-900">
                  {formatCurrency(order.total)}
                </span>
              </div>
              <p className="text-right text-[11px] text-stone-500">
                Inclusive of all taxes · {formatCurrency(order.tax)} GST
              </p>
            </div>
          </div>

          {/* Delivery & payment metadata */}
          <div className="space-y-6 md:col-span-5">
            <div className="surface-card space-y-3 p-6">
              <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                <MapPin className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <span>Delivery address</span>
              </h2>
              <div className="text-xs leading-relaxed text-stone-600">
                <p className="text-sm font-semibold text-stone-900">{order.shippingAddress.fullName}</p>
                <p className="mt-1">{order.shippingAddress.streetAddress}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.postalCode}
                </p>
                <p className="mt-2 text-stone-500">Phone: {order.shippingAddress.phone}</p>
                <p className="text-stone-500">Email: {order.shippingAddress.email}</p>
              </div>
            </div>

            <div className="surface-card space-y-3 p-6">
              <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                <CreditCard className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <span>Payment</span>
              </h2>
              <p className="text-sm font-semibold text-stone-900">
                {order.paymentMethod === 'card'
                  ? 'Credit / debit card'
                  : order.paymentMethod === 'upi'
                  ? 'UPI instant transfer'
                  : order.paymentMethod === 'netbanking'
                  ? 'Internet banking'
                  : 'Cash on delivery'}
              </p>
              <p className="text-[11px] font-medium text-emerald-700">
                {order.paymentMethod === 'cod'
                  ? `Pay ${formatCurrency(order.total)} on delivery`
                  : '✓ Transaction authorized'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions: Continue Shopping & Print Receipt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-8">
        <button type="button" onClick={() => window.print()} className="btn-secondary text-xs">
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print receipt
        </button>

        <Link href="/products" className="btn-primary">
          Continue shopping
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
