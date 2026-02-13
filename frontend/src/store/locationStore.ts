import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  label: string;
  lat: number | null;
  lng: number | null;
  setLocation: (label: string, lat?: number | null, lng?: number | null) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      label: '',
      lat: null,
      lng: null,
      setLocation: (label, lat = null, lng = null) => set({ label, lat, lng }),
    }),
    { name: 'fp-location' }
  )
);
