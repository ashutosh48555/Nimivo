import { create } from 'zustand';
import type { Booking } from '@/types';
import { bookingApi } from '@/lib/api';

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;

  fetchMyBookings: () => Promise<void>;
  fetchBooking: (id: string) => Promise<void>;
  createBooking: (data: {
    serviceId: string;
    address: string;
    latitude: number;
    longitude: number;
    scheduledDate: string;
    scheduledTime: string;
    notes?: string;
  }) => Promise<Booking>;
  cancelBooking: (id: string) => Promise<void>;
  rateBooking: (id: string, score: number, review: string) => Promise<void>;
  updateBookingStatus: (bookingId: string, updates: Partial<Booking>) => void;
  setCurrentBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingState>((set, _get) => ({
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,

  fetchMyBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await bookingApi.getMyBookings();
      set({ bookings: data.data, isLoading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load bookings',
        isLoading: false,
      });
    }
  },

  fetchBooking: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await bookingApi.getById(id);
      set({ currentBooking: data.data, isLoading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load booking',
        isLoading: false,
      });
    }
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await bookingApi.create(bookingData);
      const newBooking = data.data;
      set((state) => ({
        bookings: [newBooking, ...state.bookings],
        currentBooking: newBooking,
        isLoading: false,
      }));
      return newBooking;
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create booking',
        isLoading: false,
      });
      throw error;
    }
  },

  cancelBooking: async (id) => {
    try {
      await bookingApi.cancel(id);
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, status: 'cancelled' as const } : b
        ),
        currentBooking:
          state.currentBooking?.id === id
            ? { ...state.currentBooking, status: 'cancelled' as const }
            : state.currentBooking,
      }));
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to cancel' });
      throw error;
    }
  },

  rateBooking: async (id, score, review) => {
    try {
      await bookingApi.rate(id, { score, review });
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, status: 'completed' as const } : b
        ),
      }));
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to submit rating' });
      throw error;
    }
  },

  updateBookingStatus: (bookingId, updates) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, ...updates } : b
      ),
      currentBooking:
        state.currentBooking?.id === bookingId
          ? { ...state.currentBooking, ...updates }
          : state.currentBooking,
    }));
  },

  setCurrentBooking: (booking) => set({ currentBooking: booking }),
}));
