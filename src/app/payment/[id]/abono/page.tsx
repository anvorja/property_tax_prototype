// src/app/payment/[id]/abono/page.tsx
"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Calculator, FileText, CreditCard, CheckCircle } from 'lucide-react';
import { Stepper } from '@/components/ui/stepper';
import { useInvoice } from '@/hooks/useInvoice';
import { formatCurrency } from '@/lib/formatUtils';
import { InvoiceSummary } from '@/components/payment/InvoiceSummary';

const MONTO_MINIMO = 30000;

const paymentSteps = [
    {
        id: 1,
        label: 'Resumen',
        description: 'Verificar información',
        icon: FileText
    },
    {
        id: 2,
        label: 'Pago',
        description: 'PSE',
        icon: CreditCard
    },
    {
        id: 3,
        label: 'Confirmación',
        description: 'Proceso completado',
        icon: CheckCircle
    }
];

export default function AbonoPage() {
    const params = useParams();
    const router = useRouter();
    const { invoice, property, loading, error } = useInvoice();
    const [montoAbono, setMontoAbono] = useState<number>(MONTO_MINIMO);
    const [errorAbono, setErrorAbono] = useState<string>('');

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    <span>Cargando...</span>
                </div>
            </div>
        );
    }

    if (error || !invoice || !property) {
        return (
            <div className="container mx-auto p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || 'Error al cargar los datos'}</AlertDescription>
                </Alert>
            </div>
        );
    }

    const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = parseInt(e.target.value) || 0;
        setMontoAbono(valor);

        if (valor < MONTO_MINIMO) {
            setErrorAbono(`El monto mínimo permitido es ${formatCurrency(MONTO_MINIMO)}`);
        } else if (valor > invoice.totalAmount) {
            setErrorAbono('El monto no puede ser mayor al valor total de la factura');
        } else {
            setErrorAbono('');
        }
    };

    const handleContinuar = () => {
        if (!errorAbono && montoAbono >= MONTO_MINIMO) {
            router.push(`/payment/${params.id}?tipo=abono&monto=${montoAbono}`);
        }
    };

    const saldoPendiente = invoice.totalAmount - montoAbono;

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto p-4">
                <div className="mb-8">
                    <Stepper steps={paymentSteps} currentStep={1} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Columna izquierda: Resumen de factura */}
                    <div>
                        <InvoiceSummary
                            invoice={invoice}
                            property={property}
                            showActions={false}
                        />
                    </div>

                    {/* Columna derecha: Formulario de abono */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5" />
                                    Ingrese el Monto del Abono
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Monto a abonar:
                                    </label>
                                    <Input
                                        type="number"
                                        min={MONTO_MINIMO}
                                        max={invoice.totalAmount}
                                        value={montoAbono}
                                        onChange={handleMontoChange}
                                        className="text-lg"
                                    />
                                    {errorAbono && (
                                        <Alert variant="destructive" className="mt-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{errorAbono}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Valor total factura:</span>
                                        <span>{formatCurrency(invoice.totalAmount)}</span>
                                    </div>
                                    {invoice.discountAmount > 0 && (
                                        <Alert className="bg-amber-50 border-amber-200 text-amber-800 text-sm">
                                            <AlertDescription>
                                                Nota: Los abonos no son beneficiarios del descuento por pronto pago. El valor total a pagar es {formatCurrency(invoice.totalAmount)}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    <div className="flex justify-between items-center text-blue-600">
                                        <span>Monto del abono:</span>
                                        <span className="font-medium">{formatCurrency(montoAbono)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-900 pt-2 border-t">
                                        <span className="font-medium">Saldo pendiente:</span>
                                        <span className="font-medium">{formatCurrency(saldoPendiente)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={handleContinuar}
                                    disabled={!!errorAbono || montoAbono < MONTO_MINIMO}
                                >
                                    Continuar al pago
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}