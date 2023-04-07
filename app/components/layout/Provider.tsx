"use client";

import { useAuthStore, User } from "@/app/zustand/authStore";
import { createContext, FC, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";

interface ProviderProps {
  user: User;
  children: React.ReactNode;
}

interface ContextState {
  user: User;
}

const GlobalContext = createContext<ContextState>({
  user: null,
});

const queryClient = new QueryClient();
const Provider: FC<ProviderProps> = ({ children, user }) => {
  const authStore = useAuthStore();

  useEffect(() => {
    authStore.getMe(user);
  }, [user, authStore]);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{ user }}>
        <Toaster toastOptions={{ duration: 3000 }} />
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
