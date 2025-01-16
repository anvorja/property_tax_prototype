// src/components/invoice/InvoiceDetails.tsx
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {Clock, AlertTriangle, HelpCircle, AlertCircle, Hash, MapPin, Building} from 'lucide-react';
import {InfoTooltipProps, DiscountCountdownProps, PropertyInfoProps} from '@/types/invoiceDetailsTypes';
import {Card, CardContent } from '../ui/card';

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
                <p className="max-w-xs">{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

type StatusStyles = {
    containerClass: string;
    progressClass: string;
    message: string;
    showTooltip: boolean;
}

const getStatusStyles = (daysLeft: number): StatusStyles => {
    if (daysLeft <= 0) {
        return {
            containerClass: "bg-red-50 border-red-200",
            progressClass: "h-2 [&>[role=progressbar]]:bg-red-500",
            message: "Descuento vencido",
            showTooltip: true
        };
    }
    if (daysLeft <= 7) {
        return {
            containerClass: "bg-orange-50 border-orange-200",
            progressClass: "h-2 [&>[role=progressbar]]:bg-orange-500",
            message: `${daysLeft} días restantes`,
            showTooltip: false
        };
    }
    return {
        containerClass: "bg-blue-50 border-blue-200",
        progressClass: "h-2 [&>[role=progressbar]]:bg-blue-500",
        message: `${daysLeft} días restantes`,
        showTooltip: false
    };
};

const DiscountCountdown: React.FC<DiscountCountdownProps> = ({ dueDate }) => {
    const today = new Date();
    const due = new Date(dueDate);
    const totalDays = 31;
    const daysLeft = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const progress = Math.max(0, Math.min(((totalDays - daysLeft) / totalDays) * 100, 100));

    const { containerClass, progressClass, message, showTooltip } = getStatusStyles(daysLeft);

    return (
        <div className={`p-4 rounded-lg border ${containerClass} mb-6`}>
            <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                        Tiempo restante para aprovechar el descuento
                    </h3>
                    {showTooltip && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        El descuento venció el {due.toLocaleDateString()}.
                                        Por favor, acérquese a nuestras oficinas para conocer las opciones de pago disponibles.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
            <div className="space-y-3">
                <Progress value={progress} className={progressClass} />
                <div className="flex justify-between items-center">
                    <span className="font-medium">
                        {message}
                    </span>
                    {daysLeft <= 7 && daysLeft > 0 && (
                        <div className="flex items-center gap-2 text-orange-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                ¡Fecha límite próxima!
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => (
    <Card>
        <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-500">Propietario</span>
                        </div>
                        <p className="text-lg font-medium">{property.owner}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Hash className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-500">Identificación</span>
                        </div>
                        <p className="text-lg">{property.identification}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-500">Dirección</span>
                        </div>
                        <p className="text-lg">{property.address}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Comuna</span>
                            </div>
                            <p className="text-lg">{property.commune}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Estrato</span>
                            </div>
                            <p className="text-lg">{property.stratum}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Avalúo</span>
                        </div>
                        <p className="text-lg font-medium text-blue-600">
                            {new Intl.NumberFormat('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(property.value)}
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);
export { DiscountCountdown, InfoTooltip, PropertyInfo };