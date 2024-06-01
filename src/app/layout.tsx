import type { Metadata } from "next";
import "./globals.css";
import { lato, montserrat } from "./font";
import { Toaster } from "sonner";
import NavBar from "@/components/navbar/NavBar";
import { validateRequest } from "@/lib/auth/validate-request";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "My setup",
  description: "Homepage of my setup",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
