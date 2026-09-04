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
  Printer,
  ChevronRight,
  Eye,
  CheckCircle2,
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
  const [activeTab, setActiveTab] = useState<'preview' | 'quick-edit'>('preview');

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
    // Cleanup URL object when component unmounts
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
      // Record PDF generation history
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
    // Increment version
    const updated: Property = {
      ...property,
      version: property.version + 1,
      updatedAt: new Date().toISOString(),
    };
    saveProperty(updated);
    setProperty(updated);
    if (onPropertyUpdate) onPropertyUpdate(updated);

    recordPDFGeneration(updated);
    await generatePreviewBlob(updated);
    showNotification(`PDF regenerated! New version v${updated.version}.0`);
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
    <div className="space-y-4">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F1E36] text-white px-5 py-3 rounded-lg shadow-xl border border-[#D4AF37] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Studio Top Control Toolbar */}
      <div className="bg-[#0F1E36] text-white p-4 rounded-xl shadow-md border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">{property.identification.refNo} — PDF Studio</h2>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#D4AF37] text-[#0F1E36] rounded">
                v{property.version}.0
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-md">{property.identification.propertyName}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-xs font-extrabold hover:brightness-110 transition shadow"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1B2A4A] border border-[#D4AF37]/30 text-white text-xs font-semibold hover:bg-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Draft</span>
          </button>

          <Link
            href={`/properties/${property.id}/edit`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Edit Full Form</span>
          </Link>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs font-medium hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Main Column: PDF Live Preview Viewport */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[750px]">
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-[#1B2A4A]">
              <Eye className="w-4 h-4 text-[#D4AF37]" />
              <span>Live PDF Template Output (2-Page A4)</span>
            </div>
            {isGenerating && <span className="text-[11px] text-amber-600 font-medium animate-pulse">Rendering Live Preview...</span>}
          </div>

          <div className="flex-1 bg-slate-800 p-2 relative flex items-center justify-center">
            {pdfBlobUrl ? (
              <iframe src={pdfBlobUrl} className="w-full h-full rounded border-0 shadow-lg" title="Live Property PDF Preview" />
            ) : (
              <div className="text-white text-xs flex flex-col items-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
                <span>Preparing PDF engine...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Instant Live Editor Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 flex flex-col h-[750px] overflow-y-auto custom-scrollbar">
          <div className="border-b pb-3">
            <h3 className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Instant Live Field Editor
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Changes made here instantly trigger PDF preview updates.</p>
          </div>

          <div className="space-y-3 text-xs flex-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Property Name</label>
              <input
                type="text"
                value={property.identification.propertyName}
                onChange={(e) => handleQuickFieldChange('identification.propertyName', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300 focus:ring-1 focus:ring-[#1B2A4A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Location / Address</label>
              <input
                type="text"
                value={property.identification.location}
                onChange={(e) => handleQuickFieldChange('identification.location', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Extent</label>
                <input
                  type="text"
                  value={property.siteDetails.totalExtent}
                  onChange={(e) => handleQuickFieldChange('siteDetails.totalExtent', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Facing</label>
                <input
                  type="text"
                  value={property.siteDetails.facing}
                  onChange={(e) => handleQuickFieldChange('siteDetails.facing', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Asking Price (₹)</label>
              <input
                type="text"
                value={property.salePricing.totalAskingPrice}
                onChange={(e) => handleQuickFieldChange('salePricing.totalAskingPrice', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-bold border rounded border-[#D4AF37] bg-[#FAF5E8] text-[#1B2A4A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Title Deed Status</label>
              <select
                value={property.ownership.titleDeedStatus}
                onChange={(e) => handleQuickFieldChange('ownership.titleDeedStatus', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300 font-semibold"
              >
                <option value="Clear Title">Clear Title</option>
                <option value="Encumbered">Encumbered</option>
                <option value="Under Verification">Under Verification</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Key Highlights</label>
              <textarea
                rows={3}
                value={property.features.additionalHighlights}
                onChange={(e) => handleQuickFieldChange('features.additionalHighlights', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border rounded border-slate-300"
              />
            </div>

            <div className="pt-2 border-t space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Branding Sync</span>
              <p className="text-[11px] text-slate-600">
                PDF Header & Footer automatically inherit branding settings from Company Settings.
              </p>
              <Link
                href="/settings"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B2A4A] hover:underline"
              >
                <span>Edit Company Settings</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
