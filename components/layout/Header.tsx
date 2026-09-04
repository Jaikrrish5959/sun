'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, FileText, Bell, Sparkles } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Dashboard Overview', subtitle = 'Manage land properties and generate exact PDF specification sheets' }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-2">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <Link
          href="/search"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-xs hover:bg-slate-200/70 transition"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Quick property search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded text-slate-400 border border-slate-300 shadow-2xs font-mono ml-2">⌘K</kbd>
        </Link>

        {/* Add Property Quick Action */}
        <Link
          href="/properties/add"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold hover:bg-[#0F1E36] transition shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Add Property</span>
        </Link>

        {/* PDF Generator Direct */}
        <Link
          href="/pdf-generator"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF5E8] border border-[#D4AF37]/40 text-[#1B2A4A] text-xs font-bold hover:bg-[#F3E8C9] transition shadow-2xs"
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Live PDF Studio</span>
        </Link>

        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
        </button>
      </div>
    </header>
  );
};
