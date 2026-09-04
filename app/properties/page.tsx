'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getStoredProperties, deleteProperty } from '@/lib/storage';
import { Property } from '@/lib/types';
import { Building2, Search, Plus, Eye, Edit, Trash2, MapPin, XCircle } from 'lucide-react';

export default function PropertiesPage() {
  const [all, setAll]     = useState<Property[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType]   = useState('');

  const load = () => setAll(getStoredProperties());
  useEffect(() => load(), []);

  const filtered = all.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q ||
      p.identification.refNo.toLowerCase().includes(q) ||
      p.identification.propertyName.toLowerCase().includes(q) ||
      p.identification.location.toLowerCase().includes(q) ||
      (p.ownership?.currentOwner || '').toLowerCase().includes(q);
    const matchS = !status || p.status === status;
    const matchT = !type   || p.identification.propertyType === type;
    return matchQ && matchS && matchT;
  });

  const clearFilters = () => {
    setQuery('');
    setStatus('');
    setType('');
  };

  const del = (id: string) => {
    if (confirm('Delete this property? This cannot be undone.')) { deleteProperty(id); load(); }
  };

  return (
    <div className="animate-fade-in pb-12">
      <Header title="Properties Directory" subtitle={`${all.length} total propert${all.length===1?'y':'ies'} in your portfolio`}/>

      <div style={{ padding:'28px 32px', maxWidth:1400, margin:'0 auto' }}>

        {/* Filter & Search Bar */}
        <div style={{
          background:'#fff', borderRadius:16, border:'1px solid #E2E8F0',
          padding:'16px 20px', marginBottom:24, boxShadow:'0 1px 3px rgba(0,0,0,0.03)',
          display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
        }}>
          {/* Search Input */}
          <div style={{ flex:1, minWidth:260, position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }}/>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by ref no, property title, location, or owner..."
              style={{
                width:'100%', padding:'9px 12px 9px 36px', borderRadius:12,
                border:'1px solid #E2E8F0', fontSize:12, color:'#0F172A',
                background:'#F8FAFC', fontWeight:600,
              }}
            />
          </div>

          {/* Status filter */}
          <select value={status} onChange={e => setStatus(e.target.value)}
            style={{ padding:'9px 14px', borderRadius:12, border:'1px solid #E2E8F0',
              fontSize:12, color:'#0F172A', background:'#F8FAFC', fontWeight:700, cursor:'pointer' }}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {/* Type filter */}
          <select value={type} onChange={e => setType(e.target.value)}
            style={{ padding:'9px 14px', borderRadius:12, border:'1px solid #E2E8F0',
              fontSize:12, color:'#0F172A', background:'#F8FAFC', fontWeight:700, cursor:'pointer' }}>
            <option value="">All Property Types</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Industrial">Industrial</option>
            <option value="Plot/Layout">Plot / Layout</option>
            <option value="Mixed Use">Mixed Use</option>
          </select>

          {(query || status || type) && (
            <button
              onClick={clearFilters}
              style={{
                display:'flex', alignItems:'center', gap:4, padding:'8px 12px',
                borderRadius:12, background:'#FEF2F2', border:'1px solid #FECACA',
                color:'#DC2626', fontSize:12, fontWeight:700, cursor:'pointer',
              }}
            >
              <XCircle size={13}/> Reset
            </button>
          )}
        </div>

        {/* Table Container */}
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E2E8F0', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.03)' }}>
          {filtered.length === 0 ? (
            <div style={{ padding:'64px 24px', textAlign:'center' }}>
              <Building2 size={44} style={{ color:'#CBD5E1', margin:'0 auto 14px' }}/>
              <p style={{ fontSize:14, fontWeight:800, color:'#334155' }}>
                {all.length === 0 ? 'No properties in system' : 'No matching properties found'}
              </p>
              <p style={{ fontSize:12, color:'#94A3B8', marginTop:4 }}>
                {all.length === 0
                  ? 'Click "+ Add Property" in the top bar to create your first listing.'
                  : 'Try adjusting your search criteria or resetting filters.'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'#090E22', color:'#fff' }}>
                    {['Ref No / Date','Property Title & Owner','Location & State','Type & Facing','Asking Price','Status','Actions'].map(h => (
                      <th key={h} style={{ padding:'14px 18px', textAlign:'left', fontSize:11,
                        fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em',
                        whiteSpace:'nowrap', color: h==='Ref No / Date' ? '#FFC641' : 'rgba(255,255,255,0.75)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id}
                      style={{ borderBottom: i<filtered.length-1 ? '1px solid #F1F5F9' : 'none', transition:'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#F8FAFC'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background=''}
                    >
                      <td style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>
                        <div style={{ fontSize:12, fontWeight:800, color:'#0F172A', fontFamily:'monospace' }}>{p.identification.refNo}</div>
                        <div style={{ fontSize:10, color:'#94A3B8', marginTop:2 }}>v{p.version}.0 · {p.identification.date}</div>
                      </td>
                      <td style={{ padding:'14px 18px' }}>
                        <div style={{ fontSize:13, fontWeight:800, color:'#0F172A' }}>{p.identification.propertyName || '—'}</div>
                        <div style={{ fontSize:11, color:'#64748B', marginTop:2, fontWeight:500 }}>{p.ownership?.currentOwner || 'Owner N/A'}</div>
                      </td>
                      <td style={{ padding:'14px 18px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#334155', fontWeight:600 }}>
                          <MapPin size={12} style={{ color:'#F0A500', flexShrink:0 }}/>
                          {p.identification.location || '—'}
                        </div>
                        <div style={{ fontSize:10, color:'#94A3B8', marginTop:2 }}>
                          {p.identification.district}{p.identification.district&&p.identification.state?', ':''}{p.identification.state}
                        </div>
                      </td>
                      <td style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>
                        <span style={{
                          fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20,
                          background:'#F1F5F9', color:'#334155', border:'1px solid #E2E8F0',
                        }}>{p.identification.propertyType}</span>
                        <div style={{ fontSize:10, color:'#94A3B8', marginTop:3 }}>{p.siteDetails.facing} facing</div>
                      </td>
                      <td style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>
                        <div style={{ fontSize:13, fontWeight:900, color:'#0F172A' }}>
                          {p.salePricing?.totalAskingPrice || '—'}
                        </div>
                        <div style={{ fontSize:10, color:'#94A3B8', marginTop:2 }}>{p.salePricing?.ratePerUnit || ''}</div>
                      </td>
                      <td style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>
                        <span style={{
                          fontSize:10, fontWeight:800, padding:'3.5px 10px', borderRadius:20,
                          textTransform:'uppercase', letterSpacing:'0.04em',
                          ...(p.status==='Active'
                            ? { background:'#ECFDF5', color:'#047857', border:'1px solid #A7F3D0' }
                            : p.status==='Draft'
                            ? { background:'#FFFBEB', color:'#B45309', border:'1px solid #FDE68A' }
                            : { background:'#F8FAFC', color:'#475569', border:'1px solid #E2E8F0' })
                        }}>{p.status}</span>
                      </td>
                      <td style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>
                        <div style={{ display:'flex', gap:6 }}>
                          <Link href={`/properties/${p.id}/pdf`} title="Preview PDF"
                            style={{ padding:'6px 10px', borderRadius:10, background:'#FFF8E6',
                              border:'1px solid rgba(240,165,0,0.35)', textDecoration:'none',
                              display:'flex', alignItems:'center' }}>
                            <Eye size={13} style={{ color:'#F0A500' }}/>
                          </Link>
                          <Link href={`/properties/${p.id}/edit`} title="Edit Property"
                            style={{ padding:'6px 10px', borderRadius:10, background:'#F1F5F9',
                              border:'1px solid #E2E8F0', textDecoration:'none',
                              display:'flex', alignItems:'center' }}>
                            <Edit size={13} style={{ color:'#64748B' }}/>
                          </Link>
                          <button onClick={() => del(p.id)} title="Delete Property"
                            style={{ padding:'6px 10px', borderRadius:10, background:'#fff',
                              border:'1px solid #E2E8F0', cursor:'pointer',
                              display:'flex', alignItems:'center' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#FEF2F2'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#fff'; }}>
                            <Trash2 size={13} style={{ color:'#EF4444' }}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <p style={{ fontSize:12, color:'#94A3B8', marginTop:12, textAlign:'center', fontWeight:500 }}>
            Showing {filtered.length} of {all.length} propert{all.length===1?'y':'ies'}
          </p>
        )}
      </div>
    </div>
  );
}
