'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/format';
import { ShippingAddress, PaymentMethodType } from '@/types';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  upiId?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Karnataka',
    postalCode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [upiId, setUpiId] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!address.fullName.trim()) errs.fullName = 'Full name is required';
    if (!address.email.trim() || !/^\S+@\S+\.\S+$/.test(address.email)) {
      errs.email = 'Valid email address is required';
    }
    if (!address.phone.trim() || address.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Valid 10-digit mobile number is required';
    }
    if (!address.streetAddress.trim()) errs.streetAddress = 'Street address is required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.state.trim()) errs.state = 'State is required';
    if (!address.postalCode.trim() || address.postalCode.replace(/\D/g, '').length !== 6) {
      errs.postalCode = 'Valid 6-digit PIN code is required';
    }

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (!cleanCard || cleanCard.length < 15) {
        errs.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        errs.cardExpiry = 'Format MM/YY';
      }
      if (!cardCvc || cardCvc.length < 3) {
        errs.cardCvc = '3 or 4 digits';
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        errs.upiId = 'Enter a valid UPI ID (e.g. user@okaxis)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: address,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success && data.order) {
        // Persist order in sessionStorage so confirmation page can display it
        sessionStorage.setItem(`order_${data.order.id}`, JSON.stringify(data.order));
        clearCart();
        router.push(`/order-confirmation/${data.order.id}`);
      } else {
        alert(data.message || 'Failed to place order. Please check your inputs.');
      }
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('An unexpected error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">Add products to your cart before checking out.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-xl bg-amber-900 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
        <Link
          href="/cart"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
          aria-label="Back to Cart"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Lock className="h-3 w-3 text-emerald-600" aria-hidden="true" />
            256-bit encrypted checkout session
          </p>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Form Left: Shipping & Payment */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Contact & Shipping Address */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900 text-xs font-bold text-white">
                  1
                </span>
                <h2 className="text-lg font-bold text-slate-900">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Gagan Deep"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                    Email Address (for invoice) *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="name@example.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
                    Mobile Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="9876543210"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="streetAddress" className="block text-xs font-semibold text-slate-700">
                    Street Address & House/Flat No. *
                  </label>
                  <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    placeholder="Flat 402, Sunshine Apartments, 12th Main Road"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.streetAddress && (
                    <p className="mt-1 text-xs text-rose-600">{errors.streetAddress}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-slate-700">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.city && <p className="mt-1 text-xs text-rose-600">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-slate-700">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-semibold text-slate-700">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="postal-code"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="560001"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-xs text-rose-600">{errors.postalCode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className="block text-xs font-semibold text-slate-700">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    disabled
                    value="India"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-sm text-slate-600"
                  />
                </div>
              </div>
            </section>

            {/* 2. Payment Method (Mock Payment / Stripe ready) */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900 text-xs font-bold text-white">
                    2
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Payment Option</h2>
                </div>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                  Mock Mode (Test Flow)
                </span>
              </div>

              {/* Payment Select Options */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'card'
                      ? 'border-amber-900 bg-amber-900/60 text-amber-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">Credit/Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'upi'
                      ? 'border-amber-900 bg-amber-900/60 text-amber-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <QrCode className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'netbanking'
                      ? 'border-amber-900 bg-amber-900/60 text-amber-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Building className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'cod'
                      ? 'border-amber-900 bg-amber-900/60 text-amber-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Banknote className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">Cash on Delivery</span>
                </button>
              </div>

              {/* Dynamic Payment Input Section */}
              {paymentMethod === 'card' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <p className="text-xs text-slate-500">
                    Enter any test card details. No actual real card will be charged.
                  </p>
                  <div>
                    <label htmlFor="cardNumber" className="block text-xs font-semibold text-slate-700">
                      Card Number *
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-rose-600">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-xs font-semibold text-slate-700">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                      {errors.cardExpiry && (
                        <p className="mt-1 text-xs text-rose-600">{errors.cardExpiry}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-xs font-semibold text-slate-700">
                        CVC / CVV *
                      </label>
                      <input
                        id="cardCvc"
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                      {errors.cardCvc && (
                        <p className="mt-1 text-xs text-rose-600">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <p className="text-xs text-slate-500">
                    Pay using Google Pay, PhonePe, Paytm, or BHIM UPI ID.
                  </p>
                  <div>
                    <label htmlFor="upiId" className="block text-xs font-semibold text-slate-700">
                      Virtual Payment Address (UPI ID) *
                    </label>
                    <input
                      id="upiId"
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                    {errors.upiId && <p className="mt-1 text-xs text-rose-600">{errors.upiId}</p>}
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-xs text-slate-600">
                    Supports HDFC, ICICI, State Bank of India, Axis Bank, and 50+ other Indian banks.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
                  <p className="font-semibold">Cash on Delivery selected</p>
                  <p className="mt-0.5">Please keep exact cash ready at the time of delivery.</p>
                </div>
              )}
            </section>
          </div>

          {/* Form Right: Order Items & Payment Action */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

              {/* Items Preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-[11px] text-slate-500">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-bold tabular-nums text-slate-900">
                      {formatCurrency(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-slate-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium tabular-nums text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% inclusive)</span>
                  <span className="font-medium tabular-nums text-slate-900">
                    {formatCurrency(tax)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-xl tabular-nums text-amber-900">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-900 px-6 py-4 text-base font-bold text-white shadow-lg shadow-amber-900/25 transition hover:bg-amber-900 active:scale-98 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    <span>Processing Order…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <span>Place Order ({formatCurrency(total)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>Zero Risk • Instant confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
