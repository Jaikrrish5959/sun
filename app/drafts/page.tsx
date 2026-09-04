'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getStoredProperties, deleteProperty } from '@/lib/storage';
import { Property } from '@/lib/types';
import { FileClock, Edit, Trash2, ArrowRight, Plus } from 'lucide-react';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Property[]>([]);

  const loadDrafts = () => {
    const properties = getStoredProperties();
    setDrafts(properties.filter((p) => p.status === 'Draft'));
  };

  useEffect(() => {
    loadDrafts();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this draft property?')) {
      deleteProperty(id);
      loadDrafts();
    }
  };

  return (
    <div className="animate-fade-in">
      <Header title="Saved Drafts" subtitle="Incomplete property forms saved for later edit & PDF generation" />

      <div className="p-8 md:p-10 lg:p-12 space-y-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                <FileClock className="w-5 h-5 text-[#C8880A]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0F172A]">Saved Draft Properties ({drafts.length})</h3>
                <p className="text-xs font-medium text-slate-500">Resume incomplete property forms anytime</p>
              </div>
            </div>
            <Link
              href="/properties/add"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-navy text-xs font-extrabold shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#F0A500]" />
              <span>Create New Draft</span>
            </Link>
          </div>

          {drafts.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <FileClock className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-2" />
              <p className="text-sm font-extrabold text-slate-700">No saved drafts currently in system.</p>
              <p className="text-xs text-slate-400">Forms saved via "Save Draft" will appear here automatically.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {drafts.map((draft) => (
                <div key={draft.id} className="px-8 py-5 hover:bg-slate-50/80 flex items-center justify-between transition">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black" style={{ color: '#0F172A' }}>{draft.identification.refNo}</span>
                      <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-50 text-[#B45309] border border-amber-200/60 rounded-full">Draft</span>
                      <span className="text-xs text-slate-400 font-medium">Last updated: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-800">
                      {draft.identification.propertyName || 'Untitled Property Draft'}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Type: <span className="font-semibold text-slate-700">{draft.identification.propertyType}</span> | Location: <span className="font-semibold text-slate-700">{draft.identification.location || 'Unspecified'}</span> | Extent:{' '}
                      <span className="font-semibold text-slate-700">{draft.siteDetails.totalExtent || 'Unspecified'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/properties/${draft.id}/edit`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-navy text-xs font-extrabold shadow-xs"
                    >
                      <Edit className="w-4 h-4 text-[#F0A500]" />
                      <span>Resume Editing</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(draft.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
                      title="Delete Draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
