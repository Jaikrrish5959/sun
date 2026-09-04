'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_ROUTES = ['/login'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    setIsPublic(isPublicRoute);

    if (!isPublicRoute) {
      try {
        const auth = localStorage.getItem('sun_auth');
        const parsed = auth ? JSON.parse(auth) : null;
        if (!parsed?.loggedIn) {
          router.replace('/login');
          return;
        }
      } catch {
        router.replace('/login');
        return;
      }
    }

    setChecked(true);
  }, [pathname, router]);

  if (!checked && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg, #111A3E, #1A2455)' }}>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F0A500" strokeWidth="3" className="opacity-30" />
            <path d="M4 12a8 8 0 018-8V0" stroke="#F0A500" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="text-xs font-bold" style={{ color: 'rgba(240,165,0,0.7)' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isPublic) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
