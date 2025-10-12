import { HeroProviders } from "./providers";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "CRM - NextJS",
  description: "Product of ATT273",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="light">
      <body className={clsx("min-h-screen text-foreground bg-background font-sans antialiased", fontSans.variable)}>
        <HeroProviders
          themeProps={{
            themes: ["light", "dark"],
            defaultTheme: "light",
            attribute: "class",
            enableSystem: false,
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </HeroProviders>
      </body>
    </html>
  );
}
