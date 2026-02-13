import axios from 'axios';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authToken = null;
      window.location.href = '/access';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { fullName: string; email: string; phone: string; password: string }) =>
    api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

// Services
export const serviceApi = {
  getAll: () => api.get('/services'),
  getById: (id: string) => api.get(`/services/${id}`),
};

// Bookings
export const bookingApi = {
  create: (data: {
    serviceId: string;
    address: string;
    latitude: number;
    longitude: number;
    scheduledDate: string;
    scheduledTime: string;
    notes?: string;
  }) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  getById: (id: string) => api.get(`/bookings/${id}`),
  cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
  rate: (id: string, data: { score: number; review: string }) =>
    api.post(`/bookings/${id}/rate`, data),
};

// Provider
export const providerApi = {
  getAssignedBookings: () => api.get('/provider/bookings'),
  acceptBooking: (id: string) => api.patch(`/provider/bookings/${id}/accept`),
  startService: (id: string) => api.patch(`/provider/bookings/${id}/start`),
  completeService: (id: string) => api.patch(`/provider/bookings/${id}/complete`),
  updateLocation: (data: { latitude: number; longitude: number }) =>
    api.post('/provider/location', data),
  toggleAvailability: () => api.patch('/provider/availability'),
  getStats: () => api.get('/provider/stats'),
};

// Admin
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAllBookings: (params?: { status?: string; page?: number }) =>
    api.get('/admin/bookings', { params }),
  getAllProviders: () => api.get('/admin/providers'),
  approveProvider: (id: string) => api.patch(`/admin/providers/${id}/approve`),
  getAllUsers: () => api.get('/admin/users'),
};

export default api;
