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
    <div>
      <Header title="User Profile & Account" subtitle="Admin credentials and system authorization settings" />

      <div className="p-8 space-y-6 max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: '#E2E8F0' }}>
          {/* Hero band */}
          <div className="h-28 relative" style={{
            background: 'linear-gradient(135deg, #111A3E 0%, #1A2455 60%, #1E2D6B 100%)'
          }}>
            <div className="absolute inset-0 opacity-5"
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F0A500 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          </div>

          {/* Avatar + Name */}
          <div className="px-8 pb-6">
            <div className="-mt-10 flex items-end justify-between mb-4">
              <div className="w-20 h-20 rounded-2xl border-4 flex items-center justify-center text-xl font-extrabold shadow-lg"
                   style={{
                     background: 'linear-gradient(135deg, #F0A500 0%, #C8880A 100%)',
                     color: '#111A3E',
                     borderColor: 'white',
                   }}>
                SK
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
                style={{ backgroundColor: '#FFF8E6', color: '#92400E', border: '1px solid rgba(240,165,0,0.3)' }}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold" style={{ color: '#1A2455' }}>Suresh Kumar P G</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full"
                      style={{ backgroundColor: '#F0A500', color: '#111A3E' }}>
                  Super Admin
                </span>
              </div>
              <p className="text-sm font-semibold" style={{ color: '#64748B' }}>Managing Director — SUN REALTORS</p>
              <p className="text-xs flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
                <Star className="w-3 h-3" style={{ color: '#F0A500' }} />
                Full Master Access — PDF Template Editor, Property Manager, Settings Admin
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl border space-y-4" style={{ borderColor: '#E2E8F0' }}>
            <h4 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: '#1A2455' }}>
              Contact Details
            </h4>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.2)' }}>
                  <Mail className="w-4 h-4" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#94A3B8' }}>Official Email</p>
                  <p className="text-xs font-bold" style={{ color: '#1A2455' }}>sunrealtorsindia@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.2)' }}>
                  <Phone className="w-4 h-4" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#94A3B8' }}>Phone / WhatsApp</p>
                  <p className="text-xs font-bold" style={{ color: '#1A2455' }}>+91 98941 05333 &nbsp;|&nbsp; +91 99427 05333</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.2)' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#94A3B8' }}>Office Address</p>
                  <p className="text-xs font-bold" style={{ color: '#1A2455' }}>814 RKM Complex, Lakshminagar</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Erode – 638316, Tamil Nadu</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.2)' }}>
                  <Globe className="w-4 h-4" style={{ color: '#F0A500' }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#94A3B8' }}>Website</p>
                  <p className="text-xs font-bold" style={{ color: '#1A2455' }}>www.sunrealtorsindia.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Access Settings Card */}
          <div className="bg-white p-5 rounded-xl border space-y-4" style={{ borderColor: '#E2E8F0' }}>
            <h4 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: '#1A2455' }}>
              System Access & Privileges
            </h4>

            {[
              { label: 'Role', value: 'Master Administrator', icon: ShieldCheck },
              { label: 'Login Identity', value: 'sunrealtorsindia@gmail.com', icon: Key },
              { label: 'Agency', value: 'SUN REALTORS — Property Mgmt PMS', icon: Building2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#F0A500' }} />
                <div>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#94A3B8' }}>{label}</p>
                  <p className="text-xs font-bold" style={{ color: '#1E293B' }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg flex items-center gap-2 mt-2"
                 style={{ backgroundColor: '#FFF8E6', border: '1px solid rgba(240,165,0,0.25)' }}>
              <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#C8880A' }} />
              <p className="text-[11px] font-semibold" style={{ color: '#92400E' }}>
                Full access: Properties, PDF Generator, History, Settings, Templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
