import Footer from "@/components/footer/Footer";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-screen">{children}</div>
      <Footer />
    </div>
  );
}
