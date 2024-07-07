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
  return <div className="bg-gray-100 h-screen">{children}</div>;
}
