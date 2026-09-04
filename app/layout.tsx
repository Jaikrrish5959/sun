import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SUN REALTORS — Property Management Dashboard',
  description: 'Professional real estate property management and PDF specification sheet generation system for SUN REALTORS, Erode.',
  keywords: 'SUN REALTORS, Property Management, Real Estate, Erode, Tamil Nadu, Land Property',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen" style={{ backgroundColor: '#F4F6FA' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
