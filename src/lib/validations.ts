import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  body: z
    .string()
    .min(10, 'Post body must be at least 10 characters')
    .max(50000, 'Post body must be less than 50000 characters'),
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const emailOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verifyOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
  token: z
    .string()
    .length(6, 'OTP must be exactly 6 characters')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type EmailOTPInput = z.infer<typeof emailOTPSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
