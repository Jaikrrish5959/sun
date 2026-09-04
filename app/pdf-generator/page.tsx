'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { PDFStudio } from '@/components/pdf/PDFStudio';
import { getStoredProperties } from '@/lib/storage';
import { Property } from '@/lib/types';
import { FileCheck2, Building2, Plus, Sparkles } from 'lucide-react';

export default function GlobalPDFGeneratorPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  useEffect(() => {
    const list = getStoredProperties();
    setProperties(list);
    if (list.length > 0) {
      setSelectedPropertyId(list[0].id);
    }
  }, []);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  return (
    <div className="animate-fade-in pb-12">
      <Header
        title="PDF Generator Studio"
        subtitle="Live A4 PDF Specification Sheet generation engine controlled entirely from the dashboard"
      />

      <div className="p-8 md:p-10 lg:p-12 space-y-8 max-w-7xl mx-auto">
        {/* Top Active Property Selector Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-[320px]">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F0A500] flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Select Active Property for PDF Generation
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full px-4 py-3 text-xs font-black text-[#0F172A] border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] transition"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.identification.refNo} — {p.identification.propertyName} ({p.identification.propertyType})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/properties/add"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black btn-navy transition shadow-xs whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#F0A500]" />
              <span>Create New Property</span>
            </Link>
          </div>
        </div>

        {/* Main PDF Studio Workspace */}
        {selectedProperty ? (
          <PDFStudio property={selectedProperty} />
        ) : (
          <div className="bg-white p-16 rounded-3xl text-center border border-slate-200/80 shadow-xs space-y-4">
            <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
            <h3 className="text-base font-extrabold text-slate-800">No Properties Found in System</h3>
            <p className="text-xs text-slate-500 font-medium">Add a land property to launch the Live PDF Studio.</p>
            <Link
              href="/properties/add"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-navy text-xs font-extrabold"
            >
              <Plus className="w-4 h-4 text-[#F0A500]" />
              <span>Add Property Now</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
