// src/types/invoiceTypes.ts
export interface FacturaFormData {
    tipoRenta: string
    criterioBusqueda: string
    numeroReferencia: string
}

export interface Property {
    id: string;
    propertyNumber: string;
    owner: string;
    identification: string;
    address: string;
    postalCode: string;
    value: number;
    commune: string;
    stratum: number;
}

export interface Invoice {
    id: string;
    documentNumber: string;
    propertyId: string;
    expeditionDate: string;
    dueDate: string;
    unifiedPropertyTax: number;
    cvc: number;
    publicLighting: number;
    firefightersSurcharge: number;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    status: 'pending' | 'paid' | 'cancelled';
    paymentDate?: string;
    transactionId?: string;
}

// Tipos de ayuda para estados
export type InvoiceStatus = 'pending' | 'paid' | 'cancelled';

export interface PaidInvoiceDetails {
    paymentDate: string;
    transactionId: string;
}

export interface InvoiceSearchResult {
    invoice: Invoice;
    property: Property;
}