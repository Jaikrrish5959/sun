'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Building2,
  FileText,
  Plus,
  Settings,
  User,
  History,
  FileClock,
  ArrowRight,
  Sparkles,
  Command,
  X,
  ChevronRight,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { getStoredProperties } from '@/lib/storage';
import { Property } from '@/lib/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = Router();
  const [query, setQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function Router() {
    return useRouter();
  }

  useEffect(() => {
    if (isOpen) {
      setProperties(getStoredProperties());
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setProperties(getStoredProperties());
          setQuery('');
          setSelectedIndex(0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProperties = properties.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.identification.refNo.toLowerCase().includes(q) ||
      p.identification.propertyName.toLowerCase().includes(q) ||
      p.identification.location.toLowerCase().includes(q) ||
      (p.ownership?.currentOwner || '').toLowerCase().includes(q) ||
      p.identification.propertyType.toLowerCase().includes(q)
    );
  });

  const navigationActions = [
    { id: 'nav-dash', title: 'Go to Dashboard Overview', path: '/', icon: Building2, category: 'Navigation' },
    { id: 'nav-props', title: 'View All Properties Directory', path: '/properties', icon: SlidersHorizontal, category: 'Navigation' },
    { id: 'nav-add', title: 'Add New Property Listing', path: '/properties/add', icon: Plus, category: 'Action' },
    { id: 'nav-pdf', title: 'Open Live PDF Studio', path: '/pdf-generator', icon: FileText, category: 'Action' },
    { id: 'nav-drafts', title: 'View Saved Incomplete Drafts', path: '/drafts', icon: FileClock, category: 'Navigation' },
    { id: 'nav-[#090E22]', title: 'View PDF Generation History', path: '/pdf-history', icon: History, category: 'Navigation' },
    { id: 'nav-search', title: 'Open Advanced Filter Engine', path: '/search', icon: Search, category: 'Navigation' },
    { id: 'nav-settings', title: 'Manage Company Branding & PDF Settings', path: '/settings', icon: Settings, category: 'Settings' },
    { id: 'nav-profile', title: 'View Admin Credentials & Profile', path: '/profile', icon: User, category: 'Settings' },
  ];

  const filteredActions = navigationActions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const combinedItems = [
    ...filteredProperties.map(p => ({
      type: 'property' as const,
      id: p.id,
      title: p.identification.propertyName || p.identification.refNo,
      subtitle: `${p.identification.refNo} • ${p.identification.location || 'Location unspecified'} • ${p.siteDetails.totalExtent || ''}`,
      status: p.status,
      prop: p,
    })),
    ...filteredActions.map(a => ({
      type: 'action' as const,
      id: a.id,
      title: a.title,
      subtitle: a.category,
      path: a.path,
      icon: a.icon,
    })),
  ];

  const handleSelect = (item: typeof combinedItems[number]) => {
    onClose();
    if (item.type === 'property') {
      router.push(`/properties/${item.id}/pdf`);
    } else if (item.type === 'action' && item.path) {
      router.push(item.path);
    }
  };

  const handleKeyDownModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, combinedItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedItems.length) % Math.max(1, combinedItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (combinedItems[selectedIndex]) {
        handleSelect(combinedItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-[#090E22] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownModal}
      >
        {/* Top Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800/80 bg-[#0F1738]/80">
          <Search className="w-5 h-5 text-[#FFC641] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search properties, reference numbers, or jump to page... (Press ↑ ↓ Enter)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 custom-scrollbar divide-y divide-slate-800/40">
          {combinedItems.length === 0 ? (
            <div className="p-10 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-[#FFC641]/50 mb-1" />
              <p className="text-xs font-bold text-slate-300">No matching items or properties found.</p>
              <p className="text-[11px] text-slate-500">Try searching for a survey number, district, ref no or page name.</p>
            </div>
          ) : (
            combinedItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              if (item.type === 'property') {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                      isSelected ? 'bg-[#1E2D6B] border border-amber-500/40 shadow-sm' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-[#FFC641]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#FFC641]">{item.prop.identification.refNo}</span>
                          <span className="text-xs font-bold text-white">{item.title}</span>
                          <span className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${
                            item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#FFC641] font-bold">
                      <span>PDF Studio</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              } else {
                const Icon = item.icon!;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                      isSelected ? 'bg-[#1E2D6B] border border-amber-500/40 shadow-sm' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300">
                        <Icon className="w-4 h-4 text-[#FFC641]" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <span>Jump</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>

        {/* Footer Command Hints */}
        <div className="px-6 py-3 bg-[#060917] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">ESC</kbd>
              Close
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#FFC641]">
            <Command className="w-3.5 h-3.5" />
            <span className="font-bold">SUN Enterprise SaaS Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
};
