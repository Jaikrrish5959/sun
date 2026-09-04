'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property, CompanySettings } from '@/lib/types';
import { getStoredCompanySettings, saveProperty, recordPDFGeneration } from '@/lib/storage';
import {
  Download,
  RefreshCw,
  Edit3,
  FileCheck,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

interface PDFStudioProps {
  property: Property;
  onPropertyUpdate?: (updated: Property) => void;
}

export const PDFStudio: React.FC<PDFStudioProps> = ({ property: initialProperty, onPropertyUpdate }) => {
  const [property, setProperty] = useState<Property>(initialProperty);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(getStoredCompanySettings());
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setProperty(initialProperty);
  }, [initialProperty]);

  useEffect(() => {
    setCompanySettings(getStoredCompanySettings());
  }, []);

  // Generate live PDF Blob for Iframe preview
  const generatePreviewBlob = async (propData: Property) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: propData,
          companySettings,
          download: false,
        }),
      });

      if (!response.ok) throw new Error('PDF Generation failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
    } catch (err) {
      console.error('Error rendering PDF preview blob:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generatePreviewBlob(property);
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [property]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      recordPDFGeneration(property);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property,
          companySettings,
          download: true,
        }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const refNo = property.identification.refNo || 'PROPERTY';
      const filename = `${refNo.replace(/[^a-zA-Z0-9-]/g, '_')}_Details_Sheet.pdf`;

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      showNotification('PDF downloaded successfully! History recorded.');
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    const updated: Property = {
      ...property,
      version: (property.version || 1) + 1,
      updatedAt: new Date().toISOString(),
    };
    saveProperty(updated);
    setProperty(updated);
    if (onPropertyUpdate) onPropertyUpdate(updated);

    recordPDFGeneration(updated);
    await generatePreviewBlob(updated);
    showNotification(`PDF regenerated! Version bumped to v${updated.version}.0`);
  };

  const handleSaveDraft = () => {
    const updated: Property = {
      ...property,
      status: 'Draft',
      updatedAt: new Date().toISOString(),
    };
    saveProperty(updated);
    setProperty(updated);
    showNotification('Property saved as Draft');
  };

  const handleReset = () => {
    setProperty(initialProperty);
    generatePreviewBlob(initialProperty);
    showNotification('PDF preview reset to saved values');
  };

  const handleQuickFieldChange = (path: string, value: string) => {
    const keys = path.split('.');
    const clone = JSON.parse(JSON.stringify(property));
    let curr: any = clone;
    for (let i = 0; i < keys.length - 1; i++) {
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    setProperty(clone);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#090E22] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#F0A500] flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#F0A500]" />
          <span className="text-xs font-extrabold">{toastMessage}</span>
        </div>
      )}

      {/* ─── Studio Top Control Banner (Dark Navy) ─── */}
      <div className="bg-[#090E22] text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FFC641] flex-shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-black text-white">{property.identification.refNo} — PDF Studio</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#F0A500] text-[#090E22] rounded-md">
                v{property.version || 1}.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium truncate max-w-md mt-0.5">
              {property.identification.propertyName}
            </p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn-gold px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#16204B] border border-slate-700 text-white hover:bg-[#1E2D6B] transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#FFC641] ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition flex items-center gap-2"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Draft</span>
          </button>

          <Link
            href={`/properties/${property.id}/edit`}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Edit Full Form</span>
          </Link>

          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ─── Main Studio Workspace (Left Preview + Right Live Editor) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live PDF Preview Viewport */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col h-[820px]">
          <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between text-xs text-slate-700 font-extrabold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0A500] pulse-dot" />
              <span className="text-[#0F172A] font-black">Live PDF Template Output (2-Page A4)</span>
            </div>
            {isGenerating && (
              <span className="text-[11px] text-amber-600 font-bold animate-pulse">Rendering Live Preview...</span>
            )}
          </div>

          <div className="flex-1 bg-[#1E2028] p-3 relative flex items-center justify-center">
            {pdfBlobUrl ? (
              <iframe
                src={pdfBlobUrl}
                className="w-full h-full rounded-2xl border-0 shadow-2xl"
                title="Live Property PDF Preview"
              />
            ) : (
              <div className="text-white text-xs flex flex-col items-center gap-3">
                <RefreshCw className="w-7 h-7 animate-spin text-[#FFC641]" />
                <span className="font-extrabold">Preparing PDF engine...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Instant Live Field Editor Panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-5 flex flex-col h-[820px] overflow-y-auto custom-scrollbar">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F0A500]" />
              INSTANT LIVE FIELD EDITOR
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Changes made here instantly trigger PDF preview updates.
            </p>
          </div>

          <div className="space-y-4 text-xs flex-1">
            {/* Property Name */}
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                Property Name
              </label>
              <input
                type="text"
                value={property.identification?.propertyName || ''}
                onChange={(e) => handleQuickFieldChange('identification.propertyName', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
              />
            </div>

            {/* Location / Address */}
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                Location / Address
              </label>
              <input
                type="text"
                value={property.identification?.location || ''}
                onChange={(e) => handleQuickFieldChange('identification.location', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
              />
            </div>

            {/* Extent & Facing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                  Total Extent
                </label>
                <input
                  type="text"
                  value={property.siteDetails?.totalExtent || ''}
                  onChange={(e) => handleQuickFieldChange('siteDetails.totalExtent', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                  Facing
                </label>
                <input
                  type="text"
                  value={property.siteDetails?.facing || ''}
                  onChange={(e) => handleQuickFieldChange('siteDetails.facing', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
                />
              </div>
            </div>

            {/* Total Asking Price (₹) - Highlighted Gold Field */}
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                Total Asking Price (₹)
              </label>
              <input
                type="text"
                value={property.salePricing?.totalAskingPrice || ''}
                onChange={(e) => {
                  handleQuickFieldChange('salePricing.totalAskingPrice', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 text-xs font-black border-2 border-[#F0A500] bg-[#FFF8E6] text-[#0F172A] rounded-xl focus:bg-white transition"
              />
            </div>

            {/* Title Deed Status */}
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                Title Deed Status
              </label>
              <select
                value={property.ownership?.titleDeedStatus || 'Clear Title'}
                onChange={(e) => handleQuickFieldChange('ownership.titleDeedStatus', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-black border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
              >
                <option value="Clear Title">Clear Title</option>
                <option value="Encumbered">Encumbered</option>
                <option value="Under Verification">Under Verification</option>
              </select>
            </div>

            {/* Key Highlights */}
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-700 mb-1.5">
                Key Highlights
              </label>
              <textarea
                rows={4}
                value={property.features?.additionalHighlights || ''}
                onChange={(e) => handleQuickFieldChange('features.additionalHighlights', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50/70 focus:bg-white focus:border-[#F0A500] text-[#0F172A]"
              />
            </div>

            {/* Footer Company Branding Sync */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                COMPANY BRANDING SYNC
              </span>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                PDF Header & Footer automatically inherit branding settings from Company Settings.
              </p>
              <Link
                href="/settings"
                className="inline-flex items-center gap-1 text-[11px] font-black text-[#1A2455] hover:text-[#F0A500] transition pt-1"
              >
                <span>Edit Company Settings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
