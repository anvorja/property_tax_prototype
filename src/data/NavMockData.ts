// src/data/NavMockData.ts
import { NavItem } from '@/types/commonTypes';
import { Home, Search, CreditCard, HelpCircle, FileText } from 'lucide-react';

export const navItems: NavItem[] = [
    {
        title: 'Inicio',
        href: '/',
        icon: Home,
        description: 'Página principal'
    },
    {
        title: 'Consultar Factura',
        href: '/invoice',
        icon: Search,
        description: 'Buscar y consultar facturas de impuesto predial'
    },
    {
        title: 'Pagos PSE',
        href: '/payment',
        icon: CreditCard,
        description: 'Realizar pagos en línea'
    },
    {
        title: 'Ayuda',
        href: '/help',
        icon: HelpCircle,
        description: 'Preguntas frecuentes y soporte'
    },
    {
        title: 'Estado de Pagos',
        href: '/payment-status',
        icon: FileText,
        description: 'Consultar estado de los pagos realizados'
    }
];