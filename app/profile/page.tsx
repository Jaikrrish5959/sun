'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { User, ShieldCheck, Key, Mail, Phone, Building2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div>
      <Header title="User Profile & Account" subtitle="Admin credentials and system authorization settings" />

      <div className="p-8 space-y-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#1B2A4A] p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-[#0F1E36] text-[#D4AF37] text-xl font-bold flex items-center justify-center">
                KS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1B2A4A]">K. Sunder Raman</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#D4AF37] text-[#0F1E36] rounded">Super Admin</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Managing Director — SUN REALTORS</p>
              <p className="text-[11px] text-slate-400 mt-1">Authorized PDF Generator Licensee</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Primary Email</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">sunder@sunrealtors.in</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Direct Contact</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">+91 98400 12345</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Office Location</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">No. 45, Sun Towers, Guindy, Chennai</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>System Role & Privileges</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">Full Master Admin (PDF Template Editor Access)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
