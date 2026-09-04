'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Property, PropertyStatus } from '@/lib/types';
import { saveProperty, getStoredCompanySettings } from '@/lib/storage';
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
  Eye,
  RefreshCw,
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
  { id: 1, label: '01 Identification', short: 'Identification', num: '01', icon: FileText },
  { id: 2, label: '02 Site Details', short: 'Site Details', num: '02', icon: MapPin },
  { id: 3, label: '03 Location & Access', short: 'Location', num: '03', icon: Compass },
  { id: 4, label: '04 Ownership & Docs', short: 'Documents', num: '04', icon: FileCheck },
  { id: 5, label: '05 Sale & Pricing', short: 'Pricing', num: '05', icon: CircleDollarSign },
  { id: 6, label: '06 Highlights', short: 'Highlights', num: '06', icon: Sparkles },
  { id: 7, label: '07 Site Layout', short: 'Layout', num: '07', icon: ImageIcon },
  { id: 8, label: '08 Realtor Contact', short: 'Contact', num: '08', icon: UserCheck },
];

export const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEdit = false }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const [formData, setFormData] = useState<Property>(() => {
    if (initialData) return JSON.parse(JSON.stringify(initialData));
    return { ...defaultNewProperty, id: `prop-${Date.now()}` };
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isRenderingPDF, setIsRenderingPDF] = useState(false);

  // Trigger real-time live PDF preview blob generation
  const renderLivePDF = async (data: Property) => {
    setIsRenderingPDF(true);
    try {
      const companySettings = getStoredCompanySettings();
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: data,
          companySettings,
          download: false,
        }),
      });

      if (!response.ok) throw new Error('PDF Generation Error');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
    } catch (err) {
      console.error('Failed to generate live PDF preview:', err);
    } finally {
      setIsRenderingPDF(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      renderLivePDF(formData);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [formData]);

  const updateSection = <K extends keyof Property>(section: K, fields: Partial<Property[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        ...fields,
      },
    }));
  };

  const handleStepChange = (tabId: number) => {
    setActiveTab(tabId);
    if (!completedSteps.includes(tabId)) {
      setCompletedSteps((prev) => [...prev, tabId]);
    }
  };

  const handleNext = () => {
    const nextTab = Math.min(8, activeTab + 1);
    setActiveTab(nextTab);
    if (!completedSteps.includes(nextTab)) {
      setCompletedSteps((prev) => [...prev, nextTab]);
    }
  };

  const handlePrev = () => {
    setActiveTab((prev) => Math.max(1, prev - 1));
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
    <div className="space-y-6 max-w-[1440px] mx-auto">
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#090E22] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#F0A500] flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#F0A500]" />
          <span className="text-xs font-extrabold">{notification}</span>
        </div>
      )}

      {/* ─── Top Action Bar & Status Pill (Cleaned layout - NO duplicate title) ─── */}
      <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold text-[#0F172A] bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Ref: <span className="text-[#F0A500] font-mono">{formData.identification.refNo}</span>
          </span>
          <span className="text-xs text-slate-500 font-semibold hidden md:inline">
            Status: <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">Live Editing</span>
          </span>
        </div>

        {/* Action Buttons: Save Draft | Preview PDF | Save & Generate PDF */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => handleSave('Draft', false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-bold transition"
          >
            <FileClock className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => renderLivePDF(formData)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF8E6] border border-amber-300 text-[#1A2455] hover:bg-[#FFF0CC] text-xs font-bold transition"
          >
            <Eye className="w-4 h-4 text-[#F0A500]" />
            <span>Refresh Preview</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave('Active', true)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl btn-gold text-xs font-extrabold transition shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save & Generate PDF</span>
          </button>
        </div>
      </div>

      {/* ─── Modern Step Navigation Pills with Perfectly Aligned Badges ─── */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto custom-scrollbar pb-1">
          {formTabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const isCompleted = completedSteps.includes(tab.id) && !isActive;

            return (
              <React.Fragment key={tab.id}>
                <button
                  type="button"
                  onClick={() => handleStepChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[#090E22] text-[#FFC641] shadow-xs border border-slate-800'
                      : isCompleted
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black leading-none ${
                        isActive
                          ? 'bg-[#F0A500] text-[#090E22]'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.num}
                    </span>
                  )}
                  <span>{tab.short}</span>
                </button>

                {idx < formTabs.length - 1 && (
                  <span className="text-slate-300 font-bold text-xs hidden lg:inline flex-shrink-0">›</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ─── Split 2-Column Workspace Grid (Left 58% Form, Right 42% Live PDF Preview) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Editor (58% width) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 md:p-8 flex flex-col justify-between min-h-[750px]">
          <div>
            {/* Step Section Header */}
            <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F0A500]">
                  STEP 0{activeTab} OF 08
                </span>
                <h3 className="text-base font-black text-[#0F172A] mt-0.5">
                  {formTabs.find((t) => t.id === activeTab)?.label}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                Section 0{activeTab}
              </span>
            </div>

            {/* TAB 1: IDENTIFICATION */}
            {activeTab === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Property Ref No *
                    </label>
                    <input
                      type="text"
                      value={formData.identification.refNo}
                      onChange={(e) => updateSection('identification', { refNo: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-mono font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Listing Date
                    </label>
                    <input
                      type="date"
                      value={formData.identification.date}
                      onChange={(e) => updateSection('identification', { date: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={formData.identification.propertyType}
                    onChange={(e) =>
                      updateSection('identification', {
                        propertyType: e.target.value as Property['identification']['propertyType'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                  >
                    <option value="Plot/Layout">Plot / Layout</option>
                    <option value="Agricultural">Agricultural Farmland</option>
                    <option value="Commercial">Commercial Plot</option>
                    <option value="Residential">Residential Site</option>
                    <option value="Industrial">Industrial Land</option>
                    <option value="Mixed Use">Mixed Use</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Property Title / Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Green Acres Commercial Plot"
                    value={formData.identification.propertyName}
                    onChange={(e) => updateSection('identification', { propertyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Location / Address *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NH-44 Bypass Road, Hosur"
                    value={formData.identification.location}
                    onChange={(e) => updateSection('identification', { location: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Village / Taluk
                    </label>
                    <input
                      type="text"
                      placeholder="Village & Taluk"
                      value={formData.identification.village}
                      onChange={(e) => updateSection('identification', { village: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      District / State
                    </label>
                    <input
                      type="text"
                      placeholder="District"
                      value={formData.identification.district}
                      onChange={(e) => updateSection('identification', { district: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Survey No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 142/2B"
                      value={formData.identification.surveyNo}
                      onChange={(e) => updateSection('identification', { surveyNo: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Sub-Division No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3A"
                      value={formData.identification.subDivisionNo}
                      onChange={(e) => updateSection('identification', { subDivisionNo: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SITE DETAILS */}
            {activeTab === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Total Extent
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2.5 Acres (108,900 Sq.Ft)"
                      value={formData.siteDetails.totalExtent}
                      onChange={(e) => updateSection('siteDetails', { totalExtent: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Facing Direction
                    </label>
                    <select
                      value={formData.siteDetails.facing}
                      onChange={(e) =>
                        updateSection('siteDetails', {
                          facing: e.target.value as Property['siteDetails']['facing'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Road Width
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 60 feet"
                      value={formData.siteDetails.roadWidth}
                      onChange={(e) => updateSection('siteDetails', { roadWidth: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Land Level
                    </label>
                    <select
                      value={formData.siteDetails.landLevel}
                      onChange={(e) =>
                        updateSection('siteDetails', {
                          landLevel: e.target.value as Property['siteDetails']['landLevel'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    >
                      <option value="On Road Level">On Road Level</option>
                      <option value="Above Road Level">Above Road Level</option>
                      <option value="Below Road Level">Below Road Level</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    SITE BOUNDARIES
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="North Boundary"
                      value={formData.siteDetails.northBoundary}
                      onChange={(e) => updateSection('siteDetails', { northBoundary: e.target.value })}
                      className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white"
                    />
                    <input
                      type="text"
                      placeholder="South Boundary"
                      value={formData.siteDetails.southBoundary}
                      onChange={(e) => updateSection('siteDetails', { southBoundary: e.target.value })}
                      className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white"
                    />
                    <input
                      type="text"
                      placeholder="East Boundary"
                      value={formData.siteDetails.eastBoundary}
                      onChange={(e) => updateSection('siteDetails', { eastBoundary: e.target.value })}
                      className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white"
                    />
                    <input
                      type="text"
                      placeholder="West Boundary"
                      value={formData.siteDetails.westBoundary}
                      onChange={(e) => updateSection('siteDetails', { westBoundary: e.target.value })}
                      className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LOCATION & ACCESS */}
            {activeTab === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Dist to Main Road
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Directly on Service Road"
                      value={formData.locationAccess.distMainRoad}
                      onChange={(e) => updateSection('locationAccess', { distMainRoad: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Dist to Highway
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0.1 km (NH-44)"
                      value={formData.locationAccess.distHighway}
                      onChange={(e) => updateSection('locationAccess', { distHighway: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Nearest Railway
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4.0 km (Hosur Station)"
                      value={formData.locationAccess.distRailway}
                      onChange={(e) => updateSection('locationAccess', { distRailway: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Airport Access
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 45 km (Bengaluru Int Airport)"
                      value={formData.locationAccess.distAirport}
                      onChange={(e) => updateSection('locationAccess', { distAirport: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={formData.locationAccess.googleMapsUrl}
                    onChange={(e) => updateSection('locationAccess', { googleMapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: OWNERSHIP & LEGAL */}
            {activeTab === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Current Owner Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M/s Sunder Infra Developers Pvt Ltd"
                    value={formData.ownership.currentOwner}
                    onChange={(e) => updateSection('ownership', { currentOwner: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Title Deed Status
                    </label>
                    <select
                      value={formData.ownership.titleDeedStatus}
                      onChange={(e) =>
                        updateSection('ownership', {
                          titleDeedStatus: e.target.value as Property['ownership']['titleDeedStatus'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    >
                      <option value="Clear Title">Clear Title</option>
                      <option value="Encumbered">Encumbered</option>
                      <option value="Under Verification">Under Verification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Zoning Classification
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial Heavy Zone"
                      value={formData.ownership.zoningClassification}
                      onChange={(e) => updateSection('ownership', { zoningClassification: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PRICING */}
            {activeTab === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Total Asking Price (₹) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 20,14,65,000"
                    value={formData.salePricing.totalAskingPrice}
                    onChange={(e) => updateSection('salePricing', { totalAskingPrice: e.target.value })}
                    className="w-full px-4 py-3 text-sm font-black border-2 border-[#F0A500] bg-[#FFF8E6] text-[#0F172A] rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Rate per Unit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 1,850 per Sq.Ft"
                      value={formData.salePricing.ratePerUnit}
                      onChange={(e) => updateSection('salePricing', { ratePerUnit: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Price Negotiable
                    </label>
                    <select
                      value={formData.salePricing.negotiable}
                      onChange={(e) =>
                        updateSection('salePricing', { negotiable: e.target.value as 'Yes' | 'No' })
                      }
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: HIGHLIGHTS */}
            {activeTab === 6 && (
              <div className="space-y-4 animate-fade-in">
                <label className="block text-xs font-bold uppercase text-slate-600">
                  Key Highlights & Selling Points
                </label>
                <textarea
                  rows={6}
                  placeholder="Prime Highway frontage with 80ft main road access. Ideal for Commercial Complex, Logistics Hub, Auto Showroom..."
                  value={formData.features.additionalHighlights}
                  onChange={(e) => updateSection('features', { additionalHighlights: e.target.value })}
                  className="w-full px-4 py-3 text-xs font-medium border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white text-[#0F172A] leading-relaxed"
                />
              </div>
            )}

            {/* TAB 7: SITE LAYOUT */}
            {activeTab === 7 && (
              <div className="space-y-4 animate-fade-in">
                <label className="block text-xs font-bold uppercase text-slate-600">
                  Site Layout Blueprint / Image Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. DTCP Approved Plot Layout Plan attached"
                  value={formData.sitePlan.notes}
                  onChange={(e) => updateSection('sitePlan', { notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                />
              </div>
            )}

            {/* TAB 8: CONTACT */}
            {activeTab === 8 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contact.contactPerson}
                      onChange={(e) => updateSection('contact', { contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.contact.mobileWhatsApp}
                      onChange={(e) => updateSection('contact', { mobileWhatsApp: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Step Navigation Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
            <button
              type="button"
              disabled={activeTab === 1}
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-400 font-extrabold">
              Step {activeTab} of 8
            </span>

            {activeTab < 8 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 rounded-xl btn-navy text-xs font-extrabold transition shadow-xs"
              >
                <span>Next Section</span>
                <ArrowRight className="w-4 h-4 text-[#F0A500]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSave('Active', true)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl btn-gold text-xs font-extrabold transition shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Finish & Generate PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Real-time Live PDF Preview (42% width) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[750px] sticky top-24">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0A500] pulse-dot" />
              <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                LIVE PDF PREVIEW (2-PAGE A4)
              </span>
            </div>
            {isRenderingPDF && (
              <span className="text-[10px] font-bold text-amber-600 animate-pulse flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Rendering...
              </span>
            )}
          </div>

          <div className="flex-1 bg-[#1E2028] p-3 flex items-center justify-center relative">
            {pdfBlobUrl ? (
              <iframe
                src={pdfBlobUrl}
                className="w-full h-full rounded-2xl border-0 shadow-2xl"
                title="Property Live PDF Specification Sheet Preview"
              />
            ) : (
              <div className="text-white text-xs flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#FFC641]" />
                <span className="font-bold">Building live PDF document...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
