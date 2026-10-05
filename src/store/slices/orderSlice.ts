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

interface OrderState {
  placing: boolean;
  error: string | null;
  lastOrder: OrderResponse | null;
}

const initialState: OrderState = {
  placing: false,
  error: null,
  lastOrder: null,
};

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
