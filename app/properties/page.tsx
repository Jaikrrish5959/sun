'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getStoredProperties, duplicateProperty, deleteProperty, updatePropertyStatus } from '@/lib/storage';
import { Property } from '@/lib/types';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  Trash2,
  Edit,
  Eye,
  FileCheck,
  Archive,
  RefreshCw,
} from 'lucide-react';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const loadProperties = () => {
    setProperties(getStoredProperties());
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDuplicate = (id: string) => {
    duplicateProperty(id);
    loadProperties();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
      loadProperties();
    }
  };

  const handleArchive = (id: string, currentStatus: Property['status']) => {
    const nextStatus = currentStatus === 'Archived' ? 'Active' : 'Archived';
    updatePropertyStatus(id, nextStatus);
    loadProperties();
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.identification.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.identification.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.identification.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.identification.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownership.currentOwner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesType = typeFilter === 'All' || p.identification.propertyType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <Header title="Property Directory" subtitle="View, manage, edit, duplicate, archive and export land properties" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by Ref No, Name, Owner, Location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-600">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border rounded-md border-slate-300 bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border rounded-md border-slate-300 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Plot/Layout">Plot/Layout</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <Link
              href="/properties/add"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B2A4A] text-white text-xs font-bold hover:bg-[#0F1E36] transition shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#0F1E36] text-white uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Ref No & Date</th>
                  <th className="p-4">Property & Owner</th>
                  <th className="p-4">Location & Extent</th>
                  <th className="p-4">Type & Facing</th>
                  <th className="p-4">Asking Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">PDF & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      <Building2 className="w-8 h-8 mx-auto stroke-1 mb-2" />
                      <p className="font-semibold">No property records match your filter criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-extrabold text-[#1B2A4A]">{prop.identification.refNo}</div>
                        <div className="text-[10px] text-slate-400">{prop.identification.date}</div>
                        <div className="text-[9px] text-[#D4AF37] font-bold mt-0.5">v{prop.version}.0</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-slate-800">{prop.identification.propertyName}</div>
                        <div className="text-[11px] text-slate-500">{prop.ownership.currentOwner || 'Owner Unspecified'}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-slate-700">{prop.identification.location}</div>
                        <div className="text-[10px] text-slate-400">
                          {prop.identification.district}, {prop.identification.state} | {prop.siteDetails.totalExtent}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                          {prop.identification.propertyType}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1">Facing: {prop.siteDetails.facing}</div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="font-extrabold text-[#1B2A4A]">{prop.salePricing.totalAskingPrice || 'N/A'}</div>
                        <div className="text-[10px] text-slate-400">{prop.salePricing.ratePerUnit}</div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                            prop.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prop.status === 'Draft'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {prop.status}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap text-right space-x-1">
                        <Link
                          href={`/properties/${prop.id}/pdf`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#FAF5E8] border border-[#D4AF37]/60 text-[#1B2A4A] text-[11px] font-extrabold hover:bg-[#F3E8C9] transition"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>PDF Studio</span>
                        </Link>

                        <Link
                          href={`/properties/${prop.id}/edit`}
                          className="inline-block p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                          title="Edit Property"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(prop.id)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 rounded hover:bg-slate-100"
                          title="Duplicate Property"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleArchive(prop.id, prop.status)}
                          className="p-1.5 text-slate-500 hover:text-purple-600 rounded hover:bg-slate-100"
                          title={prop.status === 'Archived' ? 'Unarchive' : 'Archive'}
                        >
                          <Archive className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded hover:bg-slate-100"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
