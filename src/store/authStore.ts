import { create } from 'zustand';
import { AuthState, User } from '../types';

const STORAGE_KEY = 'habitHero_auth';

const getStoredAuth = (): { user: User | null } => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { user: null };
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredAuth().user,
  isAuthenticated: !!getStoredAuth().user,

  login: (email: string, password: string) => {
    const user: User = {
      id: 'user-1',
      email,
      username: email.split('@')[0],
      coins: 0,
      redeemedRewards: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
    set({ user, isAuthenticated: true });
  },

  register: (email: string, password: string, username: string) => {
    const user: User = {
      id: 'user-' + Date.now(),
      email,
      username,
      coins: 0,
      redeemedRewards: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (profileData) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = {
        ...state.user,
        ...profileData,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updatedUser }));
      return { ...state, user: updatedUser };
    });
  }
}));