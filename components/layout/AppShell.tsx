'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';

const PUBLIC_ROUTES = ['/login'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [ready, setReady] = useState(false);

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (isPublic) { setReady(true); return; }
    try {
      const auth = localStorage.getItem('sun_auth');
      const parsed = auth ? JSON.parse(auth) : null;
      if (!parsed?.loggedIn) { router.replace('/login'); return; }
    } catch {
      router.replace('/login'); return;
    }
    setReady(true);
  }, [pathname, router, isPublic]);

  if (isPublic) return <>{children}</>;

  if (!ready) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0A0F1E' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <svg className="animate-spin" width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#F0A500" strokeWidth="3" opacity="0.25"/>
          <path d="M4 12a8 8 0 018-8" stroke="#F0A500" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize:11, color:'rgba(240,165,0,0.5)', fontWeight:600 }}>Verifying access…</p>
      </div>
    </div>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar/>
      <main style={{ flex:1, marginLeft:260, minHeight:'100vh' }}>
        {children}
      </main>
    </div>
  );
}
