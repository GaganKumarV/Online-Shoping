import { CartItem, Product } from '@/types';

export interface CartCalculation {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

/**
 * Add an item to the cart or increment quantity up to available stock.
 */
export function addItemToCart(
  items: CartItem[],
  product: Product,
  quantityToAdd: number = 1
): CartItem[] {
  if (product.stock <= 0 || quantityToAdd <= 0) {
    return items;
  }

  const existingIndex = items.findIndex((item) => item.product.id === product.id);

  if (existingIndex > -1) {
    const existing = items[existingIndex];
    const newQuantity = Math.min(existing.quantity + quantityToAdd, product.stock);
    const updated = [...items];
    updated[existingIndex] = {
      ...existing,
      quantity: newQuantity,
    };
    return updated;
  }

  const initialQuantity = Math.min(quantityToAdd, product.stock);
  return [...items, { product, quantity: initialQuantity }];
}

/**
 * Remove an item completely from cart.
 */
export function removeItemFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

/**
 * Update quantity of a product in cart, respecting stock bounds.
 * If newQuantity <= 0, item is removed.
 */
export function updateCartItemQuantity(
  items: CartItem[],
  productId: number,
  newQuantity: number
): CartItem[] {
  if (newQuantity <= 0) {
    return removeItemFromCart(items, productId);
  }

  return items.map((item) => {
    if (item.product.id === productId) {
      const clampedQuantity = Math.min(newQuantity, item.product.stock);
      return {
        ...item,
        quantity: clampedQuantity,
      };
    }
    return item;
  });
}

/**
 * Pure calculation of all cart financial metrics.
 */
export function calculateCartTotals(items: CartItem[]): CartCalculation {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping;

  return {
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
  };
}
