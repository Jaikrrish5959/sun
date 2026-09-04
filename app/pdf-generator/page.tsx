'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { PDFStudio } from '@/components/pdf/PDFStudio';
import { getStoredProperties } from '@/lib/storage';
import { Property } from '@/lib/types';
import { FileCheck2, Building2, ChevronRight, Plus } from 'lucide-react';

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
    <div>
      <Header
        title="PDF Generator Studio"
        subtitle="Live A4 PDF Specification Sheet generation engine controlled entirely from the dashboard"
      />

      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        {/* Selector Header Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            <Building2 className="w-5 h-5 text-[#1B2A4A]" />
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Select Active Property for PDF Generation
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs font-bold text-[#1B2A4A] border rounded-lg border-slate-300 bg-slate-50 focus:ring-2 focus:ring-[#1B2A4A]"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.identification.refNo} — {p.identification.propertyName} ({p.identification.propertyType})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/properties/add"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1B2A4A] text-white text-xs font-bold hover:bg-[#0F1E36] transition shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Create New Property</span>
            </Link>
          </div>
        </div>

        {selectedProperty ? (
          <PDFStudio property={selectedProperty} />
        ) : (
          <div className="bg-white p-12 rounded-xl text-center border border-slate-200 space-y-4">
            <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
            <h3 className="text-base font-bold text-slate-700">No Properties Found in System</h3>
            <p className="text-xs text-slate-500">Add a land property to launch the Live PDF Studio.</p>
            <Link
              href="/properties/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B2A4A] text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Property Now</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
