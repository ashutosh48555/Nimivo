import { create } from 'zustand';
import type { Service } from '@/types';
import { serviceApi } from '@/lib/api';

interface ServiceState {
  services: Service[];
  isLoading: boolean;
  error: string | null;

  fetchServices: () => Promise<void>;
  getServiceById: (id: string) => Service | undefined;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await serviceApi.getAll();
      set({ services: data.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to load services',
        isLoading: false,
      });
    }
  },

  getServiceById: (id) => get().services.find((s) => s.id === id),
}));
