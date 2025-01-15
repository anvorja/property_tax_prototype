// src/app/invoice/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { InvoiceService } from '@/services/invoice/invoice.service'
import { Invoice, Property } from '@/types/invoiceTypes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileDown, AlertCircle, CreditCard, Calculator } from 'lucide-react'
import { formatCurrency } from '@/lib/formatUtils'
import {DiscountCountdown, InfoTooltip, PropertyInfo} from "@/components/invoice/InvoiceDetails";

export default function InvoiceDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isSubscribed = true;

        // IIFE (Immediately Invoked Function Expression)
        void (async () => {
            try {
                setLoading(true);

                const result = await InvoiceService.searchInvoice('NUMERO_FACTURA', params.id as string);

                if (isSubscribed) {
                    if (result) {
                        setData(result);
                    } else {
                        setError('Factura no encontrada');
                    }
                } else {
                    console.log('⚠️ Componente desmontado, no se actualiza el estado');
                }
            } catch (err) {
                console.error('🚨 Error en la búsqueda:', err);
                if (isSubscribed) {
                    setError('Error al cargar la factura');
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            isSubscribed = false;
        };
    }, [params.id]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <Card className="max-w-3xl mx-auto">
                    <CardContent className="p-6">
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="container mx-auto p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    const { property, invoice } = data

    // Añadir esto nuevo
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto space-y-6">
                <DiscountCountdown dueDate={invoice.dueDate} />

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Información del Predio</span>
                            <span className="text-sm font-normal text-gray-500">
                                ID Predio: {property.id}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <PropertyInfo property={property} />
                </Card>

                {/* Detalles de la factura */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles de la Factura</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Número de Factura</dt>
                                    <dd className="mt-1">{invoice.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Fecha de Vencimiento</dt>
                                    <dd className="mt-1">{new Date(invoice.dueDate).toLocaleDateString()}</dd>
                                </div>
                            </dl>

                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-3">Conceptos</h4>
                                <dl className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <dt className="flex items-center gap-2">
                                            <span className="text-gray-600">Impuesto Predial Unificado</span>
                                            <InfoTooltip
                                                content="Impuesto que grava los bienes inmuebles ubicados en el municipio"/>
                                        </dt>
                                        <dd className="font-medium tabular-nums">{formatCurrency(invoice.unifiedPropertyTax)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="flex items-center gap-2">
                                            <span className="text-gray-600">CVC</span>
                                            <InfoTooltip
                                                content="Corporación Autónoma Regional del Valle del Cauca - Tasa ambiental"/>
                                        </dt>
                                        <dd className="tabular-nums">{formatCurrency(invoice.cvc)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="flex items-center gap-2">
                                            <span className="text-gray-600">Alumbrado Público</span>
                                            <InfoTooltip
                                                content="Tarifa para el mantenimiento del sistema de alumbrado público"/>
                                        </dt>
                                        <dd className="tabular-nums">{formatCurrency(invoice.publicLighting)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="flex items-center gap-2">
                                            <span className="text-gray-600">Sobretasa Bomberos</span>
                                            <InfoTooltip
                                                content="Contribución para el funcionamiento del cuerpo de bomberos"/>
                                        </dt>
                                        <dd className="tabular-nums">{formatCurrency(invoice.firefightersSurcharge)}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border-t pt-6 mt-6">
                                <dl className="space-y-4">
                                    <div className="flex justify-between text-lg items-center">
                                        <dt className="font-medium text-gray-700">Total</dt>
                                        <dd className="font-medium tabular-nums">{formatCurrency(invoice.totalAmount)}</dd>
                                    </div>

                                    {daysLeft > 0 ? (
                                        <div
                                            className="flex justify-between text-green-600 items-center bg-green-50 p-3 rounded-lg">
                                            <dt className="flex items-center">
                                                <span className="text-sm mr-1">🎉</span>
                                                Descuento Pronto Pago
                                            </dt>
                                            <dd className="font-medium tabular-nums">-{formatCurrency(invoice.discountAmount)}</dd>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                                            <dt className="flex items-center gap-2 text-red-600">
                                                <AlertCircle className="h-4 w-4"/>
                                                No aplica descuento
                                            </dt>
                                            <dd className="text-sm text-red-600">Fecha límite superada</dd>
                                        </div>
                                    )}

                                    <div className={`flex justify-between text-lg items-center ${
                                        daysLeft > 0 ? 'bg-blue-50 text-blue-900' : 'bg-gray-50 text-gray-900'
                                    } p-4 rounded-lg`}>
                                        <dt className="font-bold">Total a Pagar</dt>
                                        <dd className="font-bold text-xl tabular-nums">
                                            {formatCurrency(daysLeft > 0 ? invoice.finalAmount : invoice.totalAmount)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                                    onClick={() => router.push(`/payment/${invoice.id}`)}
                                >
                                    <CreditCard className="mr-2 h-5 w-5"/>
                                    Pagar en Línea
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 hover:bg-gray-50 transition-colors border-gray-300"
                                    onClick={() => router.push(`/payment/${invoice.id}/abono`)}
                                >
                                    <Calculator className="mr-2 h-5 w-5"/>
                                    Realizar Abono
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 hover:bg-gray-50 transition-colors border-gray-300"
                                >
                                    <FileDown className="mr-2 h-5 w-5"/>
                                    Descargar PDF
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}