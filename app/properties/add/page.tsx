'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { PropertyForm } from '@/components/forms/PropertyForm';

export default function AddPropertyPage() {
  return (
    <div>
      <Header title="Add New Property" subtitle="Enter property details to generate an authoritative Land Property Details Sheet" />

      <div className="p-8 max-w-7xl mx-auto">
        <PropertyForm />
      </div>
    </div>
  );
}
