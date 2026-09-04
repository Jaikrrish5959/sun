export interface PropertyIdentification {
  refNo: string;
  date: string;
  propertyName: string;
  location: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  surveyNo: string;
  subDivisionNo: string;
  propertyType: 'Agricultural' | 'Commercial' | 'Residential' | 'Industrial' | 'Mixed Use' | 'Plot/Layout';
}

export interface LandSiteDetails {
  totalExtent: string;
  areaForSale: string;
  landAreaUnit: 'Acres' | 'Cents' | 'Sq.Ft' | 'Guntha';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  roadAccess: 'Yes' | 'No';
  roadWidth: string;
  roadFrontage: string;
  plotDimensions: string;
  landLevel: 'On Road Level' | 'Above Road Level' | 'Below Road Level';
  currentUse: string;
  existingStructure: 'Vacant Land' | 'Building' | 'Shed / Temporary Structure' | 'Under Construction';
  boundaryWall: 'Yes' | 'No';
  waterSource: 'Yes' | 'No';
  electricitySupply: 'Yes' | 'No';
  northBoundary: string;
  southBoundary: string;
  eastBoundary: string;
  westBoundary: string;
}

export interface LocationAccess {
  googleMapsUrl: string;
  streetViewUrl: string;
  distMainRoad: string;
  distHighway: string;
  distNearestTown: string;
  distRailway: string;
  distAirport: string;
  distSchoolCollege: string;
  distHospital: string;
  otherLandmark: string;
}

export interface OwnershipDocumentation {
  currentOwner: string;
  titleDeedStatus: 'Clear Title' | 'Encumbered' | 'Under Verification';
  parentDocs: 'Available' | 'Not Available';
  encumbranceCertificate: 'Up to Date' | 'Pending';
  landTaxReceipt: 'Paid Up to Date' | 'Pending';
  possessionCertificate: 'Available' | 'Not Available';
  surveySketch: 'Available' | 'Not Available';
  taxDetails: string;
  zoningClassification: string;
  otherApprovals: string;
}

export interface SalePricingDetails {
  areaOffered: string;
  negotiable: 'Yes' | 'No';
  ratePerUnit: string;
  totalAskingPrice: string;
  paymentTerms: string;
  advanceBookingAmount: string;
  expectedRegistrationDate: string;
}

export interface PropertyFeatures {
  additionalHighlights: string;
}

export interface SitePlanDetails {
  sitePlanImageUrl: string;
  notes: string;
}

export interface ContactDetails {
  companyName: string;
  contactPerson: string;
  mobileWhatsApp: string;
  email: string;
  officeAddress: string;
}

export type PropertyStatus = 'Active' | 'Draft' | 'Archived';

export interface Property {
  id: string; // Unique UUID/Property ID
  status: PropertyStatus;
  version: number;
  createdAt: string;
  updatedAt: string;

  // 8 Template Sections
  identification: PropertyIdentification;
  siteDetails: LandSiteDetails;
  locationAccess: LocationAccess;
  ownership: OwnershipDocumentation;
  salePricing: SalePricingDetails;
  features: PropertyFeatures;
  sitePlan: SitePlanDetails;
  contact: ContactDetails;
}

export interface PDFHistoryRecord {
  id: string;
  propertyId: string;
  propertyRefNo: string;
  propertyName: string;
  generatedAt: string;
  version: number;
  pdfUrl?: string;
  dataSnapshot: Property;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  regNumber: string;
  logoUrl: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  cityStateZip: string;
  disclaimerText: string;
  themePrimaryColor: string;
  themeAccentColor: string;
}

export interface PropertyFilterOptions {
  searchQuery: string;
  status: string;
  propertyType: string;
  district: string;
  facing: string;
  minPrice: string;
  maxPrice: string;
}
