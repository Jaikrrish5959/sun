'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PropertyForm } from '@/components/forms/PropertyForm';
import { getPropertyById } from '@/lib/storage';
import { Property } from '@/lib/types';
import { AlertCircle } from 'lucide-react';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const data = getPropertyById(resolvedParams.id);
    if (data) {
      setProperty(data);
    }
  }, [resolvedParams.id]);

  if (!property) {
    return (
      <div className="animate-fade-in">
        <Header title="Edit Property" />
        <div className="p-12 max-w-xl mx-auto text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Property Not Found</h3>
          <p className="text-xs text-slate-500">The requested property ID could not be located in storage.</p>
          <button
            onClick={() => router.push('/properties')}
            className="px-5 py-2.5 bg-[#090E22] text-white text-xs font-bold rounded-xl"
          >
            Back to Properties Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      <Header
        title={`Edit Property: ${property.identification.refNo}`}
        subtitle={`Updating property details for ${property.identification.propertyName}`}
      />

      <div className="p-6 md:p-8 lg:p-10">
        <PropertyForm initialData={property} isEdit={true} />
      </div>
    </div>
  );
}
