import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationDetails extends LoginCredentials {
  firstName: string;
  lastName: string;
}

interface ProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const errorMessage = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      localStorage.setItem('authToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(errorMessage(error, 'Unable to sign in'));
    }
  },
);

export const registerUser = createAsyncThunk<AuthResponse, RegistrationDetails, { rejectValue: string }>(
  'auth/register',
  async (details, { rejectWithValue }) => {
    try {
      const response = await api<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
      });
      localStorage.setItem('authToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(errorMessage(error, 'Unable to create account'));
    }
  },
);

export const saveProfile = createAsyncThunk<User, ProfileDetails, { rejectValue: string }>(
  'auth/updateProfile',
  async (details, { rejectWithValue }) => {
    try {
      return await api<User>('/auth/me', {
        method: 'PUT',
        body: JSON.stringify(details),
      });
    } catch (error) {
      return rejectWithValue(errorMessage(error, 'Unable to update profile'));
    }
  },
);

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    try {
      await api<void>('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('authToken');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => { state.error = null; },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to sign in';
      })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to create account';
      })
      .addCase(saveProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to update profile';
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, () => initialState);
  },
});

export const { clearAuthError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
