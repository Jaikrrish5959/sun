import { defaultCompanySettings, sampleProperties } from './defaultData';
import { CompanySettings, PDFHistoryRecord, Property } from './types';

const PROPERTIES_KEY = 'sun_realtors_properties';
const SETTINGS_KEY = 'sun_realtors_company_settings';
const PDF_HISTORY_KEY = 'sun_realtors_pdf_history';

// --- Properties CRUD ---

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') return sampleProperties;
  try {
    const raw = localStorage.getItem(PROPERTIES_KEY);
    if (!raw) {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(sampleProperties));
      return sampleProperties;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading properties from localStorage:', err);
    return sampleProperties;
  }
}

export function saveStoredProperties(properties: Property[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  } catch (err) {
    console.error('Error writing properties to localStorage:', err);
  }
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getStoredProperties();
  return properties.find((p) => p.id === id);
}

export function saveProperty(property: Property): Property {
  const properties = getStoredProperties();
  const index = properties.findIndex((p) => p.id === property.id);

  const updatedProperty: Property = {
    ...property,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    // Updating existing
    updatedProperty.version = (properties[index].version || 1) + 1;
    properties[index] = updatedProperty;
  } else {
    // New property
    properties.unshift(updatedProperty);
  }

  saveStoredProperties(properties);
  return updatedProperty;
}

export function deleteProperty(id: string): void {
  const properties = getStoredProperties();
  const filtered = properties.filter((p) => p.id !== id);
  saveStoredProperties(filtered);
}

export function duplicateProperty(id: string): Property | undefined {
  const source = getPropertyById(id);
  if (!source) return undefined;

  const now = new Date();
  const yearStr = now.getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);

  const duplicated: Property = {
    ...JSON.parse(JSON.stringify(source)),
    id: `prop-${Date.now()}`,
    status: 'Draft',
    version: 1,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    identification: {
      ...source.identification,
      refNo: `SUN-PR-${yearStr}-${randomNum}`,
      propertyName: `${source.identification.propertyName} (Copy)`,
    },
  };

  saveProperty(duplicated);
  return duplicated;
}

export function updatePropertyStatus(id: string, status: Property['status']): Property | undefined {
  const prop = getPropertyById(id);
  if (!prop) return undefined;
  prop.status = status;
  return saveProperty(prop);
}

// --- Company Settings ---

export function getStoredCompanySettings(): CompanySettings {
  if (typeof window === 'undefined') return defaultCompanySettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultCompanySettings));
      return defaultCompanySettings;
    }
    return { ...defaultCompanySettings, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading company settings from localStorage:', err);
    return defaultCompanySettings;
  }
}

export function saveCompanySettings(settings: CompanySettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving company settings to localStorage:', err);
  }
}

// --- PDF History ---

export function getPDFHistory(): PDFHistoryRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PDF_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading PDF history:', err);
    return [];
  }
}

export function recordPDFGeneration(property: Property): PDFHistoryRecord {
  const history = getPDFHistory();
  const newRecord: PDFHistoryRecord = {
    id: `pdf-hist-${Date.now()}`,
    propertyId: property.id,
    propertyRefNo: property.identification.refNo,
    propertyName: property.identification.propertyName,
    generatedAt: new Date().toISOString(),
    version: property.version,
    dataSnapshot: JSON.parse(JSON.stringify(property)),
  };

  history.unshift(newRecord);
  if (typeof window !== 'undefined') {
    localStorage.setItem(PDF_HISTORY_KEY, JSON.stringify(history));
  }
  return newRecord;
}
