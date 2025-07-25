import { create } from 'zustand';
import api from '../utils/api';
import { Product } from '../hooks/useProducts';

interface CartItem {
  product: Product;
  quantity: number;
  _id: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/cart');
      set({ items: res.data.items.map((i: any) => ({ product: i.product, quantity: i.quantity, _id: i._id })), loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error al cargar carrito', loading: false });
    }
  },
  addToCart: async (productId: string, quantity: number = 1) => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart/add', { productId, quantity });
      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error al agregar al carrito', loading: false });
    }
  },
  removeFromCart: async (productId: string) => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart/remove', { productId });
      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error al quitar del carrito', loading: false });
    }
  },
  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart/clear');
      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error al limpiar el carrito', loading: false });
    }
  },
})); 