'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getStoredProperties } from '@/lib/storage';
import { Property, PropertyFilterOptions } from '@/lib/types';
import { Search, Filter, Building2, Download, ArrowRight, RotateCcw } from 'lucide-react';

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilterOptions>({
    searchQuery: '',
    status: 'All',
    propertyType: 'All',
    district: 'All',
    facing: 'All',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    setProperties(getStoredProperties());
  }, []);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      status: 'All',
      propertyType: 'All',
      district: 'All',
      facing: 'All',
      minPrice: '',
      maxPrice: '',
    });
  };

  const filteredProperties = properties.filter((p) => {
    const q = filters.searchQuery.toLowerCase();
    const matchesQuery =
      q === '' ||
      p.identification.refNo.toLowerCase().includes(q) ||
      p.identification.propertyName.toLowerCase().includes(q) ||
      p.identification.location.toLowerCase().includes(q) ||
      p.identification.village.toLowerCase().includes(q) ||
      p.identification.taluk.toLowerCase().includes(q) ||
      p.identification.district.toLowerCase().includes(q) ||
      p.ownership.currentOwner.toLowerCase().includes(q);

    const matchesStatus = filters.status === 'All' || p.status === filters.status;
    const matchesType = filters.propertyType === 'All' || p.identification.propertyType === filters.propertyType;
    const matchesFacing = filters.facing === 'All' || p.siteDetails.facing === filters.facing;
    const matchesDistrict = filters.district === 'All' || p.identification.district === filters.district;

    return matchesQuery && matchesStatus && matchesType && matchesFacing && matchesDistrict;
  });

  return (
    <div>
      <Header title="Advanced Search & Filters" subtitle="Filter land properties by survey number, district, facing, price range and legal status" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        {/* Filters Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              Multi-Field Property Filter Engine
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-[#1B2A4A] font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Keyword Search</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Ref No, Title, Owner, Location, Survey No..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg border-slate-300 bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg border-slate-300 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Plot/Layout">Plot/Layout</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facing Direction</label>
              <select
                value={filters.facing}
                onChange={(e) => setFilters({ ...filters, facing: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg border-slate-300 bg-white"
              >
                <option value="All">All Facing Directions</option>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="West">West</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Search Results ({filteredProperties.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProperties.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-[#D4AF37]/50 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1B2A4A]">{p.identification.refNo}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{p.identification.propertyName}</h4>
                    <p className="text-xs text-slate-500">{p.identification.location}</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      p.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Extent:</span>
                    <span className="font-semibold text-slate-700">{p.siteDetails.totalExtent || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Facing:</span>
                    <span className="font-semibold text-slate-700">{p.siteDetails.facing}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Asking Price:</span>
                    <span className="font-extrabold text-[#1B2A4A]">{p.salePricing.totalAskingPrice || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Title Deed:</span>
                    <span className="font-semibold text-emerald-700">{p.ownership.titleDeedStatus}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Owner: {p.ownership.currentOwner || 'Unspecified'}</span>
                  <Link
                    href={`/properties/${p.id}/pdf`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5E8] border border-[#D4AF37]/50 text-[#1B2A4A] text-xs font-bold hover:bg-[#F3E8C9] transition"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Generate PDF</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
