// src/types/paymentPSETypes.ts
export interface PSEFormData {
    fullName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    bankCode: string;
}

export interface Bank {
    id: string;
    name: string;
    code: string;
}

export interface PSEFormProps {
    onSubmit: (data: PSEFormData) => void;
    isLoading?: boolean;
    initialData?: Partial<PSEFormData>;
}

// Podemos añadir más tipos específicos de PSE aquí:
export type DocumentType = 'CC' | 'CE' | 'NIT';

export interface PSETransaction {
    transactionId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    bankProcessId?: string;
    requestDate: string;
    responseDate?: string;
}