"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function HeroProviders({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}

// "use client";
// import { HeroUIProvider, ToastProvider } from "@heroui/react";
// import AppProvider from "./(app)/_components/app-provider";

// export default function HeroProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <HeroUIProvider>
//       <AppProvider>
//         <ToastProvider placement="top-center" />
//         {children}
//       </AppProvider>
//     </HeroUIProvider>
//   );
// }
