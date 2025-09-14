import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { Auth, initialAuth } from '../models/Auth';

interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  clearAuth: () => void;
  login: (data: Omit<Auth, 'isAuthenticated'>) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      auth: initialAuth,
      setAuth: (auth) => set({ auth }),
      clearAuth: () => set({ auth: initialAuth }),
      login: (data: Omit<Auth, 'isAuthenticated'>) => set({ auth: { ...data, isAuthenticated: true } }),
      logout: () => get().clearAuth(),
      isAdmin: () => get().auth.role === 'ADMIN',
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        auth: state.auth,
      }),
    }
  )
);
