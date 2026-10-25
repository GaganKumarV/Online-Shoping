/**
 * Format currency with Indian Rupee symbol (₹) and Indian number formatting
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate shipping cost (Free above ₹999, else ₹99)
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= 999 ? 0 : 99;
}

/**
 * Calculate estimated GST (18% inclusive or breakdown)
 */
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * 0.18);
}

/**
 * Format date nicely
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Generate human-readable order ID
 */
export function generateOrderNumber(): string {
  const prefix = 'GDG';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${random}`;
}
