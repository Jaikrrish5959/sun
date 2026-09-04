'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getStoredProperties, getPDFHistory, duplicateProperty, deleteProperty } from '@/lib/storage';
import { Property, PDFHistoryRecord } from '@/lib/types';
import {
  Building2,
  FileCheck2,
  FileClock,
  CheckCircle,
  Plus,
  ArrowRight,
  Download,
  Copy,
  Trash2,
  Edit,
  FileText,
  Search,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [history, setHistory] = useState<PDFHistoryRecord[]>([]);

  const loadData = () => {
    setProperties(getStoredProperties());
    setHistory(getPDFHistory());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDuplicate = (id: string) => {
    duplicateProperty(id);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      deleteProperty(id);
      loadData();
    }
  };

  const activeProperties = properties.filter((p) => p.status === 'Active');
  const draftProperties = properties.filter((p) => p.status === 'Draft');

  return (
    <div>
      <Header title="Dashboard Overview" subtitle="Real-time SUN REALTORS property statistics and PDF generation hub" />

      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0F1E36] via-[#1B2A4A] to-[#2D3E5F] rounded-2xl p-6 text-white shadow-lg border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded bg-[#D4AF37] text-[#0F1E36] text-[10px] font-extrabold uppercase tracking-wider">
              Exact PDF Reproduction Engine Active
            </span>
            <h2 className="text-xl font-extrabold text-white">SUN REALTORS Property Studio</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Create land listings and instantly output pixel-perfect, authoritative 2-page A4 Land Property Specification Sheets matching your template 1.pdf reference.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/properties/add"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-xs font-extrabold hover:brightness-110 transition shadow-md whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </Link>
            <Link
              href="/pdf-generator"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>Live PDF Studio</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Properties</p>
              <h3 className="text-2xl font-extrabold text-[#1B2A4A] mt-1">{properties.length}</h3>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> All managed listings
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 flex items-center justify-center text-[#1B2A4A]">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Active Listings</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{activeProperties.length}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Ready for PDF export</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">PDFs Generated</p>
              <h3 className="text-2xl font-extrabold text-[#D4AF37] mt-1">{history.length}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Recorded export history</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FAF5E8] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <FileCheck2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Saved Drafts</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{draftProperties.length}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Incomplete forms</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <FileClock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Properties Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1B2A4A]">Recent Property Listings</h3>
              <p className="text-xs text-slate-500">Managed land entries ready for preview and PDF download</p>
            </div>
            <Link
              href="/properties"
              className="text-xs font-bold text-[#1B2A4A] hover:text-[#D4AF37] flex items-center gap-1 transition"
            >
              <span>View All Properties ({properties.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <Building2 className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-xs font-medium">No properties found.</p>
              <Link
                href="/properties/add"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Add First Property</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {properties.slice(0, 5).map((prop) => (
                <div key={prop.id} className="p-4 hover:bg-slate-50 flex items-center justify-between transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 font-bold text-[#1B2A4A] flex items-center justify-center text-xs">
                      {prop.identification.propertyType.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B2A4A]">{prop.identification.refNo}</span>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                            prop.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prop.status === 'Draft'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {prop.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">v{prop.version}.0</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800">{prop.identification.propertyName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {prop.identification.location} | {prop.siteDetails.totalExtent || 'N/A'} | Facing: {prop.siteDetails.facing}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/properties/${prop.id}/pdf`}
                      className="px-3 py-1.5 rounded-md bg-[#FAF5E8] border border-[#D4AF37]/50 text-[#1B2A4A] text-xs font-bold hover:bg-[#F3E8C9] transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>PDF Studio</span>
                    </Link>

                    <Link
                      href={`/properties/${prop.id}/edit`}
                      className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDuplicate(prop.id)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 rounded hover:bg-slate-100"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 rounded hover:bg-slate-100"
                      title="Delete"
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
