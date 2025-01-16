// src/hooks/useInvoice.ts
'use client'

import { useEffect, useState } from 'react';
import { Invoice, Property } from '@/types/invoiceTypes';
import { useParams } from 'next/navigation';
import { invoicesMockData, propertiesMockData } from '@/data/InvoiceMockData';

export const useInvoice = () => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchInvoiceData = async () => {
            if (!params.id) {
                setError('ID no proporcionado');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 500));

                const foundInvoice = invoicesMockData.find(inv => inv.id === params.id);
                if (!foundInvoice) {
                    setError('Factura no encontrada');
                    return;
                }

                const foundProperty = propertiesMockData.find(prop => prop.id === foundInvoice.propertyId);
                if (!foundProperty) {
                    setError('Propiedad no encontrada');
                    return;
                }

                setInvoice(foundInvoice);
                setProperty(foundProperty);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        void fetchInvoiceData();
    }, [params.id]);

    return {
        invoice,
        property,
        loading,
        error
    };
};

export default useInvoice;