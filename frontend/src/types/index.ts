export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: 'customer' | 'provider' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  estimatedDurationMinutes: number;
  iconUrl: string;
  isActive: boolean;
  createdAt: string;
}

export type ServiceCategory =
  | 'cleaning'
  | 'plumbing'
  | 'electrical'
  | 'carpentry'
  | 'painting'
  | 'salon';

export interface Provider {
  id: string;
  userId: string;
  user?: User;
  serviceIds: string[];
  currentLatitude: number;
  currentLongitude: number;
  isAvailable: boolean;
  isVerified?: boolean;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  averageRating?: number;
  totalJobs: number;
  completedJobs?: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  lastLocationUpdate: string;
  createdAt: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'en_route'
  | 'in_transit'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface Booking {
  id: string;
  bookingCode: string;
  userId: string;
  serviceId: string;
  providerId: string | null;
  service?: Service;
  provider?: Provider;
  serviceAddress: string;
  address?: string;
  serviceLatitude: number;
  serviceLongitude: number;
  contactPhone: string;
  specialInstructions: string | null;
  scheduledDate?: string;
  scheduledTime?: string;
  status: BookingStatus;
  basePrice: number;
  distanceCharge: number;
  surgeMultiplier: number;
  totalPrice: number;
  totalAmount?: number;
  estimatedArrivalMinutes: number | null;
  providerAssignedAt: string | null;
  providerArrivedAt: string | null;
  serviceStartedAt: string | null;
  serviceCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
  cancellationReason: string | null;
}

export interface Rating {
  id: string;
  bookingId: string;
  userId: string;
  providerId: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  bookingId: string | null;
  type: string;
  channel: 'email' | 'sms' | 'push';
  status: 'pending' | 'sent' | 'failed';
  content: string;
  sentAt: string | null;
  createdAt: string;
}

export interface BookingFormData {
  serviceId: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  notes: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
