'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, FileText, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard Overview',
  subtitle = 'Manage land properties and generate exact PDF specification sheets',
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b px-8 py-3.5 flex items-center justify-between shadow-sm"
            style={{ borderColor: '#E2E8F0' }}>
      <div>
        <h1 className="text-lg font-extrabold tracking-tight" style={{ color: '#1A2455' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <Link
          href="/search"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition"
          style={{ backgroundColor: '#F4F6FA', border: '1px solid #E2E8F0', color: '#64748B' }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
          <span>Quick search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded ml-1"
               style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
            ⌘K
          </kbd>
        </Link>

        {/* Add Property */}
        <Link
          href="/properties/add"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition btn-navy"
        >
          <Plus className="w-4 h-4" style={{ color: '#F0A500' }} />
          <span>Add Property</span>
        </Link>

        {/* PDF Studio */}
        <Link
          href="/pdf-generator"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition"
          style={{
            backgroundColor: '#FFF8E6',
            border: '1.5px solid rgba(240,165,0,0.4)',
            color: '#1A2455',
          }}
        >
          <FileText className="w-4 h-4" style={{ color: '#F0A500' }} />
          <span>Live PDF Studio</span>
        </Link>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl transition"
                style={{ color: '#94A3B8' }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#F0A500' }} />
        </button>
      </div>
    </header>
  );
};
