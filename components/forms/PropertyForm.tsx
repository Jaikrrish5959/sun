'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property, PropertyStatus } from '@/lib/types';
import { saveProperty } from '@/lib/storage';
import {
  FileText,
  MapPin,
  Compass,
  FileCheck,
  CircleDollarSign,
  Sparkles,
  ImageIcon,
  UserCheck,
  Save,
  FileClock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface PropertyFormProps {
  initialData?: Property;
  isEdit?: boolean;
}

const defaultNewProperty: Property = {
  id: '',
  status: 'Active',
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  identification: {
    refNo: `SUN-PR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toISOString().slice(0, 10),
    propertyName: '',
    location: '',
    village: '',
    taluk: '',
    district: '',
    state: 'Tamil Nadu',
    surveyNo: '',
    subDivisionNo: '',
    propertyType: 'Plot/Layout',
  },
  siteDetails: {
    totalExtent: '',
    areaForSale: '',
    landAreaUnit: 'Acres',
    facing: 'East',
    roadAccess: 'Yes',
    roadWidth: '30 feet',
    roadFrontage: '',
    plotDimensions: '',
    landLevel: 'On Road Level',
    currentUse: 'Vacant Plot',
    existingStructure: 'Vacant Land',
    boundaryWall: 'No',
    waterSource: 'Yes',
    electricitySupply: 'Yes',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
  },
  locationAccess: {
    googleMapsUrl: '',
    streetViewUrl: '',
    distMainRoad: '',
    distHighway: '',
    distNearestTown: '',
    distRailway: '',
    distAirport: '',
    distSchoolCollege: '',
    distHospital: '',
    otherLandmark: '',
  },
  ownership: {
    currentOwner: '',
    titleDeedStatus: 'Clear Title',
    parentDocs: 'Available',
    encumbranceCertificate: 'Up to Date',
    landTaxReceipt: 'Paid Up to Date',
    possessionCertificate: 'Available',
    surveySketch: 'Available',
    taxDetails: '',
    zoningClassification: 'Residential Zone',
    otherApprovals: '',
  },
  salePricing: {
    areaOffered: '',
    negotiable: 'Yes',
    ratePerUnit: '',
    totalAskingPrice: '',
    paymentTerms: '',
    advanceBookingAmount: '',
    expectedRegistrationDate: '',
  },
  features: {
    additionalHighlights: '',
  },
  sitePlan: {
    sitePlanImageUrl: '',
    notes: '',
  },
  contact: {
    companyName: 'SUN REALTORS',
    contactPerson: 'K. Sunder Raman',
    mobileWhatsApp: '+91 98400 12345',
    email: 'info@sunrealtors.in',
    officeAddress: 'No. 45, Sun Towers, Guindy, Chennai - 600032',
  },
};

const formTabs = [
  { id: 1, title: '01 Identification', icon: FileText },
  { id: 2, title: '02 Site Details', icon: MapPin },
  { id: 3, title: '03 Location & Access', icon: Compass },
  { id: 4, title: '04 Ownership & Docs', icon: FileCheck },
  { id: 5, title: '05 Sale & Pricing', icon: CircleDollarSign },
  { id: 6, title: '06 Highlights', icon: Sparkles },
  { id: 7, title: '07 Site Layout', icon: ImageIcon },
  { id: 8, title: '08 Realtor Contact', icon: UserCheck },
];

export const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEdit = false }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState<Property>(() => {
    if (initialData) return JSON.parse(JSON.stringify(initialData));
    return { ...defaultNewProperty, id: `prop-${Date.now()}` };
  });

  const [notification, setNotification] = useState<string | null>(null);

  const updateSection = <K extends keyof Property>(section: K, fields: Partial<Property[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        ...fields,
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection('sitePlan', { sitePlanImageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (status: PropertyStatus = 'Active', redirect = true) => {
    const propertyToSave = {
      ...formData,
      status,
    };
    const saved = saveProperty(propertyToSave);
    setNotification(`Property saved successfully (${status})!`);

    setTimeout(() => {
      setNotification(null);
      if (redirect) {
        router.push(`/properties/${saved.id}/pdf`);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {notification && (
        <div className="bg-emerald-500 text-white px-6 py-3 font-semibold text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-[#0F1E36] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-[#D4AF37] flex items-center gap-2">
            {isEdit ? `Edit Property: ${formData.identification.refNo}` : 'Create New Land Property Listing'}
          </h2>
          <p className="text-xs text-slate-400">Fill details mapping directly to the 2-Page A4 PDF Specification Sheet</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('Draft', false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition"
          >
            <FileClock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave('Active', true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-xs font-bold hover:brightness-105 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save & Generate PDF</span>
          </button>
        </div>
      </div>

      {/* Horizontal Tabs Bar */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto custom-scrollbar">
        {formTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-[#1B2A4A] text-[#1B2A4A] bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="p-8 space-y-6">
        {/* ================= TAB 1: IDENTIFICATION ================= */}
        {activeTab === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 01: Property Identification</span>
              <span className="text-xs font-normal text-slate-400">PDF Page 1 - Top Header & Identification Block</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Ref No *</label>
                <input
                  type="text"
                  value={formData.identification.refNo}
                  onChange={(e) => updateSection('identification', { refNo: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A] font-mono bg-slate-50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Listing Date</label>
                <input
                  type="date"
                  value={formData.identification.date}
                  onChange={(e) => updateSection('identification', { date: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Type *</label>
                <select
                  value={formData.identification.propertyType}
                  onChange={(e) =>
                    updateSection('identification', { propertyType: e.target.value as Property['identification']['propertyType'] })
                  }
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A] font-semibold"
                >
                  <option value="Plot/Layout">Plot / Layout</option>
                  <option value="Agricultural">Agricultural Farmland</option>
                  <option value="Commercial">Commercial Plot</option>
                  <option value="Residential">Residential Site</option>
                  <option value="Industrial">Industrial Land</option>
                  <option value="Mixed Use">Mixed Use</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Title / Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Green Acres Commercial Plot"
                  value={formData.identification.propertyName}
                  onChange={(e) => updateSection('identification', { propertyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / Address *</label>
                <input
                  type="text"
                  placeholder="e.g. NH-44 Bypass Road, Near Toll Plaza"
                  value={formData.identification.location}
                  onChange={(e) => updateSection('identification', { location: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Village</label>
                <input
                  type="text"
                  value={formData.identification.village}
                  onChange={(e) => updateSection('identification', { village: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Taluk</label>
                <input
                  type="text"
                  value={formData.identification.taluk}
                  onChange={(e) => updateSection('identification', { taluk: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  value={formData.identification.district}
                  onChange={(e) => updateSection('identification', { district: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.identification.state}
                  onChange={(e) => updateSection('identification', { state: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Survey Number</label>
                <input
                  type="text"
                  placeholder="e.g. 142/2B"
                  value={formData.identification.surveyNo}
                  onChange={(e) => updateSection('identification', { surveyNo: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sub-Division Number</label>
                <input
                  type="text"
                  placeholder="e.g. 3A"
                  value={formData.identification.subDivisionNo}
                  onChange={(e) => updateSection('identification', { subDivisionNo: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LAND & SITE DETAILS ================= */}
        {activeTab === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 02: Land & Site Specification</span>
              <span className="text-xs font-normal text-slate-400">Dimensions, Facing, Boundaries & Utilities</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Extent</label>
                <input
                  type="text"
                  placeholder="e.g. 2.5 Acres"
                  value={formData.siteDetails.totalExtent}
                  onChange={(e) => updateSection('siteDetails', { totalExtent: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area Available for Sale</label>
                <input
                  type="text"
                  placeholder="e.g. 2.5 Acres"
                  value={formData.siteDetails.areaForSale}
                  onChange={(e) => updateSection('siteDetails', { areaForSale: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area Measurement Unit</label>
                <select
                  value={formData.siteDetails.landAreaUnit}
                  onChange={(e) =>
                    updateSection('siteDetails', { landAreaUnit: e.target.value as Property['siteDetails']['landAreaUnit'] })
                  }
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Acres">Acres</option>
                  <option value="Cents">Cents</option>
                  <option value="Sq.Ft">Sq.Ft</option>
                  <option value="Guntha">Guntha</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facing Direction</label>
                <select
                  value={formData.siteDetails.facing}
                  onChange={(e) => updateSection('siteDetails', { facing: e.target.value as Property['siteDetails']['facing'] })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-semibold text-[#1B2A4A]"
                >
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
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Road Access</label>
                <select
                  value={formData.siteDetails.roadAccess}
                  onChange={(e) => updateSection('siteDetails', { roadAccess: e.target.value as 'Yes' | 'No' })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Road Width</label>
                <input
                  type="text"
                  placeholder="e.g. 40 feet"
                  value={formData.siteDetails.roadWidth}
                  onChange={(e) => updateSection('siteDetails', { roadWidth: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Road Frontage</label>
                <input
                  type="text"
                  placeholder="e.g. 120 feet"
                  value={formData.siteDetails.roadFrontage}
                  onChange={(e) => updateSection('siteDetails', { roadFrontage: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Plot Dimensions (L x W)</label>
                <input
                  type="text"
                  placeholder="e.g. 200 x 450 ft"
                  value={formData.siteDetails.plotDimensions}
                  onChange={(e) => updateSection('siteDetails', { plotDimensions: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Land Level</label>
                <select
                  value={formData.siteDetails.landLevel}
                  onChange={(e) => updateSection('siteDetails', { landLevel: e.target.value as Property['siteDetails']['landLevel'] })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="On Road Level">On Road Level</option>
                  <option value="Above Road Level">Above Road Level</option>
                  <option value="Below Road Level">Below Road Level</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Existing Structure</label>
                <select
                  value={formData.siteDetails.existingStructure}
                  onChange={(e) =>
                    updateSection('siteDetails', { existingStructure: e.target.value as Property['siteDetails']['existingStructure'] })
                  }
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Vacant Land">Vacant Land</option>
                  <option value="Building">Building</option>
                  <option value="Shed / Temporary Structure">Shed / Temporary Structure</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <h4 className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wide">Boundaries Detail (PDF Table Subsection)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">North Boundary</label>
                  <input
                    type="text"
                    placeholder="e.g. 60ft Main Road"
                    value={formData.siteDetails.northBoundary}
                    onChange={(e) => updateSection('siteDetails', { northBoundary: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">South Boundary</label>
                  <input
                    type="text"
                    placeholder="e.g. Private Property Survey 142/3"
                    value={formData.siteDetails.southBoundary}
                    onChange={(e) => updateSection('siteDetails', { southBoundary: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">East Boundary</label>
                  <input
                    type="text"
                    placeholder="e.g. Canal Stream"
                    value={formData.siteDetails.eastBoundary}
                    onChange={(e) => updateSection('siteDetails', { eastBoundary: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">West Boundary</label>
                  <input
                    type="text"
                    placeholder="e.g. 30ft Internal Passage"
                    value={formData.siteDetails.westBoundary}
                    onChange={(e) => updateSection('siteDetails', { westBoundary: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: LOCATION & ACCESS ================= */}
        {activeTab === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 03: Location & Accessibility Distances</span>
              <span className="text-xs font-normal text-slate-400">Proximity to Key Infrastructure</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={formData.locationAccess.googleMapsUrl}
                  onChange={(e) => updateSection('locationAccess', { googleMapsUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street View URL</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={formData.locationAccess.streetViewUrl}
                  onChange={(e) => updateSection('locationAccess', { streetViewUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Main Road</label>
                <input
                  type="text"
                  placeholder="e.g. 200 meters"
                  value={formData.locationAccess.distMainRoad}
                  onChange={(e) => updateSection('locationAccess', { distMainRoad: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Highway</label>
                <input
                  type="text"
                  placeholder="e.g. 1.5 km"
                  value={formData.locationAccess.distHighway}
                  onChange={(e) => updateSection('locationAccess', { distHighway: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Nearest Town</label>
                <input
                  type="text"
                  placeholder="e.g. 4 km"
                  value={formData.locationAccess.distNearestTown}
                  onChange={(e) => updateSection('locationAccess', { distNearestTown: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Railway Station</label>
                <input
                  type="text"
                  placeholder="e.g. 6 km"
                  value={formData.locationAccess.distRailway}
                  onChange={(e) => updateSection('locationAccess', { distRailway: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Airport</label>
                <input
                  type="text"
                  placeholder="e.g. 35 km"
                  value={formData.locationAccess.distAirport}
                  onChange={(e) => updateSection('locationAccess', { distAirport: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to School/College</label>
                <input
                  type="text"
                  placeholder="e.g. 1.2 km"
                  value={formData.locationAccess.distSchoolCollege}
                  onChange={(e) => updateSection('locationAccess', { distSchoolCollege: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dist to Hospital</label>
                <input
                  type="text"
                  placeholder="e.g. 2.0 km"
                  value={formData.locationAccess.distHospital}
                  onChange={(e) => updateSection('locationAccess', { distHospital: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Other Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Near Bus Stand"
                  value={formData.locationAccess.otherLandmark}
                  onChange={(e) => updateSection('locationAccess', { otherLandmark: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: OWNERSHIP & LEGAL ================= */}
        {activeTab === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 04: Ownership & Documentation Verification</span>
              <span className="text-xs font-normal text-slate-400">Legal Title Status and Certificate Checklist</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Owner Name(s) *</label>
                <input
                  type="text"
                  placeholder="e.g. M/s Sunder Infra Developers"
                  value={formData.ownership.currentOwner}
                  onChange={(e) => updateSection('ownership', { currentOwner: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title Deed Status</label>
                <select
                  value={formData.ownership.titleDeedStatus}
                  onChange={(e) =>
                    updateSection('ownership', { titleDeedStatus: e.target.value as Property['ownership']['titleDeedStatus'] })
                  }
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-bold text-emerald-700"
                >
                  <option value="Clear Title">Clear Title</option>
                  <option value="Encumbered">Encumbered</option>
                  <option value="Under Verification">Under Verification</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent Documents</label>
                <select
                  value={formData.ownership.parentDocs}
                  onChange={(e) => updateSection('ownership', { parentDocs: e.target.value as 'Available' | 'Not Available' })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Encumbrance Cert (EC)</label>
                <select
                  value={formData.ownership.encumbranceCertificate}
                  onChange={(e) =>
                    updateSection('ownership', { encumbranceCertificate: e.target.value as 'Up to Date' | 'Pending' })
                  }
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Up to Date">Up to Date</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Land Tax Receipt</label>
                <select
                  value={formData.ownership.landTaxReceipt}
                  onChange={(e) => updateSection('ownership', { landTaxReceipt: e.target.value as 'Paid Up to Date' | 'Pending' })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Paid Up to Date">Paid Up to Date</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Survey Sketch / FMB</label>
                <select
                  value={formData.ownership.surveySketch}
                  onChange={(e) => updateSection('ownership', { surveySketch: e.target.value as 'Available' | 'Not Available' })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tax Details / Assessment</label>
                <input
                  type="text"
                  placeholder="e.g. Paid up to March 2027"
                  value={formData.ownership.taxDetails}
                  onChange={(e) => updateSection('ownership', { taxDetails: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zoning / Land Classification</label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Heavy Zone (DTCP Approved)"
                  value={formData.ownership.zoningClassification}
                  onChange={(e) => updateSection('ownership', { zoningClassification: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Other Approvals / NOCs</label>
                <input
                  type="text"
                  placeholder="e.g. DTCP No. 144/2023, Fire NOC"
                  value={formData.ownership.otherApprovals}
                  onChange={(e) => updateSection('ownership', { otherApprovals: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SALE & PRICING ================= */}
        {activeTab === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 05: Sale / Pricing Commercial Terms</span>
              <span className="text-xs font-normal text-slate-400">PDF Page 2 - Top Pricing Section</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area Offered for Sale</label>
                <input
                  type="text"
                  placeholder="e.g. 2.5 Acres"
                  value={formData.salePricing.areaOffered}
                  onChange={(e) => updateSection('salePricing', { areaOffered: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price Negotiable</label>
                <select
                  value={formData.salePricing.negotiable}
                  onChange={(e) => updateSection('salePricing', { negotiable: e.target.value as 'Yes' | 'No' })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rate per Unit</label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 1,850 per Sq.Ft"
                  value={formData.salePricing.ratePerUnit}
                  onChange={(e) => updateSection('salePricing', { ratePerUnit: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Asking Price (₹) *</label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 20,14,65,000"
                  value={formData.salePricing.totalAskingPrice}
                  onChange={(e) => updateSection('salePricing', { totalAskingPrice: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-extrabold text-[#1B2A4A] border rounded-md border-[#D4AF37] bg-[#FAF5E8]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Advance / Booking Amount</label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 40,00,000"
                  value={formData.salePricing.advanceBookingAmount}
                  onChange={(e) => updateSection('salePricing', { advanceBookingAmount: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Registration Date</label>
                <input
                  type="date"
                  value={formData.salePricing.expectedRegistrationDate}
                  onChange={(e) => updateSection('salePricing', { expectedRegistrationDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Terms & Schedule</label>
              <textarea
                rows={2}
                placeholder="e.g. 20% Booking Advance, Balance on Registration within 45 Days"
                value={formData.salePricing.paymentTerms}
                onChange={(e) => updateSection('salePricing', { paymentTerms: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 6: HIGHLIGHTS ================= */}
        {activeTab === 6 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 06: Property Features & Additional Highlights</span>
              <span className="text-xs font-normal text-slate-400">PDF Page 2 - Free Text Notes Block</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes / Remarks / Key Selling Points</label>
              <textarea
                rows={6}
                placeholder="Describe key highlights, surrounding developments, investment potential, zoning advantages, corner property benefits..."
                value={formData.features.additionalHighlights}
                onChange={(e) => updateSection('features', { additionalHighlights: e.target.value })}
                className="w-full px-4 py-3 text-xs border rounded-lg border-slate-300 focus:ring-2 focus:ring-[#1B2A4A] leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">This text will be rendered inside Section 06 box on Page 2 of the PDF template.</p>
            </div>
          </div>
        )}

        {/* ================= TAB 7: SITE LAYOUT IMAGE ================= */}
        {activeTab === 7 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 07: Site Plan / Plot Layout Image</span>
              <span className="text-xs font-normal text-slate-400">PDF Page 2 - Image Embed Placeholder</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Layout Blueprint / Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1B2A4A] file:text-white hover:file:bg-[#0F1E36]"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blueprint Notes / Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. DTCP Approved Plot Layout Plan attached"
                    value={formData.sitePlan.notes}
                    onChange={(e) => updateSection('sitePlan', { notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
                {formData.sitePlan.sitePlanImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formData.sitePlan.sitePlanImageUrl}
                    alt="Site Plan Preview"
                    className="max-h-40 object-contain rounded border border-slate-200"
                  />
                ) : (
                  <div className="text-center text-slate-400 space-y-1">
                    <ImageIcon className="w-8 h-8 mx-auto stroke-1" />
                    <p className="text-xs font-medium">No layout image uploaded yet</p>
                    <p className="text-[10px]">Survey plan placeholder will be shown on PDF</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: CONTACT DETAILS ================= */}
        {activeTab === 8 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1B2A4A] border-b pb-2 flex items-center justify-between">
              <span>Section 08: Authorized Realtor Contact Details</span>
              <span className="text-xs font-normal text-slate-400">PDF Page 2 - Footer Contact Block</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Agency Name</label>
                <input
                  type="text"
                  value={formData.contact.companyName}
                  onChange={(e) => updateSection('contact', { companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300 font-bold text-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person / Agent Name *</label>
                <input
                  type="text"
                  value={formData.contact.contactPerson}
                  onChange={(e) => updateSection('contact', { contactPerson: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="text"
                  value={formData.contact.mobileWhatsApp}
                  onChange={(e) => updateSection('contact', { mobileWhatsApp: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => updateSection('contact', { email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
              <textarea
                rows={2}
                value={formData.contact.officeAddress}
                onChange={(e) => updateSection('contact', { officeAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-md border-slate-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer Controls */}
      <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-between">
        <button
          type="button"
          disabled={activeTab === 1}
          onClick={() => setActiveTab((prev) => Math.max(1, prev - 1))}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Section</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Step {activeTab} of 8</span>
        </div>

        {activeTab < 8 ? (
          <button
            type="button"
            onClick={() => setActiveTab((prev) => Math.min(8, prev + 1))}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#1B2A4A] text-white text-xs font-semibold hover:bg-[#0F1E36] transition shadow-xs"
          >
            <span>Next Section</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSave('Active', true)}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89320] text-[#0F1E36] text-xs font-bold hover:brightness-105 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Finish & Generate PDF</span>
          </button>
        )}
      </div>
    </div>
  );
};
