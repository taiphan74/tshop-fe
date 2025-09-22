import { z } from 'zod';

// Enums
export const genderEnum = z.enum(['male', 'female']);
export const userRoleEnum = z.enum(['user', 'admin']);

// User schema (for API responses)
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string().optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: genderEnum.optional(),
  size_preference: z.string().optional(),
  style_preference: z.string().optional(),
  is_email_verified: z.boolean(),
  role: userRoleEnum,
  created_at: z.date().optional(),
  last_login: z.date().optional(),
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string(),
});

// Register schema
export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string(),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type Gender = z.infer<typeof genderEnum>;
export type UserRole = z.infer<typeof userRoleEnum>;