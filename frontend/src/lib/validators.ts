import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(64, 'Password must be less than 64 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  address: z
    .string()
    .min(10, 'Please enter your full address')
    .max(200, 'Address must be less than 200 characters'),
  scheduledDate: z.string().min(1, 'Please select a date'),
  scheduledTime: z.string().min(1, 'Please select a time'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export const providerSignupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  serviceCategory: z.string().min(1, 'Please select a service category'),
  experience: z
    .number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Please enter a valid experience'),
  idProof: z.string().min(1, 'Please upload an ID proof'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BookingFormValues = z.infer<typeof bookingSchema>;
export type ProviderSignupFormValues = z.infer<typeof providerSignupSchema>;
