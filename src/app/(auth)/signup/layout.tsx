import { Footer } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My setup',
  description: 'Homepage of my setup',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="bg-backgroundPrimary">
      <div className="h-screen">{children}</div>
      <Footer />
    </div>
  );
}
