import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Truck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Express Shipping</h4>
                <p className="text-xs text-slate-400">On all prepaid orders over ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Genuine Guarantee</h4>
                <p className="text-xs text-slate-400">Directly sourced official editions</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <RotateCcw className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">7-Day Easy Replacement</h4>
                <p className="text-xs text-slate-400">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <CreditCard className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
                <p className="text-xs text-slate-400">UPI, Cards, NetBanking, COD</p>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <span>GDG<span className="text-indigo-400">.com</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              India&apos;s premier destination for essential programming books and curated developer electronics.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=books" className="hover:text-white transition-colors">
                  Tech & Software Books
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-white transition-colors">
                  Premium Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?sort=rating" className="hover:text-white transition-colors">
                  Top Rated
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
                <span className="text-slate-400">Delivery Information</span>
              </li>
              <li>
                <span className="text-slate-400">Terms & Conditions</span>
              </li>
            </ul>
          </div>

          {/* Contact / Location */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact & Support</h3>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Have questions or need assistance with your order?
            </p>
            <p className="mt-2 text-sm font-medium text-white">support@gdg.com</p>
            <p className="mt-1 text-xs text-slate-500">Available Mon–Sat, 9:00 AM – 7:00 PM IST</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GDG.com. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-400">UPI</span>
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-400">Visa / Mastercard</span>
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-400">NetBanking</span>
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-400">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
