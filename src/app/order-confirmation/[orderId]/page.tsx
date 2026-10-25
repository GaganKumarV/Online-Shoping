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

  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Confetti fallback
    }

    // Retrieve order from session storage
    try {
      const stored = sessionStorage.getItem(`order_${params.orderId}`);
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read order from session storage', e);
    }
  }, [params.orderId]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Success Hero Header */}
      <div className="flex flex-col items-center text-center space-y-4 rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50/60 to-white p-8 sm:p-12 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Payment Verified & Confirmed
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Thank you for your purchase!
          </h1>
          <p className="text-sm text-slate-600 max-w-md">
            We&apos;ve received your order and our fulfillment team has started preparing your shipment.
          </p>
        </div>

        {/* Order Identifier Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-mono font-bold text-slate-900 shadow-sm">
            Order ID: {order?.orderNumber || `GDG-${params.orderId.slice(0, 10).toUpperCase()}`}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span>{order?.createdAt ? formatDate(order.createdAt) : 'Just now'}</span>
          </div>
        </div>
      </div>

      {/* Order Tracking Progress Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Estimated Delivery
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900 text-white">
              <Truck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Arriving in 2–4 Business Days</p>
              <p className="text-xs text-slate-500">Express Delivery via Mati Express</p>
            </div>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Status: Confirmed & Packing
          </span>
        </div>
      </div>

      {/* Detailed Order Breakdown */}
      {order && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Purchased Items List */}
          <div className="md:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-900" aria-hidden="true" />
              <span>Purchased Items ({order.items.length})</span>
            </h2>

            <div className="divide-y divide-slate-100">
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4 py-3.5">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{product.name}</h3>
                    <p className="text-xs text-slate-500">
                      Qty: {quantity} × {formatCurrency(product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-slate-900">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (GST 18%)</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatCurrency(order.tax)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Paid</span>
                <span className="text-base tabular-nums text-amber-900">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Metadata */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span>Delivery Address</span>
              </h2>
              <div className="text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900 text-sm">{order.shippingAddress.fullName}</p>
                <p className="mt-1">{order.shippingAddress.streetAddress}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.postalCode}
                </p>
                <p className="mt-2 text-slate-500">Phone: {order.shippingAddress.phone}</p>
                <p className="text-slate-500">Email: {order.shippingAddress.email}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span>Payment Method</span>
              </h2>
              <p className="text-xs font-semibold text-slate-800 capitalize">
                {order.paymentMethod === 'card'
                  ? 'Credit / Debit Card'
                  : order.paymentMethod === 'upi'
                  ? 'UPI Instant Transfer'
                  : order.paymentMethod === 'netbanking'
                  ? 'Internet Banking'
                  : 'Cash on Delivery'}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">✓ Transaction Authorized</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions: Continue Shopping & Print Receipt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print Order Receipt
        </button>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
