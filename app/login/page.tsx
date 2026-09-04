'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Phone, MapPin, Globe } from 'lucide-react';

// Inline SVG Logo component
const SunRealtorsLogo = ({ size = 80 }: { size?: number }) => (
  <svg viewBox="0 0 260 280" width={size} height={size * (280 / 260)} xmlns="http://www.w3.org/2000/svg">
    {/* Sun rays */}
    <g fill="#F0A500">
      {/* Center sun body */}
      <circle cx="110" cy="90" r="38" fill="#FFC641" />
      {/* Rays */}
      <rect x="107" y="18" width="6" height="20" rx="3" fill="#F0A500" />
      <rect x="107" y="144" width="6" height="16" rx="3" fill="#F0A500" />
      <rect x="148" y="24" width="6" height="18" rx="3" transform="rotate(45 151 33)" fill="#F0A500" />
      <rect x="62" y="22" width="6" height="18" rx="3" transform="rotate(-45 65 31)" fill="#F0A500" />
      <rect x="158" y="87" width="20" height="6" rx="3" fill="#F0A500" />
      <rect x="44" y="87" width="20" height="6" rx="3" fill="#F0A500" />
      <rect x="148" y="126" width="6" height="18" rx="3" transform="rotate(-45 151 135)" fill="#F0A500" />
      <rect x="56" y="120" width="6" height="18" rx="3" transform="rotate(45 59 129)" fill="#F0A500" />
    </g>
    {/* House roofline - navy */}
    <g fill="none" stroke="#1A2455" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
      {/* Roof left slope */}
      <line x1="55" y1="135" x2="115" y2="75" />
      {/* Roof right slope */}
      <line x1="115" y1="75" x2="185" y2="135" />
    </g>
    {/* Chimney / window indicator */}
    <rect x="108" y="86" width="14" height="12" rx="2" fill="#F0A500" opacity="0.85" />
    {/* SUN text */}
    <text x="20" y="195" fontFamily="Georgia, serif" fontWeight="900" fontSize="72" fill="#F0A500" letterSpacing="-2">SUN</text>
    {/* REALTORS text */}
    <text x="20" y="240" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="34" fill="#1A2455" letterSpacing="6">REALTORS</text>
    {/* Tagline */}
    <text x="20" y="265" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="10" fill="#F0A500" letterSpacing="2">— FINDING THE RIGHT PLACE FOR YOU —</text>
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

    await new Promise((resolve) => setTimeout(resolve, 700));

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
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, #F0A500, transparent)' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, #FFC641, transparent)' }} />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-yellow-400 opacity-40 animate-ping" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-yellow-300 opacity-30 animate-ping"
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md mx-4 z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top brand band */}
          <div className="relative p-8 text-center overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #111A3E 0%, #1A2455 60%, #1E2D6B 100%)' }}>
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-5"
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F0A500 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <SunRealtorsLogo size={90} />
            </div>
          </div>

          {/* Login Form */}
          <div className="p-8 space-y-5">
            <div className="text-center space-y-1 mb-6">
              <h2 className="text-xl font-extrabold" style={{ color: '#1A2455' }}>Admin Portal Login</h2>
              <p className="text-xs" style={{ color: '#64748B' }}>Authorized personnel only — SUN REALTORS PMS</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A2455' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#F0A500' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sunrealtorsindia@gmail.com"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-all"
                    style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A2455' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#F0A500' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 text-sm rounded-xl border transition-all"
                    style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition"
                    style={{ color: '#94A3B8' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold tracking-wide transition-all btn-gold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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

          {/* Footer brand info */}
          <div className="px-8 pb-6 pt-2 border-t space-y-2" style={{ borderColor: '#F1F5F9' }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#64748B' }}>
              <Phone className="w-3 h-3" style={{ color: '#F0A500' }} />
              <span>+91 98941 05333 &nbsp;|&nbsp; +91 99427 05333</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#64748B' }}>
              <MapPin className="w-3 h-3" style={{ color: '#F0A500' }} />
              <span>814 RKM Complex, Lakshminagar, Erode – 638316</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#64748B' }}>
              <Globe className="w-3 h-3" style={{ color: '#F0A500' }} />
              <span>www.sunrealtorsindia.com</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
          © 2026 SUN REALTORS — Property Management System
        </p>
      </div>
    </div>
  );
}
