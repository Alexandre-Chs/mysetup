import type { Metadata } from "next";
import "./globals.css";
import { lato, montserrat } from "./font";
import { Toaster } from "sonner";
import Providers from "./providers";
import NavBar from "@/components/navbar/navBar";
import { validateRequest } from "@/lib/auth/validate-request";
import UserInfosModal from "@/components/modal/UserInfosModal";

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
  if (!user) return;

  const showModal = !user?.username || !user?.email;

  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
          {showModal && (
            <UserInfosModal
              infos={{
                id: user.id,
                username: user.username,
                email: user.email,
              }}
            />
          )}
        </Providers>
      </body>
    </html>
  );
}
