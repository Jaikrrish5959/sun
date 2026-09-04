'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Building2, PlusCircle, FileClock,
  FileCheck2, History, Search, Settings, User,
  ChevronRight, LogOut, Phone, Globe, MapPin,
} from 'lucide-react';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { name: 'Dashboard Overview', href: '/', icon: LayoutDashboard },
      { name: 'Properties', href: '/properties', icon: Building2 },
      { name: 'Add Property', href: '/properties/add', icon: PlusCircle },
    ],
  },
  {
    label: 'PDF TOOLS',
    items: [
      { name: 'Saved Drafts', href: '/drafts', icon: FileClock },
      { name: 'PDF Generator', href: '/pdf-generator', icon: FileCheck2 },
      { name: 'PDF History', href: '/pdf-history', icon: History },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { name: 'Search & Filters', href: '/search', icon: Search },
      { name: 'Company Settings', href: '/settings', icon: Settings },
      { name: 'User Profile', href: '/profile', icon: User },
    ],
  },
];

// Inline SVG of the SUN REALTORS Logo
const SunRealtorsLogoSVG = () => (
  <svg viewBox="0 0 260 210" width="110" height="85" xmlns="http://www.w3.org/2000/svg">
    {/* Sun body */}
    <circle cx="108" cy="72" r="32" fill="#FFC641" />
    {/* Sun rays */}
    <g fill="#F0A500">
      <rect x="105" y="20" width="6" height="16" rx="3" />
      <rect x="105" y="114" width="6" height="14" rx="3" />
      <rect x="134" y="26" width="5" height="15" rx="2.5" transform="rotate(45 136 33)" />
      <rect x="72" y="24" width="5" height="15" rx="2.5" transform="rotate(-45 74 31)" />
      <rect x="152" y="69" width="16" height="6" rx="3" />
      <rect x="48" y="69" width="16" height="6" rx="3" />
      <rect x="140" y="103" width="5" height="15" rx="2.5" transform="rotate(-45 142 110)" />
      <rect x="64" y="98" width="5" height="15" rx="2.5" transform="rotate(45 66 105)" />
    </g>
    {/* House roofline */}
    <polyline
      points="42,115 108,55 182,115"
      fill="none"
      stroke="#1A2455"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Window */}
    <rect x="101" y="68" width="14" height="10" rx="2" fill="#F0A500" opacity="0.9" />
    {/* SUN Text */}
    <text x="16" y="163" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="900" fontSize="58" fill="#F0A500">SUN</text>
    {/* REALTORS */}
    <text x="16" y="197" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="28" fill="#1A2455" letterSpacing="5">REALTORS</text>
  </svg>
);

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
    <aside className="w-64 flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl sidebar-bg border-r"
           style={{ borderColor: 'rgba(240,165,0,0.15)' }}>

      {/* ─── Brand Header ─── */}
      <div className="flex flex-col items-center px-4 py-5 border-b"
           style={{ borderColor: 'rgba(240,165,0,0.2)', background: 'rgba(0,0,0,0.25)' }}>
        <SunRealtorsLogoSVG />
        <div className="mt-1 text-center">
          <p className="text-[10px] font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
            PROPERTY MANAGEMENT SYSTEM
          </p>
        </div>
      </div>

      {/* ─── Live Status Badge ─── */}
      <div className="mx-3 my-2.5 px-3 py-2 rounded-lg border flex items-center justify-between"
           style={{ backgroundColor: 'rgba(240,165,0,0.08)', borderColor: 'rgba(240,165,0,0.25)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#4ADE80' }} />
          <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>PDF Engine Active</span>
        </div>
        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F0A500', color: '#111A3E' }}>
          A4 MATCH
        </span>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto custom-scrollbar space-y-3">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[9px] font-extrabold tracking-widest px-2 mb-1.5"
               style={{ color: 'rgba(240,165,0,0.5)' }}>
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
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                      isActive ? 'nav-active' : ''
                    }`}
                    style={
                      !isActive
                        ? { color: 'rgba(255,255,255,0.7)' }
                        : { color: '#111A3E' }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(240,165,0,0.12)';
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.95)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-4 h-4 flex-shrink-0"
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

      {/* ─── Contact Footer ─── */}
      <div className="px-3 py-2 border-t space-y-1" style={{ borderColor: 'rgba(240,165,0,0.15)' }}>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
          <span>+91 98941 05333</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
          <span>www.sunrealtorsindia.com</span>
        </div>
      </div>

      {/* ─── Admin Footer ─── */}
      <div className="p-3 border-t flex items-center justify-between gap-2"
           style={{ borderColor: 'rgba(240,165,0,0.15)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-extrabold shadow-md"
               style={{ background: 'linear-gradient(135deg, #F0A500, #C8880A)', color: '#111A3E' }}>
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{adminName}</p>
            <p className="text-[10px] truncate" style={{ color: 'rgba(240,165,0,0.7)' }}>{adminRole}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex-shrink-0 p-1.5 rounded-lg transition"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#F87171')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)')}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
