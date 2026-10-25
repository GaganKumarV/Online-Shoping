'use client';

import React, { useRef, useState } from 'react';
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
  AlertCircle,
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
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

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
    const errorCount = Object.keys(errs).length;

    if (errorCount > 0) {
      setFormError(
        errorCount === 1
          ? 'One detail needs your attention before we can place the order.'
          : `${errorCount} details need your attention before we can place the order.`
      );
      window.setTimeout(() => {
        errorSummaryRef.current?.focus();
        errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 40);
      return false;
    }

    setFormError(null);
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

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

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success && data.order) {
        // Persist order in sessionStorage so confirmation page can display it
        sessionStorage.setItem(`order_${data.order.id}`, JSON.stringify(data.order));
        clearCart();
        router.push(`/order-confirmation/${data.order.id}`);
      } else {
        setFormError(
          data?.message ||
            'We could not place your order just now. Your cart is safe — please try again.'
        );
        window.setTimeout(() => errorSummaryRef.current?.focus(), 40);
      }
    } catch (err) {
      console.error('Order creation failed:', err);
      setFormError(
        'We could not reach the checkout service. Check your connection and try again — your cart has been kept.'
      );
      window.setTimeout(() => errorSummaryRef.current?.focus(), 40);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name: keyof FormErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-rose-700">
        {errors[name]}
      </p>
    ) : null;

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const inputClass =
    'mt-1.5 h-11 w-full rounded-xl border border-stone-500/60 bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-500 focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20 aria-[invalid=true]:border-rose-500';

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-stone-900 text-balance">
          Nothing to check out yet
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Add a piece to your basket and we&apos;ll have it packed and on its way.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Checkout header */}
      <div className="flex items-start gap-4 border-b border-stone-200 pb-6">
        <Link
          href="/cart"
          className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 focus-visible:ring-offset-2"
          aria-label="Back to basket"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
            <Lock className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
            Encrypted checkout · Your details stay private
          </p>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate aria-busy={isSubmitting}>
        {formError && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" aria-hidden="true" />
            <div>
              <p className="font-semibold">We couldn&apos;t place your order</p>
              <p className="mt-0.5 text-rose-700">{formError}</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Form left: shipping & payment */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Contact & shipping address */}
            <section className="surface-card space-y-5 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-stone-100 pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900 text-[11px] font-semibold text-white">
                  1
                </span>
                <h2 className="font-display text-xl font-medium text-stone-900">
                  Delivery address
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-stone-700">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    required aria-required="true" placeholder="e.g. Gagan Deep"
                    className={inputClass}
                  />
                  {fieldError('fullName')}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700">
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
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required aria-required="true" placeholder="name@example.com"
                    className={inputClass}
                  />
                  {fieldError('email')}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-stone-700">
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
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    required aria-required="true" placeholder="9876543210"
                    className={inputClass}
                  />
                  {fieldError('phone')}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="streetAddress" className="block text-xs font-semibold text-stone-700">
                    Street Address & House/Flat No. *
                  </label>
                  <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    aria-invalid={Boolean(errors.streetAddress)}
                    aria-describedby={errors.streetAddress ? 'streetAddress-error' : undefined}
                    required aria-required="true" placeholder="Flat 402, Sunshine Apartments, 12th Main Road"
                    className={inputClass}
                  />
                  {fieldError('streetAddress')}
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-stone-700">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                    required aria-required="true" placeholder="Bengaluru"
                    className={inputClass}
                  />
                  {fieldError('city')}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-stone-700">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    aria-required="true"
                    className={inputClass}
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
                  <label htmlFor="postalCode" className="block text-xs font-semibold text-stone-700">
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
                    aria-invalid={Boolean(errors.postalCode)}
                    aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                    required aria-required="true" placeholder="560001"
                    className={inputClass}
                  />
                  {fieldError('postalCode')}
                </div>

                <div>
                  <label htmlFor="country" className="block text-xs font-semibold text-stone-700">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    disabled
                    value="India"
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-100 px-3.5 py-2 text-sm text-stone-600"
                  />
                </div>
              </div>
            </section>

            {/* 2. Payment method (mock flow, Stripe-ready) */}
            <section className="surface-card space-y-5 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900 text-[11px] font-semibold text-white">
                    2
                  </span>
                  <h2 className="font-display text-xl font-medium text-stone-900">
                    Payment
                  </h2>
                </div>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                  Test mode
                </span>
              </div>

              {/* Payment Select Options */}
              <div role="group" aria-label="Choose a payment method" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  aria-pressed={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'card'
                      ? 'border-amber-900 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">Credit/Debit</span>
                </button>

                <button
                  type="button"
                  aria-pressed={paymentMethod === 'upi'}
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'upi'
                      ? 'border-amber-900 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <QrCode className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  aria-pressed={paymentMethod === 'netbanking'}
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'netbanking'
                      ? 'border-amber-900 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <Building className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">NetBanking</span>
                </button>

                <button
                  type="button"
                  aria-pressed={paymentMethod === 'cod'}
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 ${
                    paymentMethod === 'cod'
                      ? 'border-amber-900 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <Banknote className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-semibold">Cash on Delivery</span>
                </button>
              </div>

              {/* Dynamic Payment Input Section */}
              {paymentMethod === 'card' && (
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                  <p className="text-xs text-stone-500">
                    Enter any test card details. No actual real card will be charged.
                  </p>
                  <div>
                    <label htmlFor="cardNumber" className="block text-xs font-semibold text-stone-700">
                      Card Number *
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      aria-invalid={Boolean(errors.cardNumber)}
                      aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                      className={inputClass}
                    />
                    {fieldError('cardNumber')}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-xs font-semibold text-stone-700">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        aria-invalid={Boolean(errors.cardExpiry)}
                        aria-describedby={errors.cardExpiry ? 'cardExpiry-error' : undefined}
                        className={inputClass}
                      />
                      {fieldError('cardExpiry')}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-xs font-semibold text-stone-700">
                        CVC / CVV *
                      </label>
                      <input
                        id="cardCvc"
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        aria-invalid={Boolean(errors.cardCvc)}
                        aria-describedby={errors.cardCvc ? 'cardCvc-error' : undefined}
                        className={inputClass}
                      />
                      {fieldError('cardCvc')}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                  <p className="text-xs text-stone-500">
                    Pay using Google Pay, PhonePe, Paytm, or BHIM UPI ID.
                  </p>
                  <div>
                    <label htmlFor="upiId" className="block text-xs font-semibold text-stone-700">
                      Virtual Payment Address (UPI ID) *
                    </label>
                    <input
                      id="upiId"
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(e) => setUpiId(e.target.value)}
                      aria-invalid={Boolean(errors.upiId)}
                      aria-describedby={errors.upiId ? 'upiId-error' : undefined}
                      className={inputClass}
                    />
                    {fieldError('upiId')}
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                  <p className="text-xs text-stone-600">
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

          {/* Form right: order summary & primary action */}
          <div className="space-y-6 lg:col-span-5">
            <div className="surface-card sticky top-24 space-y-6 p-6 sm:p-7">
              <h2 className="font-display text-2xl font-medium text-stone-900">Order summary</h2>

              {/* Items Preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-stone-100 pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-stone-100 bg-stone-50">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{product.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-bold tabular-nums text-stone-900">
                      {formatCurrency(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 border-t border-stone-200 pt-4 text-sm text-stone-600">
                <div className="flex justify-between gap-4">
                  <span>Subtotal</span>
                  <span className="font-medium tabular-nums text-stone-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Delivery</span>
                  <span className="font-medium tabular-nums text-stone-900">
                    {shipping === 0 ? (
                      <span className="font-semibold text-emerald-700">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-stone-200 pt-4">
                  <span className="text-base font-semibold text-stone-900">Total</span>
                  <span className="font-display text-2xl font-medium tabular-nums text-stone-900">
                    {formatCurrency(total)}
                  </span>
                </div>
                <p className="text-right text-xs text-stone-500">
                  Inclusive of all taxes · {formatCurrency(tax)} GST
                </p>
              </div>

              {/* Place order */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary min-h-[52px] w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
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

              <div className="flex items-center gap-2 text-xs text-stone-500 justify-center">
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
