import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/common/api';
import { AuthResponse, LoginCredentials, RegisterData, VerifyEmailRequest, ConfirmOtpRequest } from './types';

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

// Async thunk for verify email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-email', data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Verify email failed');
    }
  }
);

// Async thunk for confirm OTP
export const confirmOtp = createAsyncThunk(
  'auth/confirmOtp',
  async (data: ConfirmOtpRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-email/confirm', data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Confirm OTP failed');
    }
  }
);