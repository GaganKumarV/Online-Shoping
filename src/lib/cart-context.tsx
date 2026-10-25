'use client';

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { CartItem, Product, CartAction, CartState } from '@/types';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  calculateCartTotals,
  CartCalculation,
} from './cart-reducer';

interface CartContextValue extends CartCalculation {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CART_STORAGE_KEY = 'mati_cart_v1';
const LEGACY_CART_STORAGE_KEY = 'gdg_cart_v1';

const CartContext = createContext<CartContextValue | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: addItemToCart(state.items, action.payload.product, action.payload.quantity ?? 1),
        isOpen: true, // auto-open drawer on add
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload.productId),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: updateCartItemQuantity(
          state.items,
          action.payload.productId,
          action.payload.quantity
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_DRAWER':
      return {
        ...state,
        isOpen: action.payload,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(CART_STORAGE_KEY) ?? localStorage.getItem(LEGACY_CART_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'LOAD_CART', payload: parsed });
        }
        // Migrate the pre-rebrand cart to the Mati Living key.
        localStorage.setItem(CART_STORAGE_KEY, stored);
        localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    } finally {
      setHasLoadedFromStorage(true);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!hasLoadedFromStorage) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [state.items, hasLoadedFromStorage]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const addItem = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) {
      showToast(`Sorry, "${product.name}" is currently out of stock.`);
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    showToast(`Added "${product.name}" to your cart.`);
  };

  const removeItem = (productId: number) => {
    const item = state.items.find((i) => i.product.id === productId);
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    if (item) {
      showToast(`Removed "${item.product.name}" from cart.`);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openDrawer = () => dispatch({ type: 'SET_DRAWER', payload: true });
  const closeDrawer = () => dispatch({ type: 'SET_DRAWER', payload: false });
  const dismissToast = () => setToastMessage(null);

  const calculations = calculateCartTotals(state.items);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isDrawerOpen: state.isOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toastMessage,
        dismissToast,
        ...calculations,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
