'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { getStoredCompanySettings, saveCompanySettings } from '@/lib/storage';
import { CompanySettings } from '@/lib/types';
import { Settings, Save, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>(getStoredCompanySettings());
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanySettings(settings);
    setNotification('Company Settings updated! Future PDFs will feature updated branding.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div>
      <Header
        title="Company Branding & Settings"
        subtitle="Manage realtor agency details, contact information and official legal disclaimer injected into generated PDFs"
      />

      <div className="p-8 space-y-6 max-w-4xl mx-auto">
        {notification && (
          <div className="bg-emerald-500 text-white px-5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div className="border-b pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B2A4A] text-[#D4AF37] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1B2A4A]">Realtor Company Branding Profile</h3>
                <p className="text-xs text-slate-500">
                  Updates here automatically update Header Logo, Realtor Contact block, and Legal Disclaimer on future PDFs.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-xs font-extrabold hover:brightness-105 transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-extrabold text-[#1B2A4A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Subtitle</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person (Managing Director)</label>
              <input
                type="text"
                value={settings.contactPerson}
                onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">RERA / Registration Number</label>
              <input
                type="text"
                value={settings.regNumber}
                onChange={(e) => setSettings({ ...settings, regNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Contact</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Legal Disclaimer Text (PDF Footer Block)</label>
            <textarea
              rows={4}
              value={settings.disclaimerText}
              onChange={(e) => setSettings({ ...settings, disclaimerText: e.target.value })}
              className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 leading-relaxed text-slate-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">This text appears at the bottom of Page 2 of every generated PDF.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
