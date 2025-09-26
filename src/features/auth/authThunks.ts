import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/common/api';
import { AuthResponse, LoginCredentials, RegisterData, VerifyEmailRequest, ConfirmOtpRequest, ForgotPasswordRequest, ResetPasswordRequest, AuthError } from './types';

// Async thunk for sign in
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/sign-in', credentials);
      console.log('Sign in response:', response.data);
      return response.data as AuthResponse;
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Sign in failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
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
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Sign up failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
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
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Verify email failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
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
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Confirm OTP failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Forgot password failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      const authError: AuthError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Reset password failed',
        error: error.response?.data?.error,
        details: error.response?.data
      };
      return rejectWithValue(authError);
    }
  }
);