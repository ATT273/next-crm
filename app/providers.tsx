"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import AppProvider from "./(app)/_components/app-provider";

export function HeroProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AppProvider>
        <ToastProvider placement="top-center" />
        {children}
      </AppProvider>
    </HeroUIProvider>
  );
}
