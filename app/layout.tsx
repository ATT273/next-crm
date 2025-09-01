import type { Metadata } from "next";
import "@/app/globals.css";
import { HeroProviders } from "./providers";

export const metadata: Metadata = {
  title: "CRM - NextJS",
  description: "Product of ATT273",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      {/* <head>
        <ColorSchemeScript />
      </head> */}
      <body className="antialiased">
        <HeroProviders>{children}</HeroProviders>
      </body>
    </html>
  );
}
