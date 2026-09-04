/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Property, CompanySettings } from '@/lib/types';

// Color Palette matching SUN REALTORS visual identity
const NAVY = '#1B2A4A';
const GOLD = '#D4AF37';
const LIGHT_GOLD = '#FAF5E8';
const DARK_NAVY = '#0F1E36';
const LIGHT_BG = '#F8FAFC';
const LABEL_BG = '#F1F5F9';
const BORDER_COLOR = '#CBD5E1';
const TEXT_MAIN = '#1E293B';
const TEXT_MUTED = '#64748B';

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 28,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: TEXT_MAIN,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogoBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: NAVY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: GOLD,
  },
  logoSunCenter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: GOLD,
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    letterSpacing: 1,
  },
  companyTagline: {
    fontSize: 7.5,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  docTitleBand: {
    backgroundColor: NAVY,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 3,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docTitleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  docSubtitleText: {
    color: GOLD,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: LIGHT_BG,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderLeftWidth: 4,
    borderLeftColor: GOLD,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  sectionBadge: {
    backgroundColor: NAVY,
    color: GOLD,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 2,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_COLOR,
    minHeight: 18,
    alignItems: 'center',
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 18,
    alignItems: 'center',
  },
  colLabel25: {
    width: '25%',
    backgroundColor: LABEL_BG,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK_NAVY,
    borderRightWidth: 0.5,
    borderRightColor: BORDER_COLOR,
  },
  colVal25: {
    width: '25%',
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    color: TEXT_MAIN,
    borderRightWidth: 0.5,
    borderRightColor: BORDER_COLOR,
  },
  colLabel20: {
    width: '20%',
    backgroundColor: LABEL_BG,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK_NAVY,
    borderRightWidth: 0.5,
    borderRightColor: BORDER_COLOR,
  },
  colVal30: {
    width: '30%',
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    color: TEXT_MAIN,
    borderRightWidth: 0.5,
    borderRightColor: BORDER_COLOR,
  },
  colFullVal: {
    width: '75%',
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    color: TEXT_MAIN,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 2,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxBox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: NAVY,
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: NAVY,
  },
  checkboxCheckMark: {
    color: '#FFFFFF',
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
  },
  checkboxLabel: {
    fontSize: 7.5,
    color: TEXT_MAIN,
  },
  boundaryTitle: {
    backgroundColor: NAVY,
    color: '#FFFFFF',
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    textTransform: 'uppercase',
  },
  sitePlanBox: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    height: 140,
    backgroundColor: LIGHT_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    padding: 4,
  },
  sitePlanImage: {
    maxHeight: 130,
    maxWidth: '95%',
    objectFit: 'contain',
  },
  placeholderText: {
    fontSize: 9,
    color: TEXT_MUTED,
    fontFamily: 'Helvetica-Oblique',
  },
  featuresBox: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: LIGHT_GOLD,
    padding: 6,
    fontSize: 8,
    minHeight: 45,
    marginBottom: 6,
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: GOLD,
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 6.5,
    color: TEXT_MUTED,
  },
  disclaimerBox: {
    borderWidth: 0.5,
    borderColor: BORDER_COLOR,
    backgroundColor: '#F8FAFC',
    padding: 5,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 2,
  },
  disclaimerTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginBottom: 2,
  },
  disclaimerContent: {
    fontSize: 6.5,
    color: TEXT_MUTED,
    lineHeight: 1.3,
  },
  pageNumber: {
    fontSize: 7,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
  },
});

interface Props {
  property: Property;
  companySettings?: CompanySettings;
}

const CheckItem = ({ label, selected }: { label: string; selected: boolean }) => (
  <View style={styles.checkboxItem}>
    <View style={[styles.checkboxBox, selected ? styles.checkboxChecked : {}]}>
      {selected && <Text style={styles.checkboxCheckMark}>✓</Text>}
    </View>
    <Text style={[styles.checkboxLabel, selected ? { fontFamily: 'Helvetica-Bold', color: NAVY } : {}]}>{label}</Text>
  </View>
);

