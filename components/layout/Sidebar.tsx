'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Building2, PlusCircle, FileClock,
  FileCheck2, History, Search, Settings, User, LogOut,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',       href: '/',              icon: LayoutDashboard },
  { label: 'Properties',      href: '/properties',    icon: Building2 },
  { label: 'Add Property',    href: '/properties/add',icon: PlusCircle },
  { label: 'Saved Drafts',    href: '/drafts',        icon: FileClock },
  { label: 'PDF Generator',   href: '/pdf-generator', icon: FileCheck2 },
  { label: 'PDF History',     href: '/pdf-history',   icon: History },
  { label: 'Search',          href: '/search',        icon: Search },
  { label: 'Settings',        href: '/settings',      icon: Settings },
  { label: 'Profile',         href: '/profile',       icon: User },
];

export const Sidebar = () => {
  const pathname  = usePathname();
  const router    = useRouter();
  const [name, setName] = useState('Suresh Kumar P G');
  const [role, setRole] = useState('Managing Director');

  useEffect(() => {
    try {
      const a = localStorage.getItem('sun_auth');
      if (a) { const p = JSON.parse(a); if (p.name) setName(p.name); if (p.role) setRole(p.role); }
    } catch {}
  }, []);

  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside
      style={{ width: 260, background: '#111827', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      className="fixed left-0 top-0 h-screen flex flex-col z-30"
    >
      {/* Brand */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="p-5 flex items-center gap-3">
        {/* Sun icon */}
        <div style={{ width:38, height:38, background:'rgba(240,165,0,0.1)', border:'1.5px solid rgba(240,165,0,0.35)', borderRadius:10 }}
          className="flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" fill="#F0A500"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
              stroke="#F0A500" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:900, letterSpacing:'0.06em', color:'#FFC641', lineHeight:1.2 }}>
            SUN REALTORS
          </div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', fontWeight:500, marginTop:2 }}>
            Property Management
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-3 space-y-0.5">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                active ? 'nav-item-active' : ''
              }`}
              style={active
                ? { color: '#fff', borderLeft: '3px solid #F0A500', paddingLeft: '11px', background: 'rgba(240,165,0,0.08)' }
                : { color: 'rgba(255,255,255,0.5)', borderLeft: '3px solid transparent', paddingLeft: '11px' }
              }
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
            >
              <Icon
                size={15}
                style={{ color: active ? '#F0A500' : 'rgba(255,255,255,0.35)', flexShrink: 0 }}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
        className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div style={{
            width:34, height:34, borderRadius:'50%',
            background: 'linear-gradient(135deg,#FFC641,#F0A500)',
            color: '#0F172A', fontSize:11, fontWeight:900,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>{initials}</div>
          <div className="min-w-0">
            <div style={{ fontSize:12, fontWeight:700, color:'#fff' }} className="truncate">{name}</div>
            <div style={{ fontSize:10, color:'rgba(240,165,0,0.6)', fontWeight:500 }} className="truncate">{role}</div>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem('sun_auth'); router.push('/login'); }}
          style={{ color:'rgba(255,255,255,0.3)', padding:6, borderRadius:8, background:'transparent', border:'none', cursor:'pointer' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F87171'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
          title="Sign out"
        >
          <LogOut size={15}/>
        </button>
      </div>
    </aside>
  );
};
