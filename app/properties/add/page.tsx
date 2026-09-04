'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { PropertyForm } from '@/components/forms/PropertyForm';

export default function AddPropertyPage() {
  return (
    <div className="animate-fade-in pb-12">
      <Header
        title="Add New Property"
        subtitle="Enter property details to generate the Land Property Details Sheet"
      />

      <div className="p-6 md:p-8 lg:p-10">
        <PropertyForm />
      </div>
    </div>
  );
}
