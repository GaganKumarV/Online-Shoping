/**
 * Pure cart reducer functions for cart manipulation and testing
 */

export function addItemToCart(items, product, quantityToAdd = 1) {
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

export function removeItemFromCart(items, productId) {
  return items.filter((item) => item.product.id !== productId);
}

export function updateCartItemQuantity(items, productId, newQuantity) {
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

export function calculateCartTotals(items) {
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
