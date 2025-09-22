import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/common/api';
import { AuthResponse, LoginCredentials, RegisterData } from './types';

// Async thunk for sign in
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/sign-in', credentials);
      console.log('Sign in response:', response.data);
      return response.data as AuthResponse;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign in failed');
    }
  }
);

// Async thunk for sign up
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/sign-up', userData);
      return response.data as AuthResponse;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign up failed');
    }
  }
);