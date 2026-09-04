import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SUN REALTORS — Property Management Dashboard',
  description: 'Manage land properties and generate exact PDF property specification sheets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-800 antialiased min-h-screen`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen pb-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
