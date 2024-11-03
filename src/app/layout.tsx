import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./font";
import { Toaster } from "sonner";
import Providers from "./providers";
import NavBar from "@/components/navbar/navBar";
import ModalReceiveInfos from "@/components/auth/ModalReceiveInfos";
import React from "react";

export const metadata: Metadata = {
  title: "My Setup : Find Setup Inspiration & Gear | Find Your Dream Workspace",
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
      <body>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
          <ModalReceiveInfos />
        </Providers>
        <div className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-xl rounded-lg shadow-lg p-3 text-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-2">
            BETA
          </span>
          <p className="text-sm text-white">
            Found an issue?{" "}
            <a
              href="https://discord.gg/dzWzNBKUf3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-400 font-medium transition-colors"
            >
              Share feedback
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
