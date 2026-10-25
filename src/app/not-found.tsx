import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-900 text-amber-900 mb-6">
        <FileQuestion className="h-10 w-10 stroke-1" aria-hidden="true" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500 leading-relaxed">
        The product or page you are looking for may have been moved, removed, or is temporarily unavailable.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
        >
          Return Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900"
        >
          Browse All Products
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
