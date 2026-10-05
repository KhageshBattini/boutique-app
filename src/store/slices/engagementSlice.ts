import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmissionResponse {
  message: string;
}

interface EngagementState {
  sendingMessage: boolean;
  subscribing: boolean;
  contactError: string | null;
  subscriptionError: string | null;
}

const initialState: EngagementState = {
  sendingMessage: false,
  subscribing: false,
  contactError: null,
  subscriptionError: null,
};

const getErrorMessage = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const sendContactMessage = createAsyncThunk<SubmissionResponse, ContactMessage, { rejectValue: string }>(
  'engagement/sendContactMessage',
  async (message, { rejectWithValue }) => {
    try {
      return await api<SubmissionResponse>('/contact', {
        method: 'POST',
        body: JSON.stringify(message),
      });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not send your message. Please try again.'));
    }
  },
);

export const subscribeToNewsletter = createAsyncThunk<SubmissionResponse, string, { rejectValue: string }>(
  'engagement/subscribeToNewsletter',
  async (email, { rejectWithValue }) => {
    try {
      return await api<SubmissionResponse>('/subscriptions', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not subscribe. Please try again.'));
    }
  },
);

const engagementSlice = createSlice({
  name: 'engagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => { state.sendingMessage = true; state.contactError = null; })
      .addCase(sendContactMessage.fulfilled, (state) => { state.sendingMessage = false; })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.contactError = action.payload ?? action.error.message ?? 'Could not send your message. Please try again.';
      })
      .addCase(subscribeToNewsletter.pending, (state) => { state.subscribing = true; state.subscriptionError = null; })
      .addCase(subscribeToNewsletter.fulfilled, (state) => { state.subscribing = false; })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.subscribing = false;
        state.subscriptionError = action.payload ?? action.error.message ?? 'Could not subscribe. Please try again.';
      });
  },
});

export default engagementSlice.reducer;
