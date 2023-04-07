//@ts-nocheck

import { User as PrismaUser } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export type User =
  | (Omit<
      PrismaUser,
      "hashed_password" | "created_at" | "updated_at" | "emailVerified"
    > & {
      created_at: string;
      updated_at: string;
      emailVerified?: string;
    })
  | null;

interface AuthState {
  isOpenRegisterModal: boolean;
  isOpenLoginModal: boolean;
  user: User;
}

type AuthActions = {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  getMe: (user: User) => void;
};

type AuthStoreType = AuthActions & AuthState;

export const useAuthStore = create<AuthStoreType>(
  devtools<AuthStoreType>(
    immer<AuthStoreType>((set) => ({
      isOpenRegisterModal: false,
      openRegisterModal() {
        set(() => ({ isOpenRegisterModal: true }));
      },
      closeRegisterModal() {
        set(() => ({ isOpenRegisterModal: false }));
      },
      isOpenLoginModal: false,
      openLoginModal() {
        set(() => ({ isOpenLoginModal: true }));
      },
      closeLoginModal() {
        set(() => ({ isOpenLoginModal: false }));
      },
      getMe(user: User) {
        set((state) => {
          state.user = user;
        });
      },
      user: null,
    }))
  )
);