export const PropertyPDFDocument: React.FC<Props> = ({ property, companySettings }) => {
  const p = property;
  const comp = companySettings || {
    companyName: 'SUN REALTORS',
    tagline: 'Trusted Real Estate & Property Consultants',
    contactPerson: 'K. Sunder Raman',
    phone: '+91 98400 12345',
    email: 'info@sunrealtors.in',
    address: 'No. 45, Sun Towers, Guindy, Chennai - 600032',
    disclaimerText:
      'Disclaimer: The details provided herein are based on information furnished by property owners and site verification. Buyers are advised to independently verify documents before transactions.',
  };

  return (
    <Document title={`${p.identification.refNo} - Land Property Details Sheet`}>
      {/* ================= PAGE 1 ================= */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoBox}>
              <View style={styles.logoSunCenter} />
            </View>
            <View>
              <Text style={styles.companyName}>{comp.companyName}</Text>
              <Text style={styles.companyTagline}>{comp.tagline}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 7.5, color: TEXT_MUTED }}>REF NO: {p.identification.refNo}</Text>
            <Text style={{ fontSize: 7.5, color: TEXT_MUTED }}>DATE: {p.identification.date || new Date().toISOString().slice(0, 10)}</Text>
            <Text style={{ fontSize: 7, color: NAVY, fontFamily: 'Helvetica-Bold', marginTop: 2 }}>VER: v{p.version}.0</Text>
          </View>
        </View>

        {/* Title Band */}
        <View style={styles.docTitleBand}>
          <Text style={styles.docTitleText}>LAND / PROPERTY DETAILS SHEET</Text>
          <Text style={styles.docSubtitleText}>OFFICIAL REALTOR SPECIFICATION DOCUMENT</Text>
        </View>

        {/* SECTION 01: PROPERTY IDENTIFICATION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>01</Text>
          <Text style={styles.sectionTitle}>Property Identification</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Ref No</Text>
            <Text style={styles.colVal30}>{p.identification.refNo || '-'}</Text>
            <Text style={styles.colLabel20}>Date</Text>
            <Text style={styles.colVal30}>{p.identification.date || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Property Name</Text>
            <Text style={[styles.colVal30, { fontFamily: 'Helvetica-Bold' }]}>{p.identification.propertyName || '-'}</Text>
            <Text style={styles.colLabel20}>Location</Text>
            <Text style={styles.colVal30}>{p.identification.location || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Village / Taluk</Text>
            <Text style={styles.colVal30}>{`${p.identification.village || '-'} / ${p.identification.taluk || '-'}`}</Text>
            <Text style={styles.colLabel20}>District / State</Text>
            <Text style={styles.colVal30}>{`${p.identification.district || '-'}, ${p.identification.state || '-'}`}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Survey No.</Text>
            <Text style={styles.colVal30}>{p.identification.surveyNo || '-'}</Text>
            <Text style={styles.colLabel20}>Sub-Division No.</Text>
            <Text style={styles.colVal30}>{p.identification.subDivisionNo || '-'}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>Property Type</Text>
            <View style={[styles.colFullVal, { width: '80%' }]}>
              <View style={styles.checkboxContainer}>
                {['Agricultural', 'Commercial', 'Residential', 'Industrial', 'Mixed Use', 'Plot/Layout'].map((type) => (
                  <CheckItem key={type} label={type} selected={p.identification.propertyType === type} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 02: LAND & SITE DETAILS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>02</Text>
          <Text style={styles.sectionTitle}>Land & Site Details</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Total Extent</Text>
            <Text style={styles.colVal30}>{p.siteDetails.totalExtent || '-'}</Text>
            <Text style={styles.colLabel20}>Area for Sale</Text>
            <Text style={styles.colVal30}>{`${p.siteDetails.areaForSale || '-'} (${p.siteDetails.landAreaUnit})`}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Facing Direction</Text>
            <View style={styles.colVal30}>
              <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{p.siteDetails.facing || '-'}</Text>
            </View>
            <Text style={styles.colLabel20}>Road Access / Width</Text>
            <Text style={styles.colVal30}>{`${p.siteDetails.roadAccess} (${p.siteDetails.roadWidth || 'N/A'})`}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Road Frontage</Text>
            <Text style={styles.colVal30}>{p.siteDetails.roadFrontage || '-'}</Text>
            <Text style={styles.colLabel20}>Plot Dimensions</Text>
            <Text style={styles.colVal30}>{p.siteDetails.plotDimensions || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Land Level</Text>
            <Text style={styles.colVal30}>{p.siteDetails.landLevel || '-'}</Text>
            <Text style={styles.colLabel20}>Current Use</Text>
            <Text style={styles.colVal30}>{p.siteDetails.currentUse || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Existing Structure</Text>
            <Text style={styles.colVal30}>{p.siteDetails.existingStructure || '-'}</Text>
            <Text style={styles.colLabel20}>Utilities (B/Wall/Water/Elec)</Text>
            <Text style={styles.colVal30}>{`Wall: ${p.siteDetails.boundaryWall} | Water: ${p.siteDetails.waterSource} | Power: ${p.siteDetails.electricitySupply}`}</Text>
          </View>

          {/* Boundaries sub-table header */}
          <View style={styles.tableRow}>
            <Text style={[styles.boundaryTitle, { width: '100%' }]}>SITE BOUNDARY DETAILS</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>North Boundary</Text>
            <Text style={styles.colVal30}>{p.siteDetails.northBoundary || '-'}</Text>
            <Text style={styles.colLabel20}>South Boundary</Text>
            <Text style={styles.colVal30}>{p.siteDetails.southBoundary || '-'}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>East Boundary</Text>
            <Text style={styles.colVal30}>{p.siteDetails.eastBoundary || '-'}</Text>
            <Text style={styles.colLabel20}>West Boundary</Text>
            <Text style={styles.colVal30}>{p.siteDetails.westBoundary || '-'}</Text>
          </View>
        </View>

        {/* SECTION 03: LOCATION & ACCESS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>03</Text>
          <Text style={styles.sectionTitle}>Location & Accessibility</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Dist to Main Road</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distMainRoad || '-'}</Text>
            <Text style={styles.colLabel20}>Dist to Highway</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distHighway || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Nearest Town</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distNearestTown || '-'}</Text>
            <Text style={styles.colLabel20}>Railway Station</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distRailway || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Airport Access</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distAirport || '-'}</Text>
            <Text style={styles.colLabel20}>School / College</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distSchoolCollege || '-'}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>Hospital / Medical</Text>
            <Text style={styles.colVal30}>{p.locationAccess.distHospital || '-'}</Text>
            <Text style={styles.colLabel20}>Key Landmark</Text>
            <Text style={styles.colVal30}>{p.locationAccess.otherLandmark || '-'}</Text>
          </View>
        </View>

        {/* SECTION 04: OWNERSHIP & DOCUMENTATION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>04</Text>
          <Text style={styles.sectionTitle}>Ownership & Legal Verification</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Current Owner</Text>
            <Text style={[styles.colVal30, { fontFamily: 'Helvetica-Bold' }]}>{p.ownership.currentOwner || '-'}</Text>
            <Text style={styles.colLabel20}>Title Deed Status</Text>
            <Text style={[styles.colVal30, { color: p.ownership.titleDeedStatus === 'Clear Title' ? '#166534' : NAVY, fontFamily: 'Helvetica-Bold' }]}>
              {p.ownership.titleDeedStatus || '-'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Parent Documents</Text>
            <Text style={styles.colVal30}>{p.ownership.parentDocs || '-'}</Text>
            <Text style={styles.colLabel20}>Encumbrance Cert (EC)</Text>
            <Text style={styles.colVal30}>{p.ownership.encumbranceCertificate || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Land Tax Receipt</Text>
            <Text style={styles.colVal30}>{p.ownership.landTaxReceipt || '-'}</Text>
            <Text style={styles.colLabel20}>Survey Sketch / FMB</Text>
            <Text style={styles.colVal30}>{p.ownership.surveySketch || '-'}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>Zoning / Classification</Text>
            <Text style={styles.colVal30}>{p.ownership.zoningClassification || '-'}</Text>
            <Text style={styles.colLabel20}>Approvals / NOCs</Text>
            <Text style={styles.colVal30}>{p.ownership.otherApprovals || '-'}</Text>
          </View>
        </View>

        {/* Page 1 Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>SUN REALTORS — Confidential Property Specification Sheet</Text>
          <Text style={styles.pageNumber}>Page 1 of 2</Text>
        </View>
      </Page>

      {/* ================= PAGE 2 ================= */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoBox}>
              <View style={styles.logoSunCenter} />
            </View>
            <View>
              <Text style={styles.companyName}>{comp.companyName}</Text>
              <Text style={styles.companyTagline}>{comp.tagline}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 7.5, color: TEXT_MUTED }}>REF NO: {p.identification.refNo}</Text>
            <Text style={{ fontSize: 7.5, color: TEXT_MUTED }}>DATE: {p.identification.date || new Date().toISOString().slice(0, 10)}</Text>
          </View>
        </View>

        {/* SECTION 05: SALE & PRICING DETAILS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>05</Text>
          <Text style={styles.sectionTitle}>Sale & Pricing Commercial Terms</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Area Offered</Text>
            <Text style={styles.colVal30}>{p.salePricing.areaOffered || '-'}</Text>
            <Text style={styles.colLabel20}>Price Negotiable</Text>
            <Text style={[styles.colVal30, { fontFamily: 'Helvetica-Bold' }]}>{p.salePricing.negotiable || '-'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Rate per Unit</Text>
            <Text style={styles.colVal30}>{p.salePricing.ratePerUnit || '-'}</Text>
            <Text style={styles.colLabel20}>Total Asking Price</Text>
            <Text style={[styles.colVal30, { fontSize: 9, fontFamily: 'Helvetica-Bold', color: NAVY }]}>
              {p.salePricing.totalAskingPrice || '-'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Booking Advance</Text>
            <Text style={styles.colVal30}>{p.salePricing.advanceBookingAmount || '-'}</Text>
            <Text style={styles.colLabel20}>Expected Registration</Text>
            <Text style={styles.colVal30}>{p.salePricing.expectedRegistrationDate || '-'}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>Payment Terms</Text>
            <Text style={[styles.colFullVal, { width: '80%' }]}>{p.salePricing.paymentTerms || '-'}</Text>
          </View>
        </View>

        {/* SECTION 06: PROPERTY FEATURES & HIGHLIGHTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>06</Text>
          <Text style={styles.sectionTitle}>Property Features & Highlights</Text>
        </View>
        <View style={styles.featuresBox}>
          <Text style={{ lineHeight: 1.4, color: TEXT_MAIN }}>
            {p.features.additionalHighlights || 'No additional features specified for this property listing.'}
          </Text>
        </View>

        {/* SECTION 07: SITE PLAN / PLOT LAYOUT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>07</Text>
          <Text style={styles.sectionTitle}>Site Plan / Plot Layout Diagram</Text>
        </View>
        <View style={styles.sitePlanBox}>
          {p.sitePlan.sitePlanImageUrl ? (
            <Image src={p.sitePlan.sitePlanImageUrl} style={styles.sitePlanImage} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.placeholderText}>[ Official Survey Sketch / Plot Layout Plan Image ]</Text>
              <Text style={{ fontSize: 7, color: TEXT_MUTED, marginTop: 4 }}>
                {p.sitePlan.notes || 'No site layout image uploaded. Survey blueprint attached separately.'}
              </Text>
            </View>
          )}
        </View>

        {/* SECTION 08: CONTACT & REALTOR DETAILS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>08</Text>
          <Text style={styles.sectionTitle}>Authorized Realtor Contact Details</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Agency Name</Text>
            <Text style={[styles.colVal30, { fontFamily: 'Helvetica-Bold', color: NAVY }]}>{comp.companyName}</Text>
            <Text style={styles.colLabel20}>Contact Person</Text>
            <Text style={[styles.colVal30, { fontFamily: 'Helvetica-Bold' }]}>{p.contact.contactPerson || comp.contactPerson}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colLabel20}>Mobile / WhatsApp</Text>
            <Text style={styles.colVal30}>{p.contact.mobileWhatsApp || comp.phone}</Text>
            <Text style={styles.colLabel20}>Official Email</Text>
            <Text style={styles.colVal30}>{p.contact.email || comp.email}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.colLabel20}>Office Address</Text>
            <Text style={[styles.colFullVal, { width: '80%' }]}>{p.contact.officeAddress || comp.address}</Text>
          </View>
        </View>

        {/* Disclaimer Footer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>LEGAL DISCLAIMER & VERIFICATION NOTICE:</Text>
          <Text style={styles.disclaimerContent}>{comp.disclaimerText}</Text>
        </View>

        {/* Page 2 Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>SUN REALTORS — Confidential Property Specification Sheet</Text>
          <Text style={styles.pageNumber}>Page 2 of 2</Text>
        </View>
      </Page>
    </Document>
  );
};
