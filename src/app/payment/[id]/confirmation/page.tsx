// src/app/payment/[id]/confirmation/page.tsx
"use client"

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, CreditCard, CheckCircle, Loader2, Landmark } from 'lucide-react';
import { Stepper } from '@/components/ui/stepper';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { generatePaymentReceipt } from '@/lib/payment-pdf-generator';
import { useInvoice } from '@/hooks/useInvoice';

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

const generateTransactionId = () => {
    return Array.from({ length: 9 }, () =>
        Math.floor(Math.random() * 36).toString(36)
    ).join('').toUpperCase();
};

export default function ConfirmationPage() {
    const [seconds, setSeconds] = useState(5);
    const [showBankConfirmation, setShowBankConfirmation] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const { invoice, property, loading } = useInvoice();

    const searchParams = useSearchParams();
    const isAbono = searchParams.get('tipo') === 'abono';
    const montoAbono = Number(searchParams.get('monto')) || 0;

    const handlePaymentSuccess = useCallback(async (txId: string) => {
        if (!invoice || !property) return;

        try {
            setIsGeneratingPDF(true);
            const pdf = generatePaymentReceipt({
                invoice,
                property,
                transactionId: txId,
                paymentDate: new Date().toISOString(),
                isAbono,
                montoAbono
            });
            pdf.save(`${isAbono ? 'abono' : 'comprobante'}_${invoice.id}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGeneratingPDF(false);
        }
    }, [invoice, property, isAbono, montoAbono]);

    const handleDownloadPDF = async () => {
        if (!invoice || !property) return;

        try {
            setIsGeneratingPDF(true);
            const pdf = generatePaymentReceipt({
                invoice,
                property,
                transactionId,
                paymentDate: new Date().toISOString(),
                isAbono,
                montoAbono
            });
            pdf.save(`${isAbono ? 'abono' : 'comprobante'}_${invoice.id}.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let bankTimer: NodeJS.Timeout;

        if (seconds > 0 && !showBankConfirmation) {
            timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        } else if (seconds === 0 && !showBankConfirmation) {
            bankTimer = setTimeout(() => {
                const newTransactionId = generateTransactionId();
                setTransactionId(newTransactionId);
                setShowBankConfirmation(true);
                void handlePaymentSuccess(newTransactionId);
            }, 2000);
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(bankTimer);
        };
    }, [seconds, showBankConfirmation, handlePaymentSuccess]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto p-4">
                <div className="mb-8">
                    <Stepper
                        steps={paymentSteps}
                        currentStep={showBankConfirmation ? 3 : 2}
                    />
                </div>

                <div className="max-w-lg mx-auto">
                    {!showBankConfirmation ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <Landmark className="h-12 w-12 text-blue-500" />
                                    <h2 className="text-xl font-semibold text-center">
                                        Redirigiendo al banco
                                    </h2>
                                    <p className="text-gray-600 text-center mb-4">
                                        En {seconds} segundos será redirigido a su banco para completar el pago
                                    </p>
                                    <div className="w-full space-y-2">
                                        <Progress value={((5 - seconds) / 5) * 100} className="h-2" />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Preparando conexión segura...
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-center text-green-700">
                                        ¡{isAbono ? 'Abono' : 'Pago'} Exitoso!
                                    </h2>
                                    <Alert className="bg-green-50 border-green-200">
                                        <AlertDescription className="text-green-800">
                                            Hemos recibido la confirmación de su banco.
                                            {isAbono ? ' El abono' : ' El pago'} ha sido procesado correctamente.
                                        </AlertDescription>
                                    </Alert>
                                    <div className="text-center text-sm text-gray-600 mt-4">
                                        <p>Número de transacción: {transactionId}</p>
                                        <p>Fecha: {new Date().toLocaleString()}</p>
                                        {isAbono && (
                                            <p className="font-medium text-blue-600 mt-2">
                                                Monto abonado: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(montoAbono)}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => void handleDownloadPDF()}
                                        className="mt-4"
                                        variant="outline"
                                        disabled={isGeneratingPDF}
                                    >
                                        {isGeneratingPDF ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Generando PDF...
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="mr-2 h-4 w-4" />
                                                Descargar Comprobante
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}