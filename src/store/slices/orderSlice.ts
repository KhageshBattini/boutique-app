import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

interface CreateOrderRequest {
  items: Array<{ productId: number; quantity: number }>;
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  countryCode: string;
  mobileNumber: string;
}

interface OrderResponse {
  id: number;
  total: number;
  status: string;
}

interface OrderHistoryItem {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: Array<{ productName: string; unitPrice: number; quantity: number }>;
}

interface OrderState {
  placing: boolean;
  error: string | null;
  lastOrder: OrderResponse | null;
  orders: OrderHistoryItem[];
  loadingHistory: boolean;
  historyError: string | null;
}

const initialState: OrderState = {
  placing: false,
  error: null,
  lastOrder: null,
  orders: [],
  loadingHistory: false,
  historyError: null,
};

export const fetchMyOrders = createAsyncThunk<OrderHistoryItem[], void, { rejectValue: string }>(
  'orders/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      return await api<OrderHistoryItem[]>('/orders');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to load your orders');
    }
  },
);

export const placeOrder = createAsyncThunk<OrderResponse, CreateOrderRequest, { rejectValue: string }>(
  'orders/create',
  async (order, { rejectWithValue }) => {
    try {
      return await api<OrderResponse>('/orders', {
        method: 'POST',
        body: JSON.stringify(order),
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to place order');
    }
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => { state.loadingHistory = true; state.historyError = null; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loadingHistory = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loadingHistory = false;
        state.historyError = action.payload ?? action.error.message ?? 'Unable to load your orders';
      })
      .addCase(placeOrder.pending, (state) => { state.placing = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placing = false;
        state.lastOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placing = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to place order';
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
