export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: 'books' | 'electronics' | string;
  image_url: string;
  stock: number;
  rating: number;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DRAWER'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] };

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethodType = 'card' | 'upi' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped';
  createdAt: string;
}

export interface ProductFilterParams {
  category?: string;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'featured';
  minPrice?: number;
  maxPrice?: number;
}
