export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    email: string;
    full_name?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: Gender;
    size_preference?: string;
    style_preference?: string;
    is_email_verified: boolean;
    role: UserRole;
    created_at?: Date;
    last_login?: Date;
}

export interface AuthError {
    statusCode: number;
    message: string;
    error?: string;
    details?: any;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
}

export interface ConfirmOtpRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
} 