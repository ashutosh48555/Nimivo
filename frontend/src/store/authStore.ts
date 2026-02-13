import { create } from 'zustand';
import type { User } from '@/types';
import { authApi } from '@/lib/api';
import { connectSocket, disconnectSocket } from '@/lib/socket';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('fastpays_token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('fastpays_token'),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.login(email, password);
      const { token, user } = data.data;
      localStorage.setItem('fastpays_token', token);
      localStorage.setItem('fastpays_user', JSON.stringify(user));
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (formData) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.register(formData);
      const { token, user } = data.data;
      localStorage.setItem('fastpays_token', token);
      localStorage.setItem('fastpays_user', JSON.stringify(user));
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('fastpays_token');
    localStorage.removeItem('fastpays_user');
    disconnectSocket();
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = get().token;
    if (!token) return;
    set({ isLoading: true });
    try {
      const { data } = await authApi.me();
      connectSocket(token);
      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      get().logout();
      set({ isLoading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
