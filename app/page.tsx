'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { getStoredProperties, getPDFHistory } from '@/lib/storage';
import { Property } from '@/lib/types';
import {
  Building2, FileCheck2, FileClock, TrendingUp,
  Plus, ArrowRight, Eye, Edit, MapPin, Calendar,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [pdfCount, setPdfCount] = useState(0);

  useEffect(() => {
    const props = getStoredProperties();
    setProperties(props);
    setPdfCount(getPDFHistory().length);
  }, []);

  const active  = properties.filter(p => p.status === 'Active').length;
  const drafts  = properties.filter(p => p.status === 'Draft').length;
  const total   = properties.length;

  const stats = [
    { label: 'Total Properties', value: total,    icon: Building2,   color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Active Listings',  value: active,   icon: TrendingUp,  color: '#10B981', bg: '#ECFDF5' },
    { label: 'Saved Drafts',     value: drafts,   icon: FileClock,   color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'PDFs Generated',   value: pdfCount, icon: FileCheck2,  color: '#8B5CF6', bg: '#F5F3FF' },
  ];

  const recent = [...properties].sort((a,b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 6);

  return (
    <div className="animate-fade-in">
      <Header
        title="Dashboard"
        subtitle="SUN REALTORS Property Management System"
      />

      <div style={{ padding: '32px', maxWidth: 1400, margin: '0 auto' }} className="space-y-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card-hover"
                style={{ background:'#fff', borderRadius:16, border:'1px solid #E2E8F0', padding:'20px 22px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <div style={{
                    width:38, height:38, borderRadius:10,
                    background:s.bg, display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon size={18} style={{ color: s.color }}/>
                  </div>
                </div>
                <div style={{ fontSize:28, fontWeight:900, color:'#0F172A', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:12, color:'#64748B', fontWeight:500, marginTop:4 }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/properties/add"
            style={{ background:'#111827', borderRadius:16, padding:'24px', textDecoration:'none', display:'block' }}
            className="card-hover">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
              <div style={{ width:40, height:40, background:'rgba(240,165,0,0.12)', borderRadius:10,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Plus size={20} style={{ color:'#F0A500' }}/>
              </div>
              <span style={{ fontSize:14, fontWeight:800, color:'#fff' }}>Add New Property</span>
            </div>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>
              Create a new land property listing and generate its A4 PDF specification sheet.
            </p>
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:'#F0A500', fontSize:12, fontWeight:700 }}>
              Get started <ArrowRight size={13}/>
            </div>
          </Link>

          <Link href="/pdf-generator"
            style={{ background:'linear-gradient(135deg,#FFF8E6,#FFF0CC)', borderRadius:16, padding:'24px',
              textDecoration:'none', display:'block', border:'1px solid rgba(240,165,0,0.3)' }}
            className="card-hover">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
              <div style={{ width:40, height:40, background:'rgba(240,165,0,0.15)', borderRadius:10,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <FileCheck2 size={20} style={{ color:'#F0A500' }}/>
              </div>
              <span style={{ fontSize:14, fontWeight:800, color:'#0F172A' }}>PDF Generator Studio</span>
            </div>
            <p style={{ fontSize:12, color:'#78716C', lineHeight:1.6 }}>
              Live A4 PDF preview and instant download for any property in your directory.
            </p>
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:'#92400E', fontSize:12, fontWeight:700 }}>
              Open Studio <ArrowRight size={13}/>
            </div>
          </Link>

          <Link href="/properties"
            style={{ background:'#fff', borderRadius:16, padding:'24px', textDecoration:'none',
              display:'block', border:'1px solid #E2E8F0' }}
            className="card-hover">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
              <div style={{ width:40, height:40, background:'#EFF6FF', borderRadius:10,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Building2 size={20} style={{ color:'#3B82F6' }}/>
              </div>
              <span style={{ fontSize:14, fontWeight:800, color:'#0F172A' }}>Properties Directory</span>
            </div>
            <p style={{ fontSize:12, color:'#64748B', lineHeight:1.6 }}>
              Browse, search, and filter your entire property portfolio in one view.
            </p>
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:'#3B82F6', fontSize:12, fontWeight:700 }}>
              View all <ArrowRight size={13}/>
            </div>
          </Link>
        </div>

        {/* Recent Properties */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #E2E8F0', overflow:'hidden' }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <h2 style={{ fontSize:14, fontWeight:800, color:'#0F172A' }}>Recent Properties</h2>
              <p style={{ fontSize:11, color:'#64748B', marginTop:2 }}>Latest additions & updates</p>
            </div>
            <Link href="/properties"
              style={{ fontSize:11, fontWeight:700, color:'#F0A500', textDecoration:'none',
                display:'flex', alignItems:'center', gap:4 }}>
              View all <ArrowRight size={12}/>
            </Link>
          </div>

          {recent.length === 0 ? (
            <div style={{ padding:'48px 24px', textAlign:'center' }}>
              <Building2 size={40} style={{ color:'#CBD5E1', margin:'0 auto 12px' }}/>
              <p style={{ fontSize:13, fontWeight:700, color:'#475569' }}>No properties yet</p>
              <p style={{ fontSize:11, color:'#94A3B8', marginTop:4 }}>Add your first property to get started</p>
              <Link href="/properties/add"
                className="btn-navy"
                style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:16,
                  padding:'8px 18px', borderRadius:10, fontSize:12, textDecoration:'none', fontWeight:700 }}>
                <Plus size={13} style={{ color:'#F0A500' }}/> Add Property
              </Link>
            </div>
          ) : (
            <div>
              {recent.map((p, i) => (
                <div key={p.id}
                  style={{
                    padding:'14px 24px', display:'flex', alignItems:'center', gap:16,
                    borderBottom: i < recent.length-1 ? '1px solid #F8FAFC' : 'none',
                    transition:'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#FAFAFA'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background=''}
                >
                  {/* Icon */}
                  <div style={{ width:36, height:36, background:'#F1F5F9', borderRadius:10,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Building2 size={16} style={{ color:'#64748B' }}/>
                  </div>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:12, fontWeight:800, color:'#0F172A' }}>
                        {p.identification.refNo}
                      </span>
                      <span style={{
                        fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:20,
                        textTransform:'uppercase', letterSpacing:'0.05em',
                        ...(p.status==='Active'
                          ? { background:'#ECFDF5', color:'#047857', border:'1px solid #A7F3D0' }
                          : p.status==='Draft'
                          ? { background:'#FFFBEB', color:'#B45309', border:'1px solid #FDE68A' }
                          : { background:'#F8FAFC', color:'#475569', border:'1px solid #E2E8F0' })
                      }}>{p.status}</span>
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#475569', marginTop:1 }}>
                      {p.identification.propertyName || '—'}
                    </div>
                    <div style={{ fontSize:11, color:'#94A3B8', display:'flex', alignItems:'center', gap:4, marginTop:2 }}>
                      <MapPin size={10}/>{p.identification.location || '—'}
                      <span style={{ margin:'0 4px' }}>·</span>
                      <Calendar size={10}/>{new Date(p.updatedAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontSize:13, fontWeight:900, color:'#0F172A' }}>
                      {p.salePricing?.totalAskingPrice || '—'}
                    </div>
                    <div style={{ fontSize:10, color:'#94A3B8', marginTop:1 }}>
                      {p.identification.propertyType}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                    <Link href={`/properties/${p.id}/pdf`}
                      style={{ padding:'6px 10px', borderRadius:8, background:'#FFF8E6',
                        border:'1px solid rgba(240,165,0,0.3)', textDecoration:'none',
                        display:'flex', alignItems:'center' }} title="Preview PDF">
                      <Eye size={13} style={{ color:'#F0A500' }}/>
                    </Link>
                    <Link href={`/properties/${p.id}/edit`}
                      style={{ padding:'6px 10px', borderRadius:8, background:'#F1F5F9',
                        border:'1px solid #E2E8F0', textDecoration:'none',
                        display:'flex', alignItems:'center' }} title="Edit">
                      <Edit size={13} style={{ color:'#64748B' }}/>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
