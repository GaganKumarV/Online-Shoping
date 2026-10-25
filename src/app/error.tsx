'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App-level error caught:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
        <AlertTriangle className="h-7 w-7 stroke-1" aria-hidden="true" />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-stone-900 text-balance">
        We hit a small snag
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone-600 text-pretty">
        This page couldn&apos;t load just now. Try again — your basket is safe and nothing has been
        charged.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => reset()} className="btn-primary">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
