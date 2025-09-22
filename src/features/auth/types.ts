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

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
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