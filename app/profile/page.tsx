'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import {
  User, ShieldCheck, Key, Mail, Phone,
  Building2, Globe, MapPin, LogOut, Star,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('sun_auth');
    router.push('/login');
  };

  return (
    <div className="animate-fade-in">
      <Header title="User Profile & Account" subtitle="Admin credentials and system authorization settings" />

      <div className="p-8 md:p-10 lg:p-12 space-y-8 max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Hero band */}
          <div className="h-36 relative" style={{
            background: 'linear-gradient(135deg, #090E22 0%, #16204B 60%, #1E2D6B 100%)'
          }}>
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F0A500 1.5px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>

          {/* Avatar + Name */}
          <div className="px-8 md:px-10 pb-8">
            <div className="-mt-12 flex items-end justify-between mb-5 flex-wrap gap-4">
              <div className="w-24 h-24 rounded-3xl border-4 flex items-center justify-center text-2xl font-black shadow-xl"
                   style={{
                     background: 'linear-gradient(135deg, #FFC641 0%, #F0A500 100%)',
                     color: '#090E22',
                     borderColor: 'white',
                   }}>
                SK
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition shadow-2xs hover:bg-amber-100/70"
                style={{ backgroundColor: '#FFF8E6', color: '#92400E', border: '1px solid rgba(240,165,0,0.35)' }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-black tracking-tight" style={{ color: '#0F172A' }}>Suresh Kumar P G</h3>
                <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full"
                      style={{ backgroundColor: '#F0A500', color: '#090E22' }}>
                  Super Admin
                </span>
              </div>
              <p className="text-sm font-extrabold text-slate-700">Managing Director — SUN REALTORS</p>
              <p className="text-xs flex items-center gap-2 text-slate-500 font-medium pt-1">
                <Star className="w-4 h-4" style={{ color: '#F0A500' }} />
                Full Master Access — PDF Template Editor, Property Manager, Settings Admin
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A2455] border-b border-slate-100 pb-3">
              Contact Details
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.3)' }}>
                  <Mail className="w-5 h-5" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Email</p>
                  <p className="text-xs font-extrabold text-[#0F172A]">sunrealtorsindia@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.3)' }}>
                  <Phone className="w-5 h-5" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone / WhatsApp</p>
                  <p className="text-xs font-extrabold text-[#0F172A]">+91 98941 05333 &nbsp;|&nbsp; +91 99427 05333</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.3)' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Office Address</p>
                  <p className="text-xs font-extrabold text-[#0F172A]">814 RKM Complex, Lakshminagar</p>
                  <p className="text-xs text-slate-500 font-medium">Erode – 638316, Tamil Nadu</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.3)' }}>
                  <Globe className="w-5 h-5" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Website</p>
                  <p className="text-xs font-extrabold text-[#0F172A]">www.sunrealtorsindia.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Access Settings Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A2455] border-b border-slate-100 pb-3">
              System Access & Privileges
            </h4>

            <div className="space-y-3.5">
              {[
                { label: 'Role', value: 'Master Administrator', icon: ShieldCheck },
                { label: 'Login Identity', value: 'sunrealtorsindia@gmail.com', icon: Key },
                { label: 'Agency', value: 'SUN REALTORS — Property Mgmt PMS', icon: Building2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60">
                  <Icon className="w-5 h-5 flex-shrink-0 text-[#F0A500]" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="text-xs font-extrabold text-slate-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl flex items-center gap-3 bg-amber-50/70 border border-amber-200/60 mt-2">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-[#C8880A]" />
              <p className="text-xs font-bold text-[#92400E]">
                Full access: Properties, PDF Generator, History, Settings, Templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
