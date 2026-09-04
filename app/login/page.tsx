'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SunLogo } from '@/components/common/SunLogo';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Phone, MapPin, Globe, Award, CheckCircle2 } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  email: 'sunrealtorsindia@gmail.com',
  password: 'suresh@143',
  name: 'Suresh Kumar P G',
  role: 'Managing Director',
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (
      (email.trim() === ADMIN_CREDENTIALS.email || email.trim() === 'admin') &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem(
        'sun_auth',
        JSON.stringify({
          loggedIn: true,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role,
          email: ADMIN_CREDENTIALS.email,
          loginAt: new Date().toISOString(),
        })
      );
      router.push('/');
    } else {
      setError('Invalid email or password. Use: sunrealtorsindia@gmail.com / suresh@143');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full login-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #F0A500 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFC641 0%, transparent 70%)' }}
        />
      </div>

      <div className="w-full max-w-md z-10 space-y-4">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Banner */}
          <div
            className="pt-8 pb-6 px-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F1738 0%, #1A2455 60%, #253372 100%)' }}
          >
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, #F0A500 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <SunLogo variant="dark" size="md" />
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                <Award className="w-3 h-3 text-[#F0A500]" />
                <span>Authorized Admin Portal</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-8 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold" style={{ color: '#1A2455' }}>
                Admin Authentication
              </h2>
              <p className="text-xs" style={{ color: '#64748B' }}>
                Enter credentials for Property Management System
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-extrabold mb-1.5" style={{ color: '#1A2455' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#F0A500' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sunrealtorsindia@gmail.com"
                    className="w-full pl-10 pr-4 py-3 text-xs font-bold rounded-xl border transition-all"
                    style={{ borderColor: '#CBD5E1', backgroundColor: '#F8FAFC', color: '#1E293B' }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-extrabold mb-1.5" style={{ color: '#1A2455' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#F0A500' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="suresh@143"
                    className="w-full pl-10 pr-11 py-3 text-xs font-bold rounded-xl border transition-all"
                    style={{ borderColor: '#CBD5E1', backgroundColor: '#F8FAFC', color: '#1E293B' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition hover:bg-slate-200"
                    style={{ color: '#94A3B8' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Fill Button for testing convenience */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('sunrealtorsindia@gmail.com');
                    setPassword('suresh@143');
                  }}
                  className="text-[11px] font-bold hover:underline"
                  style={{ color: '#C8880A' }}
                >
                  Autofill Admin Credentials
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-xs font-extrabold tracking-wider transition-all btn-gold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8V0" fill="currentColor" className="opacity-75" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#1A2455]" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details from Visiting Card */}
          <div className="px-8 pb-6 pt-3 border-t space-y-2" style={{ borderColor: '#F1F5F9', backgroundColor: '#FAFBFD' }}>
            <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              SUN REALTORS Headquarters
            </p>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#475569' }}>
              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>+91 98941 05333 &nbsp;|&nbsp; +91 99427 05333</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#475569' }}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>814 RKM Complex, Lakshminagar, Erode – 638316</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#475569' }}>
              <Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>www.sunrealtorsindia.com</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          © 2026 SUN REALTORS — Real Estate & Property Management System
        </p>
      </div>
    </div>
  );
}
