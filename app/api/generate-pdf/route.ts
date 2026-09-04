import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { PropertyPDFDocument } from '@/components/pdf/PropertyPDFDocument';
import { Property, CompanySettings } from '@/lib/types';
import { defaultCompanySettings } from '@/lib/defaultData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const property: Property = body.property;
    const companySettings: CompanySettings = body.companySettings || defaultCompanySettings;
    const isDownload = body.download === true;

    if (!property || !property.identification) {
      return NextResponse.json({ error: 'Invalid property payload' }, { status: 400 });
    }

    // Render React-PDF document to Buffer
    const pdfElement = React.createElement(PropertyPDFDocument, { property, companySettings });
    const buffer = await renderToBuffer(pdfElement as unknown as React.ReactElement<any>);

    const refNo = property.identification?.refNo || 'PROPERTY';
    const filename = `${refNo.replace(/[^a-zA-Z0-9-]/g, '_')}_Details_Sheet.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': isDownload ? `attachment; filename="${filename}"` : `inline; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF', details: String(error) }, { status: 500 });
  }
}
