'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, FileText, Bell } from 'lucide-react';
import { CommandPalette } from '@/components/ui/CommandPalette';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-20 flex items-center justify-between gap-4 px-8 py-4"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        {/* Left: Title + subtitle */}
        <div className="min-w-0">
          <h1 style={{ fontSize:18, fontWeight:900, color:'#0F172A', lineHeight:1.2 }} className="truncate">
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize:11, color:'#64748B', marginTop:2, fontWeight:500 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Search pill */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 rounded-xl text-xs"
            style={{
              padding:'8px 14px',
              background:'#F8FAFC',
              border:'1px solid #E2E8F0',
              color:'#94A3B8',
              fontWeight:500,
              cursor:'pointer',
              whiteSpace:'nowrap',
            }}
          >
            <Search size={13}/>
            <span>Search properties...</span>
            <kbd style={{
              fontSize:10, padding:'1px 5px', borderRadius:5,
              background:'#fff', border:'1px solid #E2E8F0',
              color:'#94A3B8', fontFamily:'monospace', fontWeight:700, marginLeft:4,
            }}>⌘K</kbd>
          </button>

          {/* Add Property */}
          <Link
            href="/properties/add"
            className="btn-navy flex items-center gap-1.5 rounded-xl text-xs"
            style={{ padding:'8px 14px', textDecoration:'none', fontSize:12 }}
          >
            <Plus size={13} style={{ color:'#F0A500' }}/>
            Add Property
          </Link>

          {/* PDF Studio */}
          <Link
            href="/pdf-generator"
            className="flex items-center gap-1.5 rounded-xl text-xs"
            style={{
              padding:'8px 14px',
              background:'#FFF8E6',
              border:'1px solid rgba(240,165,0,0.35)',
              color:'#92400E',
              fontWeight:700,
              textDecoration:'none',
              fontSize:12,
            }}
          >
            <FileText size={13} style={{ color:'#F0A500' }}/>
            PDF Studio
          </Link>

          {/* Bell */}
          <button
            style={{
              position:'relative', padding:8, borderRadius:10,
              background:'#F8FAFC', border:'1px solid #E2E8F0',
              cursor:'pointer', color:'#64748B',
            }}
          >
            <Bell size={15}/>
            <span className="pulse-dot" style={{
              position:'absolute', top:6, right:6,
              width:7, height:7, borderRadius:'50%',
              background:'#F0A500', display:'block',
            }}/>
          </button>
        </div>
      </header>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)}/>
    </>
  );
};
