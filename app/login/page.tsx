'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Phone, MapPin, Globe, AlertCircle } from 'lucide-react';

// Inline SVG Logo component
const SunRealtorsLogo = ({ size = 80 }: { size?: number }) => (
  <svg viewBox="0 0 260 280" width={size} height={size * (280 / 260)} xmlns="http://www.w3.org/2000/svg">
    {/* Sun body glow */}
    <circle cx="110" cy="90" r="46" fill="rgba(255,198,65,0.12)" />
    {/* Center sun body */}
    <circle cx="110" cy="90" r="38" fill="#FFC641" />
    {/* Rays */}
    <g fill="#F0A500">
      <rect x="107" y="18" width="6" height="20" rx="3" />
      <rect x="107" y="144" width="6" height="16" rx="3" />
      <rect x="148" y="24" width="6" height="18" rx="3" transform="rotate(45 151 33)" />
      <rect x="62" y="22" width="6" height="18" rx="3" transform="rotate(-45 65 31)" />
      <rect x="158" y="87" width="20" height="6" rx="3" />
      <rect x="44" y="87" width="20" height="6" rx="3" />
      <rect x="148" y="126" width="6" height="18" rx="3" transform="rotate(-45 151 135)" />
      <rect x="56" y="120" width="6" height="18" rx="3" transform="rotate(45 59 129)" />
    </g>
    {/* House roofline */}
    <g fill="none" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
      <line x1="55" y1="135" x2="115" y2="75" />
      <line x1="115" y1="75" x2="185" y2="135" />
    </g>
    {/* Window */}
    <rect x="108" y="86" width="14" height="12" rx="2" fill="#F0A500" opacity="0.9" />
    {/* SUN text */}
    <text x="20" y="195" fontFamily="Georgia, serif" fontWeight="900" fontSize="72" fill="#F0A500" letterSpacing="-2">SUN</text>
    {/* REALTORS text */}
    <text x="20" y="240" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="34" fill="#FFFFFF" letterSpacing="6">REALTORS</text>
    {/* Tagline */}
    <text x="20" y="263" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="9" fill="rgba(240,165,0,0.75)" letterSpacing="2">FINDING THE RIGHT PLACE FOR YOU</text>
  </svg>
);

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

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      (email === ADMIN_CREDENTIALS.email || email === 'admin') &&
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
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen login-bg flex items-center justify-center relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,45,107,0.8) 0%, transparent 70%)' }}
        />
        {/* Dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #F0A500 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-40 animate-ping" />
        <div
          className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-25 animate-ping"
          style={{ animationDelay: '1.2s' }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-yellow-400 opacity-30 animate-ping"
          style={{ animationDelay: '0.6s' }}
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[420px] mx-5 z-10 animate-slide-up">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            backgroundColor: 'white',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,165,0,0.1)',
          }}
        >

          {/* Brand header */}
          <div
            className="relative pt-8 pb-6 flex flex-col items-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0D1530 0%, #1A2455 60%, #1E2D6B 100%)' }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div className="relative z-10">
              <SunRealtorsLogo size={100} />
            </div>
            {/* Gold divider */}
            <div
              className="w-16 h-0.5 mt-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #F0A500, transparent)' }}
            />
          </div>

          {/* Form */}
          <div className="px-8 pt-7 pb-6 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-[17px] font-extrabold" style={{ color: '#111A3E' }}>
                Admin Portal Login
              </h2>
              <p className="text-[11px]" style={{ color: '#94A3B8' }}>
                Authorized personnel only — SUN REALTORS PMS
              </p>
            </div>

            {error && (
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[12px] font-semibold animate-fade-in"
                style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wide" style={{ color: '#475569' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: '#F0A500' }}
                  />
                  <input
                    type="text"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sunrealtorsindia@gmail.com"
                    className="w-full pl-10 pr-4 py-3 text-[13px] rounded-xl border transition-all duration-200"
                    style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', color: '#1E293B' }}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wide" style={{ color: '#475569' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: '#F0A500' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 text-[13px] rounded-xl border transition-all duration-200"
                    style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', color: '#1E293B' }}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition"
                    style={{ color: '#CBD5E1' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-wide transition-all btn-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact footer */}
          <div
            className="px-8 py-4 border-t space-y-2"
            style={{ borderColor: '#F1F5F9', backgroundColor: '#FAFBFE' }}
          >
            <div className="flex items-center gap-2 text-[11px]" style={{ color: '#94A3B8' }}>
              <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>+91 98941 05333 &nbsp;|&nbsp; +91 99427 05333</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]" style={{ color: '#94A3B8' }}>
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>814 RKM Complex, Lakshminagar, Erode – 638316</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]" style={{ color: '#94A3B8' }}>
              <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#F0A500' }} />
              <span>www.sunrealtorsindia.com</span>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] mt-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2026 SUN REALTORS — Property Management System
        </p>
      </div>
    </div>
  );
}
