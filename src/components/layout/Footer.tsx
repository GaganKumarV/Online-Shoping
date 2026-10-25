import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      {/* Value Proposition Highlights */}
      <div className="border-b border-stone-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-xl border border-stone-800 bg-stone-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800/20 text-amber-400">
                <Truck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Free Express Shipping</p>
                <p className="text-xs text-stone-400">On all prepaid orders over ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-stone-800 bg-stone-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800/20 text-amber-400">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">100% Handmade Guarantee</p>
                <p className="text-xs text-stone-400">Sourced directly from artisans</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-stone-800 bg-stone-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800/20 text-amber-400">
                <RotateCcw className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">7-Day Easy Returns</p>
                <p className="text-xs text-stone-400">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-stone-800 bg-stone-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800/20 text-amber-400">
                <CreditCard className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Secure Payments</p>
                <p className="text-xs text-stone-400">UPI, Cards, NetBanking, COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-800 text-amber-200">
                <Leaf className="h-4 w-4" aria-hidden="true" />
              </div>
              <span>Mati <span className="text-amber-400">Living</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              India&apos;s home for handmade ceramics, block-printed textiles, artisan lighting, and slow-made home decor.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Collections</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=ceramics" className="hover:text-white transition-colors">
                  Ceramics
                </Link>
              </li>
              <li>
                <Link href="/products?category=textiles" className="hover:text-white transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="hover:text-white transition-colors">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/products?category=decor" className="hover:text-white transition-colors">
                  Decor &amp; Objects
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Customer Care</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <span className="text-stone-400">Delivery Information</span>
              </li>
              <li>
                <span className="text-stone-400">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact &amp; Support</h3>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed">
              Have questions or need assistance with your order?
            </p>
            <p className="mt-2 text-sm font-medium text-white">support@matiliving.in</p>
            <p className="mt-1 text-xs text-stone-400">Available Mon–Sat, 9:00 AM – 7:00 PM IST</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Mati Living. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="rounded bg-stone-800 px-2 py-1 text-stone-400">UPI</span>
            <span className="rounded bg-stone-800 px-2 py-1 text-stone-400">Visa / Mastercard</span>
            <span className="rounded bg-stone-800 px-2 py-1 text-stone-400">NetBanking</span>
            <span className="rounded bg-stone-800 px-2 py-1 text-stone-400">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
