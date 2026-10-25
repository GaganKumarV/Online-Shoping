import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8"
    >
      <span className="sr-only">Loading product details…</span>
      <div className="h-3 w-56 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="aspect-square w-full animate-pulse rounded-3xl bg-stone-100 lg:col-span-6 motion-reduce:animate-none" />
        <div className="space-y-5 lg:col-span-6">
          <div className="h-5 w-24 animate-pulse rounded-full bg-stone-100 motion-reduce:animate-none" />
          <div className="h-10 w-4/5 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
          <div className="h-4 w-32 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
          <div className="h-9 w-40 animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
          <div className="h-20 w-full animate-pulse rounded bg-stone-100 motion-reduce:animate-none" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-stone-100 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
