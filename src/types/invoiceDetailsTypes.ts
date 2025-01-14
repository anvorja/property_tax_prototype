// src/types/invoiceDetailsTypes.ts
import { Property } from './invoiceTypes';

export interface InfoTooltipProps {
    content: string;
}

export interface DiscountCountdownProps {
    dueDate: string;
}

export interface PropertyInfoProps {
    property: Property;
}