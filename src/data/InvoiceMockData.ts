// data/InvoiceMockData.ts
import { Invoice, Property } from '@/types/invoiceTypes'

export const propertiesMockData: Property[] = [
    {
        id: "0000532910",
        propertyNumber: "760010100179400110013000000000",
        owner: "LUIS ARTURO GOMEZ",
        identification: "14930444",
        address: "KR 6 # 24 C - 45",
        postalCode: "760033",
        value: 1112031000,
        commune: "17",
        stratum: 4
    },
    {
        id: "00004532920",
        propertyNumber: "760010100179400110013000000045",
        owner: "MARIO MEDINA ROJAS",
        identification: "3121019844",
        address: "KR 16 # 2 K - 44",
        postalCode: "780013",
        value: 2112931000,
        commune: "17",
        stratum: 4
    },
    {
        id: "00004532930",
        propertyNumber: "760010100179400110013000000046",
        owner: "LUCRECIA READY GOMEZ",
        identification: "3121019844",
        address: "Cll 9 # 66 A - 12",
        postalCode: "780024",
        value: 5012931000,
        commune: "8",
        stratum: 2
    },
];

export const invoicesMockData: Invoice[] = [
    {
        id: "000069704647",
        documentNumber: "17940011001300000013",
        propertyId: "0000532910",
        expeditionDate: "2025-01-13",
        dueDate: "2025-01-14",
        unifiedPropertyTax: 8000000,
        cvc: 100000,
        publicLighting: 20000,
        firefightersSurcharge: 30000,
        totalAmount: 8150000,
        discountAmount: 1000000,
        finalAmount: 7150000,
        status: 'pending' // Pendiente de pago
    },
    {
        id: "000011123448",
        documentNumber: "17940011001300000014",
        propertyId: "00004532920",
        expeditionDate: "2025-01-13",
        dueDate: "2025-01-31",
        unifiedPropertyTax: 6101000,
        cvc: 842000,
        publicLighting: 18000,
        firefightersSurcharge: 226000,
        totalAmount: 7169000,
        discountAmount: 1073850,
        finalAmount: 6095150,
        status: 'pending'
    },
    {
        id: "000011123450",
        documentNumber: "17940011001300000015",
        propertyId: "00004532930",
        expeditionDate: "2025-01-13",
        dueDate: "2025-01-31",
        unifiedPropertyTax: 5101000,
        cvc: 742000,
        publicLighting: 13000,
        firefightersSurcharge: 1026000,
        totalAmount: 6869000,
        discountAmount: 869000,
        finalAmount: 600000,
        status: 'paid',
        paymentDate: '2025-01-15',
        transactionId: 'TRX123456789'
    }
];
