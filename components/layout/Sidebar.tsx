'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SunLogo } from '@/components/common/SunLogo';
import {
  LayoutDashboard, Building2, PlusCircle, FileClock,
  FileCheck2, History, Search, Settings, User,
  ChevronRight, LogOut, Phone, Globe, ShieldCheck,
} from 'lucide-react';

const navSections = [
  {
    label: 'MAIN MENU',
    items: [
      { name: 'Dashboard Overview', href: '/', icon: LayoutDashboard },
      { name: 'Properties List', href: '/properties', icon: Building2 },
      { name: 'Add Property', href: '/properties/add', icon: PlusCircle },
    ],
  },
  {
    label: 'PDF WORKFLOW',
    items: [
      { name: 'Saved Drafts', href: '/drafts', icon: FileClock },
      { name: 'Live PDF Studio', href: '/pdf-generator', icon: FileCheck2 },
      { name: 'PDF Audit History', href: '/pdf-history', icon: History },
    ],
  },
  {
    label: 'ADMINISTRATION',
    items: [
      { name: 'Search & Filters', href: '/search', icon: Search },
      { name: 'Company Settings', href: '/settings', icon: Settings },
      { name: 'User Profile', href: '/profile', icon: User },
    ],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState('Suresh Kumar P G');
  const [adminRole, setAdminRole] = useState('Managing Director');

  useEffect(() => {
    try {
      const auth = localStorage.getItem('sun_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed?.name) setAdminName(parsed.name);
        if (parsed?.role) setAdminRole(parsed.role);
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sun_auth');
    router.push('/login');
  };

  const initials = adminName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className="w-64 flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl sidebar-bg border-r"
      style={{ borderColor: 'rgba(240,165,0,0.15)' }}
    >
      {/* ─── Brand Logo Section ─── */}
      <div
        className="flex flex-col items-center pt-5 pb-4 px-4 border-b"
        style={{ borderColor: 'rgba(240,165,0,0.2)', background: 'rgba(0,0,0,0.25)' }}
      >
        <Link href="/" className="hover:scale-105 transition-transform duration-200">
          <SunLogo variant="dark" size="sm" />
        </Link>
      </div>

      {/* ─── Status Indicator ─── */}
      <div
        className="mx-3 my-3 px-3 py-2 rounded-xl border flex items-center justify-between"
        style={{ backgroundColor: 'rgba(240,165,0,0.08)', borderColor: 'rgba(240,165,0,0.25)' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full pulse-dot bg-emerald-400 shadow-xs" />
          <span className="text-xs font-bold text-white/90">PDF Engine Active</span>
        </div>
        <span
          className="text-[9px] font-extrabold px-2 py-0.5 rounded-md"
          style={{ backgroundColor: '#F0A500', color: '#111A3E' }}
        >
          2-PAGE A4
        </span>
      </div>

      {/* ─── Navigation Links ─── */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto custom-scrollbar space-y-3">
        {navSections.map((section) => (
          <div key={section.label}>
            <p
              className="text-[9px] font-extrabold tracking-widest px-2.5 mb-1.5"
              style={{ color: 'rgba(240,165,0,0.6)' }}
            >
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                      isActive ? 'nav-active' : ''
                    }`}
                    style={
                      !isActive
                        ? { color: 'rgba(255,255,255,0.75)' }
                        : { color: '#111A3E' }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                          'rgba(240,165,0,0.12)';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          'rgba(255,255,255,0.75)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: isActive ? '#111A3E' : '#F0A500' }}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#111A3E' }} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ─── Contact Bar ─── */}
      <div className="px-3.5 py-2 border-t space-y-1" style={{ borderColor: 'rgba(240,165,0,0.15)' }}>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
          <span>+91 98941 05333</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
          <span>www.sunrealtorsindia.com</span>
        </div>
      </div>

      {/* ─── Admin Profile Footer ─── */}
      <div
        className="p-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: 'rgba(240,165,0,0.15)', background: 'rgba(0,0,0,0.35)' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-extrabold shadow-md border"
            style={{
              background: 'linear-gradient(135deg, #F0A500 0%, #C8880A 100%)',
              color: '#111A3E',
              borderColor: 'rgba(255,255,255,0.3)',
            }}
          >
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{adminName}</p>
            <p className="text-[10px] font-semibold truncate" style={{ color: 'rgba(240,165,0,0.85)' }}>
              {adminRole}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Sign Out"
          className="flex-shrink-0 p-2 rounded-xl transition hover:bg-red-500/20 text-white/40 hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
