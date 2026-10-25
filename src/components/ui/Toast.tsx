'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { CheckCircle2, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-xl bg-stone-900 px-4 py-3.5 text-white shadow-2xl ring-1 ring-white/10 animate-toast-in motion-reduce:animate-none"
    >
      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
      <p className="text-sm font-medium leading-snug">{toastMessage}</p>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

