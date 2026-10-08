import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import type { Product } from './productsSlice';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartMutationRequest {
  id: number;
  persist: boolean;
}

interface AddCartItemRequest {
  product: Product;
  persist: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const fetchCart = createAsyncThunk<CartItem[]>(
  'cart/fetch',
  async () => {
    const items = await api<Array<Omit<CartItem, 'id'> & { productId: number }>>('/cart');
    return items.map(({ productId, ...item }) => ({ id: productId, ...item }));
  },
);

export const addCartItem = createAsyncThunk<CartItem, AddCartItemRequest>(
  'cart/addItem',
  async ({ product, persist }) => {
    if (persist) {
      await api<void>(`/cart/items/${product.id}`, { method: 'POST' });
    }
    return { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image };
  },
);

export const updateCartItemQuantity = createAsyncThunk<CartMutationRequest & { quantity: number }, CartMutationRequest & { quantity: number }>(
  'cart/updateItemQuantity',
  async ({ id, quantity, persist }) => {
    if (persist) {
      await api<void>(`/cart/items/${id}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
    }
    return { id, quantity, persist };
  },
);

export const deleteCartItem = createAsyncThunk<CartMutationRequest, CartMutationRequest>(
  'cart/deleteItem',
  async ({ id, persist }) => {
    if (persist) {
      await api<void>(`/cart/items/${id}`, { method: 'DELETE' });
    }
    return { id, persist };
  },
);

export const clearPersistedCart = createAsyncThunk<boolean, boolean>(
  'cart/clearPersisted',
  async (persist) => {
    if (persist) await api<void>('/cart/items', { method: 'DELETE' });
    return true;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.fulfilled, (state, action) => {
        const { id, ...cartItem } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) existingItem.quantity += 1;
        else state.items.push({ id, ...cartItem });
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find((entry) => entry.id === action.payload.id);
        if (item) item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      })
      .addCase(clearPersistedCart.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
