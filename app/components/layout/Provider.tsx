"use client";

import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={{ duration: 3000 }} />
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
