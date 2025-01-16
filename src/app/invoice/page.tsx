// src/app/invoice/page.tsx
"use client"

import { InvoiceForm } from '@/components/invoice/InvoiceForm'

export default function InvoicePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                Consulte su Factura
            </h1>
            <InvoiceForm />
        </div>
    )
}