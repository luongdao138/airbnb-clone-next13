import { create } from "zustand";

interface AuthState {
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isOpenAuthModal: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isOpenAuthModal: false,
  openAuthModal() {
    set(() => ({ isOpenAuthModal: true }));
  },
  closeAuthModal() {
    set(() => ({ isOpenAuthModal: false }));
  },
}));
