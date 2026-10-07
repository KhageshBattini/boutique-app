import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';
import type { Product } from './productsSlice';

interface WishlistState {
  items: Product[];
  loading: boolean;
  mutating: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  mutating: false,
  error: null,
};

const messageFor = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const fetchWishlist = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await api<Product[]>('/wishlist');
    } catch (error) {
      return rejectWithValue(messageFor(error, 'Unable to load your wishlist'));
    }
  },
);

export const addProductToWishlist = createAsyncThunk<Product, number, { rejectValue: string }>(
  'wishlist/add',
  async (productId, { rejectWithValue }) => {
    try {
      return await api<Product>(`/wishlist/items/${productId}`, { method: 'POST' });
    } catch (error) {
      return rejectWithValue(messageFor(error, 'Unable to add this product to your wishlist'));
    }
  },
);

export const removeProductFromWishlist = createAsyncThunk<number, number, { rejectValue: string }>(
  'wishlist/remove',
  async (productId, { rejectWithValue }) => {
    try {
      await api<void>(`/wishlist/items/${productId}`, { method: 'DELETE' });
      return productId;
    } catch (error) {
      return rejectWithValue(messageFor(error, 'Unable to remove this product from your wishlist'));
    }
  },
);

export const moveCartItemToWishlist = createAsyncThunk<Product, number, { rejectValue: string }>(
  'wishlist/moveFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      return await api<Product>(`/wishlist/items/${productId}/move-from-cart`, { method: 'POST' });
    } catch (error) {
      return rejectWithValue(messageFor(error, 'Unable to move this product to your wishlist'));
    }
  },
);

const upsertWishlistProduct = (items: Product[], product: Product) => {
  const existingIndex = items.findIndex((item) => item.id === product.id);
  if (existingIndex >= 0) items[existingIndex] = product;
  else items.unshift(product);
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWishlist.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to load your wishlist';
      })
      .addCase(addProductToWishlist.pending, (state) => { state.mutating = true; state.error = null; })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.mutating = false;
        upsertWishlistProduct(state.items, action.payload);
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to add this product to your wishlist';
      })
      .addCase(removeProductFromWishlist.pending, (state) => { state.mutating = true; state.error = null; })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.mutating = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to remove this product from your wishlist';
      })
      .addCase(moveCartItemToWishlist.pending, (state) => { state.mutating = true; state.error = null; })
      .addCase(moveCartItemToWishlist.fulfilled, (state, action) => {
        state.mutating = false;
        upsertWishlistProduct(state.items, action.payload);
      })
      .addCase(moveCartItemToWishlist.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to move this product to your wishlist';
      });
  },
});

export default wishlistSlice.reducer;
