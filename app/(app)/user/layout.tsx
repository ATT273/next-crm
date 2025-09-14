import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User | CRM",
  description: "Product of ATT273",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
