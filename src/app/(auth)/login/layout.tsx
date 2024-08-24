import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My setup",
  description: "Homepage of my setup",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-backgroundPrimary h-screen">{children}</div>;
}
