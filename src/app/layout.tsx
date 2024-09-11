import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./font";
import { Toaster } from "sonner";
import Providers from "./providers";
import NavBar from "@/components/navbar/navBar";
import ModalReceiveInfos from "@/components/auth/ModalReceiveInfos";
import React from "react";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "My setup",
  description: "Homepage of my setup",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} bg-backgroundPrimary dark`}
    >
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
          <Toaster />
          <ModalReceiveInfos />
        </Providers>
      </body>
    </html>
  );
}
