import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  calculateCartTotals,
} from '../lib/cart-reducer.mjs';

const mockBook = {
  id: 1,
  name: 'Clean Code',
  slug: 'clean-code',
  price: 1450,
  description: 'A handbook of agile craftsmanship',
  category: 'books',
  image_url: 'https://images.unsplash.com/test1.jpg',
  stock: 5,
  rating: 4.8,
};

const mockHeadphones = {
  id: 2,
  name: 'Sony WH-1000XM5',
  slug: 'sony-wh-1000xm5',
  price: 26990,
  description: 'Premium noise cancelling',
  category: 'electronics',
  image_url: 'https://images.unsplash.com/test2.jpg',
  stock: 2,
  rating: 4.9,
};

describe('Cart Reducer Logic', () => {
  it('adds a new item to an empty cart', () => {
    const items = addItemToCart([], mockBook, 1);
    assert.equal(items.length, 1);
    assert.equal(items[0].product.id, 1);
    assert.equal(items[0].quantity, 1);
  });

  it('increments quantity when existing item is added', () => {
    let items = addItemToCart([], mockBook, 1);
    items = addItemToCart(items, mockBook, 2);
    assert.equal(items.length, 1);
    assert.equal(items[0].quantity, 3);
  });

  it('clamps added quantity to maximum available stock', () => {
    let items = addItemToCart([], mockHeadphones, 1); // stock is 2
    items = addItemToCart(items, mockHeadphones, 5); // attempt to add 5 more
    assert.equal(items[0].quantity, 2); // capped at stock = 2
  });

  it('does not add out of stock item', () => {
    const outOfStockItem = { ...mockBook, id: 99, stock: 0 };
    const items = addItemToCart([], outOfStockItem, 1);
    assert.equal(items.length, 0);
  });

  it('updates item quantity accurately', () => {
    let items = [{ product: mockBook, quantity: 2 }];
    items = updateCartItemQuantity(items, 1, 4);
    assert.equal(items[0].quantity, 4);
  });

  it('clamps updated quantity to stock limit', () => {
    let items = [{ product: mockHeadphones, quantity: 1 }];
    items = updateCartItemQuantity(items, 2, 10);
    assert.equal(items[0].quantity, 2);
  });

  it('removes item when quantity is updated to 0 or negative', () => {
    let items = [{ product: mockBook, quantity: 2 }];
    items = updateCartItemQuantity(items, 1, 0);
    assert.equal(items.length, 0);
  });

  it('removes item completely using removeItemFromCart', () => {
    let items = [
      { product: mockBook, quantity: 1 },
      { product: mockHeadphones, quantity: 1 },
    ];
    items = removeItemFromCart(items, 1);
    assert.equal(items.length, 1);
    assert.equal(items[0].product.id, 2);
  });

  it('calculates totals correctly with shipping for small order', () => {
    const items = [{ product: { ...mockBook, price: 500 }, quantity: 1 }];
    const totals = calculateCartTotals(items);
    assert.equal(totals.itemCount, 1);
    assert.equal(totals.subtotal, 500);
    assert.equal(totals.shipping, 99); // < 999 incurs ₹99 shipping
    assert.equal(totals.total, 599);
  });

  it('calculates free shipping for order above ₹999 threshold', () => {
    const items = [{ product: mockHeadphones, quantity: 1 }]; // price: 26990
    const totals = calculateCartTotals(items);
    assert.equal(totals.itemCount, 1);
    assert.equal(totals.subtotal, 26990);
    assert.equal(totals.shipping, 0); // >= 999 has free shipping
    assert.equal(totals.total, 26990);
  });
});
