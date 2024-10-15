"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import UserProvider from "@/context/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <UserProvider>
           {children}
        </UserProvider>
      </NextThemesProvider>
    </NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
