// services/invoice/invoice.service.ts
import { propertiesMockData, invoicesMockData } from '@/data/InvoiceMockData';
import { Invoice, Property } from '@/types/invoiceTypes';

export class InvoiceService {
    static async searchInvoice(criteria: string, value: string): Promise<{
        property: Property;
        invoice: Invoice;
    } | null> {
        try {
            let property: Property | undefined;
            let invoice: Invoice | undefined;

            if (criteria === 'ID_PREDIO') {
                property = propertiesMockData.find(p => p.id === value);
                if (property) {
                    invoice = invoicesMockData.find(i => i.propertyId === property?.id);
                }
            } else if (criteria === 'NUMERO_FACTURA') {
                invoice = invoicesMockData.find(i => i.id === value);
                if (invoice) {
                    property = propertiesMockData.find(p => p.id === invoice?.propertyId);
                }
            }

            if (property && invoice) {
                return { property, invoice };
            }
            return null;
        } catch (error) {
            console.error('Error al buscar factura:', error);
            throw error;
        }
    }
}