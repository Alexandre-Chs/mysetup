import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./font";
import { Toaster } from "sonner";
import Providers from "./providers";
import NavBar from "@/components/navbar/navBar";
import ModalReceiveInfos from "@/components/auth/ModalReceiveInfos";
import React from "react";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "My Setup - Find Setup Inspiration & Gear | Find Your Dream Workspace",
  description:
    "Browse stunning setups and discover the exact gear you need. From desk to gaming setups, find your inspiration in seconds.",
  keywords:
    "desk setup, workspace inspiration, gaming setup, office setup, setup ideas, workspace gear, desk accessories, setup gallery, mysetup, my setup, inspiration, workspace, desk, gear, office, gaming, work, productivity",
  openGraph: {
    title: "Setup Inspiration | Find & Shop Workspace Gear | MySetup",
    description:
      "Discover trendy desk setups and workspace inspiration from our community. Find exact gear links and create your dream setup easily.",
    type: "website",
    siteName: "MySetup",
    locale: "en_US",
  },
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
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script async src="https://analytics.mysetup.app/script.js" data-website-id="60b29f26-9d4c-4834-a865-02e28bd5b26c" />
        )}
      </head>
      <body>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
          <ModalReceiveInfos />
        </Providers>
      </body>
    </html>
  );
}
