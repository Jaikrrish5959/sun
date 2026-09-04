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
    <div>
      <Header title="PDF Generation History" subtitle="Audit log of all generated PDF specification sheets with versioning" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm font-bold text-[#1B2A4A]">Generated PDF Audit Trail ({history.length})</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">All historical exports archived with snapshot data</span>
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <FileText className="w-10 h-10 mx-auto stroke-1 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No PDF history recorded yet.</p>
              <p className="text-[11px] text-slate-400">Generate or Download a PDF from the Live PDF Studio to begin tracking history.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#0F1E36] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Property Ref No</th>
                    <th className="p-4">Property Name</th>
                    <th className="p-4">Version</th>
                    <th className="p-4">Generated Date & Time</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-[#1B2A4A] whitespace-nowrap">{record.propertyRefNo}</td>
                      <td className="p-4 font-semibold text-slate-800">{record.propertyName}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#D4AF37]/20 text-[#1B2A4A] rounded border border-[#D4AF37]/40">
                          v{record.version}.0
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 whitespace-nowrap">{new Date(record.generatedAt).toLocaleString()}</td>
                      <td className="p-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => handleRedownload(record)}
                          disabled={isGenerating}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-[11px] font-extrabold hover:brightness-105 transition shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Snapshot</span>
                        </button>

                        <Link
                          href={`/properties/${record.propertyId}/pdf`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#1B2A4A] text-white text-[11px] font-semibold hover:bg-[#0F1E36] transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
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
