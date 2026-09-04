'use client';

import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/layout/AuthGuard';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen" style={{ backgroundColor: '#F4F6FA' }}>
        <AuthGuard>
          {isLoginPage ? (
            <main className="min-h-screen">{children}</main>
          ) : (
            <div className="flex">
              <Sidebar />
              <main className="flex-1 ml-64 min-h-screen pb-16">{children}</main>
            </div>
          )}
        </AuthGuard>
      </body>
    </html>
  );
}
