"use client";
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import {  persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import UserProvider from "@/context/user.provider";


function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <UserProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}> {children}</Provider>
        </PersistGate>
        </UserProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default Providers;
