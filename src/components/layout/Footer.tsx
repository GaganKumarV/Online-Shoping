import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Leaf } from 'lucide-react';

const highlights = [
  {
    icon: Truck,
    title: 'Free express shipping',
    copy: 'On all prepaid orders over ₹999',
  },
  {
    icon: ShieldCheck,
    title: 'Handmade guarantee',
    copy: 'Sourced directly from artisan workshops',
  },
  {
    icon: RotateCcw,
    title: '7-day easy returns',
    copy: 'In the original packaging',
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    copy: 'UPI, cards, NetBanking, and COD',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      {/* Value props */}
      <div className="border-b border-stone-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-800/20 text-amber-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-stone-400">{item.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded text-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-800 text-amber-100">
                <Leaf className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-medium tracking-tight">
                Mati <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">Living</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              Handmade ceramics, block-printed textiles, warm lighting, and small-batch objects
              from workshops across India.
            </p>
            <p className="text-xs text-stone-500">
              Mati means soil. It&apos;s where every piece begins.
            </p>
          </div>

          <nav aria-label="Collections" className="md:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Collections
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
              {[
                { href: '/products?category=ceramics', label: 'Ceramics' },
                { href: '/products?category=textiles', label: 'Textiles' },
                { href: '/products?category=lighting', label: 'Lighting' },
                { href: '/products?category=decor', label: 'Objects' },
                { href: '/products?sort=newest', label: 'New arrivals' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 items-center rounded text-stone-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Your order" className="md:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Your order
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <Link
                  href="/cart"
                  className="inline-flex min-h-9 items-center rounded text-stone-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Shopping bag
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="inline-flex min-h-9 items-center rounded text-stone-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Checkout
                </Link>
              </li>
              <li className="pt-2 text-xs leading-relaxed text-stone-500">
                Free shipping over ₹999
                <br />
                7-day returns
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Contact
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Need a hand with an order or a piece?
            </p>
            <a
              href="mailto:support@matiliving.in"
              className="mt-2 inline-flex min-h-9 items-center rounded text-sm font-medium text-white transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              support@matiliving.in
            </a>
            <p className="mt-1 text-xs text-stone-500">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-stone-800 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Mati Living. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {['UPI', 'Visa / Mastercard', 'NetBanking', 'COD'].map((method) => (
              <span key={method} className="rounded bg-stone-800 px-2 py-1 text-stone-400">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
