'use client';

import React from 'react';

interface SunLogoProps {
  variant?: 'dark' | 'light' | 'full';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SunLogo: React.FC<SunLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  // Dimensions setup
  const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.4 : 1.0;
  const width = Math.round(220 * scale);
  const height = Math.round(180 * scale);

  const sunColor = '#F0A500';
  const sunGlow = '#FFC641';
  const roofColor = variant === 'dark' ? '#FFFFFF' : '#1A2455';
  const sunTextColor = '#F0A500';
  const realtorsTextColor = variant === 'dark' ? '#FFFFFF' : '#1A2455';
  const taglineColor = variant === 'dark' ? 'rgba(240,165,0,0.9)' : '#C8880A';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 190"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC641" />
            <stop offset="100%" stopColor="#F0A500" />
          </linearGradient>
          <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC641" />
            <stop offset="100%" stopColor="#D48800" />
          </linearGradient>
        </defs>

        {/* ─── Sun Circle & Rays ─── */}
        <g>
          {/* Main Sun Body */}
          <circle cx="120" cy="62" r="30" fill="url(#sunGrad)" />

          {/* Triangular Sun Rays */}
          {/* Top ray */}
          <polygon points="120,12 115,26 125,26" fill={sunColor} />
          {/* Top-Right rays */}
          <polygon points="144,18 135,29 143,35" fill={sunColor} />
          <polygon points="164,32 152,40 157,48" fill={sunColor} />
          <polygon points="176,52 161,56 163,66" fill={sunColor} />
          {/* Right ray */}
          <polygon points="180,74 163,73 162,83" fill={sunColor} />

          {/* Top-Left rays */}
          <polygon points="96,18 105,29 97,35" fill={sunColor} />
          <polygon points="76,32 88,40 83,48" fill={sunColor} />
          <polygon points="64,52 79,56 77,66" fill={sunColor} />
          {/* Left ray */}
          <polygon points="60,74 77,73 78,83" fill={sunColor} />

          {/* Small inner rays */}
          <polygon points="132,15 127,24 134,26" fill={sunGlow} />
          <polygon points="108,15 113,24 106,26" fill={sunGlow} />
          <polygon points="155,24 145,32 151,37" fill={sunGlow} />
          <polygon points="85,24 95,32 89,37" fill={sunGlow} />
        </g>

        {/* ─── Roofline ─── */}
        <g fill="none" stroke={roofColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Primary roof slope */}
          <polyline points="48,102 120,44 192,102" />
          {/* Secondary parallel shadow line */}
          <polyline points="62,108 120,62 178,108" strokeWidth="4" opacity="0.6" />
        </g>

        {/* ─── 4-Pane Window ─── */}
        <g transform="translate(112, 70)">
          <rect x="0" y="0" width="7" height="6" fill={sunColor} rx="1" />
          <rect x="9" y="0" width="7" height="6" fill={sunColor} rx="1" />
          <rect x="0" y="8" width="7" height="6" fill={sunColor} rx="1" />
          <rect x="9" y="8" width="7" height="6" fill={sunColor} rx="1" />
        </g>

        {/* ─── "SUN" Serif Text ─── */}
        <text
          x="120"
          y="148"
          textAnchor="middle"
          fontFamily="Playfair Display, Georgia, serif"
          fontWeight="800"
          fontSize="46"
          fill="url(#goldTextGrad)"
          letterSpacing="-1"
        >
          SUN
        </text>

        {/* ─── "REALTORS" Sans Text ─── */}
        <text
          x="120"
          y="172"
          textAnchor="middle"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="800"
          fontSize="18"
          fill={realtorsTextColor}
          letterSpacing="7"
        >
          REALTORS
        </text>

        {/* ─── Tagline ─── */}
        <g transform="translate(0, 185)">
          <line x1="20" y1="-3" x2="45" y2="-3" stroke={sunColor} strokeWidth="1" />
          <text
            x="120"
            y="0"
            textAnchor="middle"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="600"
            fontSize="6.5"
            fill={taglineColor}
            letterSpacing="1.2"
          >
            FINDING THE RIGHT PLACE FOR YOU
          </text>
          <line x1="195" y1="-3" x2="220" y2="-3" stroke={sunColor} strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
