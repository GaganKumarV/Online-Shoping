import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100/70 text-amber-900">
        <FileQuestion className="h-7 w-7 stroke-1" aria-hidden="true" />
      </div>
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-stone-900 text-balance sm:text-5xl">
        This page has gone missing
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone-600 text-pretty">
        The piece or page you were looking for may have sold out, moved, or never existed. The
        collection is still right here.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/products" className="btn-primary">
          Browse the collection
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/" className="btn-secondary">
          Return home
        </Link>
      </div>
    </div>
  );
}
