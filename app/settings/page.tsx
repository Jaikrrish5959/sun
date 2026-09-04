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
    <div className="animate-fade-in">
      <Header
        title="Company Branding & Settings"
        subtitle="Manage realtor agency details, contact information and official legal disclaimer injected into generated PDFs"
      />

      <div className="p-8 md:p-10 lg:p-12 space-y-8 max-w-7xl mx-auto">
        {notification && (
          <div className="bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-5 py-4 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 space-y-8 shadow-xs">
          <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2455] text-[#FFC641] flex items-center justify-center font-bold shadow-xs">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0F172A] tracking-tight">Realtor Company Branding Profile</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Updates here automatically update Header Logo, Realtor Contact block, and Legal Disclaimer on future PDFs.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl btn-gold text-xs font-black transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-extrabold text-[#1A2455] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Tagline / Subtitle</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Contact Person (Managing Director)</label>
              <input
                type="text"
                value={settings.contactPerson}
                onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">RERA / Registration Number</label>
              <input
                type="text"
                value={settings.regNumber}
                onChange={(e) => setSettings({ ...settings, regNumber: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-mono font-bold transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">WhatsApp Contact</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Office Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-semibold transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Legal Disclaimer Text (PDF Footer Block)</label>
            <textarea
              rows={4}
              value={settings.disclaimerText}
              onChange={(e) => setSettings({ ...settings, disclaimerText: e.target.value })}
              className="w-full px-4 py-3 text-xs border rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white font-medium leading-relaxed text-slate-700 transition-all"
            />
            <p className="text-xs text-slate-400 mt-1.5 font-medium">This text appears at the bottom of Page 2 of every generated PDF.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
