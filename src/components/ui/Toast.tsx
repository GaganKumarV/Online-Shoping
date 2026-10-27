'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { CheckCircle2, X } from 'lucide-react';

export function Toast() {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  const handleAction = () => {
    toast.onAction?.();
    dismissToast();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed inset-x-4 bottom-4 z-50 flex items-center gap-3 rounded-xl bg-stone-900 px-4 py-3.5 text-white shadow-2xl ring-1 ring-white/10 animate-toast-in motion-reduce:animate-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md"
    >
      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-sm font-medium leading-snug">{toast.message}</p>

      {toast.actionLabel && toast.onAction && (
        <button
          type="button"
          onClick={handleAction}
          className="min-h-9 flex-shrink-0 rounded-lg px-2.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-stone-800 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {toast.actionLabel}
        </button>
      )}

      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
