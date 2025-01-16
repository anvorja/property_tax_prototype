// src/types/paymentTypes.ts
export interface PaymentSummaryProps {
    invoice: {
        id: string;
        totalAmount: number;
        discountAmount: number;
        finalAmount: number;
        dueDate: string;
    };
    property: {
        id: string;
        owner: string;
        address: string;
    };
    showActions?: boolean;
}