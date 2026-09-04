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
    <div>
      <Header title="Saved Drafts" subtitle="Incomplete property forms saved for later edit & PDF generation" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileClock className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-[#1B2A4A]">Saved Draft Properties ({drafts.length})</h3>
            </div>
            <Link
              href="/properties/add"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold hover:bg-[#0F1E36] transition"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Create New Draft</span>
            </Link>
          </div>

          {drafts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <FileClock className="w-10 h-10 mx-auto stroke-1 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No saved drafts currently in system.</p>
              <p className="text-[11px] text-slate-400">Forms saved via "Save Draft" will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {drafts.map((draft) => (
                <div key={draft.id} className="p-5 hover:bg-slate-50 flex items-center justify-between transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B2A4A]">{draft.identification.refNo}</span>
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-800 rounded">Draft</span>
                      <span className="text-[10px] text-slate-400">Last updated: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {draft.identification.propertyName || 'Untitled Property Draft'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Type: {draft.identification.propertyType} | Location: {draft.identification.location || 'Unspecified'} | Extent:{' '}
                      {draft.siteDetails.totalExtent || 'Unspecified'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/properties/${draft.id}/edit`}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold hover:bg-[#0F1E36] transition shadow-xs"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Resume Editing</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(draft.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition"
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
