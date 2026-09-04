'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getPDFHistory, getStoredCompanySettings } from '@/lib/storage';
import { PDFHistoryRecord } from '@/lib/types';
import { History, Download, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export default function PDFHistoryPage() {
  const [history, setHistory] = useState<PDFHistoryRecord[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setHistory(getPDFHistory());
  }, []);

  const handleRedownload = async (record: PDFHistoryRecord) => {
    setIsGenerating(true);
    try {
      const companySettings = getStoredCompanySettings();
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: record.dataSnapshot,
          companySettings,
          download: true,
        }),
      });

      if (!response.ok) throw new Error('Download error');
      const blob = await response.blob();
      const filename = `${record.propertyRefNo.replace(/[^a-zA-Z0-9-]/g, '_')}_v${record.version}_Sheet.pdf`;

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('History download failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <Header title="PDF Generation History" subtitle="Audit log of all generated PDF specification sheets with versioning" />

      <div className="p-8 md:p-10 lg:p-12 space-y-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                <History className="w-5 h-5 text-[#C8880A]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0F172A]">Generated PDF Audit Trail ({history.length})</h3>
                <p className="text-xs font-medium text-slate-500">Historical exports archived with exact data snapshots</p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <FileText className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-2" />
              <p className="text-sm font-extrabold text-slate-700">No PDF history recorded yet.</p>
              <p className="text-xs text-slate-400">Generate or Download a PDF from the Live PDF Studio to begin tracking history.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#090E22] text-white uppercase text-[10px] font-black tracking-wider">
                  <tr>
                    <th className="p-5 md:p-6">Property Ref No</th>
                    <th className="p-5 md:p-6">Property Name</th>
                    <th className="p-5 md:p-6">Version</th>
                    <th className="p-5 md:p-6">Generated Date & Time</th>
                    <th className="p-5 md:p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 md:p-6 font-black text-sm text-[#0F172A] whitespace-nowrap">{record.propertyRefNo}</td>
                      <td className="p-5 md:p-6 font-extrabold text-slate-800">{record.propertyName}</td>
                      <td className="p-5 md:p-6 whitespace-nowrap">
                        <span className="px-3 py-1 text-[10px] font-black bg-amber-50 text-[#C8880A] rounded-md border border-amber-200/60">
                          v{record.version}.0
                        </span>
                      </td>
                      <td className="p-5 md:p-6 text-slate-500 font-medium whitespace-nowrap">{new Date(record.generatedAt).toLocaleString()}</td>
                      <td className="p-5 md:p-6 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => handleRedownload(record)}
                          disabled={isGenerating}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-gold text-xs font-black transition shadow-xs"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Snapshot</span>
                        </button>

                        <Link
                          href={`/properties/${record.propertyId}/pdf`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-navy text-xs font-extrabold shadow-xs"
                        >
                          <RefreshCw className="w-4 h-4 text-[#F0A500]" />
                          <span>Regenerate</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
