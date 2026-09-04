'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  FileClock,
  FileCheck2,
  History,
  Search,
  Settings,
  User,
  Sun,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard Overview', href: '/', icon: LayoutDashboard },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Add Property', href: '/properties/add', icon: PlusCircle },
  { name: 'Saved Drafts', href: '/drafts', icon: FileClock },
  { name: 'PDF Generator', href: '/pdf-generator', icon: FileCheck2 },
  { name: 'PDF History', href: '/pdf-history', icon: History },
  { name: 'Search & Filters', href: '/search', icon: Search },
  { name: 'Company Settings', href: '/settings', icon: Settings },
  { name: 'User Profile', href: '/profile', icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F1E36] text-white flex flex-col h-screen fixed left-0 top-0 z-30 border-r border-[#1E293B]/50 shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-700/50 flex items-center gap-3 bg-[#0A1424]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-[#1B2A4A] rounded-[10px] flex items-center justify-center">
            <Sun className="w-6 h-6 text-[#D4AF37] animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1 font-serif">
            SUN <span className="text-[#D4AF37]">REALTORS</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">Property Management Admin</p>
        </div>
      </div>

      {/* Template badge */}
      <div className="px-4 py-3 bg-[#1B2A4A]/60 mx-3 my-3 rounded-lg border border-[#D4AF37]/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs text-slate-200 font-medium">A4 PDF Template</span>
        </div>
        <span className="text-[10px] bg-[#D4AF37] text-[#0F1E36] font-bold px-1.5 py-0.5 rounded">Exact Match</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] shadow-md font-bold'
                  : 'text-slate-300 hover:bg-[#1B2A4A] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-[#0F1E36]' : 'text-[#D4AF37] group-hover:scale-110'}`} />
                <span>{item.name}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 opacity-0 transition-opacity ${isActive ? 'opacity-100 text-[#0F1E36]' : 'group-hover:opacity-70'}`} />
            </Link>
          );
        })}
      </nav>

      {/* User profile footer item */}
      <div className="p-4 border-t border-slate-700/50 bg-[#0A1424] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#0F1E36] font-bold flex items-center justify-center text-sm shadow">
          KS
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-bold text-white truncate">K. Sunder Raman</p>
          <p className="text-[10px] text-slate-400 truncate">Managing Director</p>
        </div>
      </div>
    </aside>
  );
};
