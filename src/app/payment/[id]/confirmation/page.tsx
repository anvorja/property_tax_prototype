// src/app/payment/[id]/confirmation/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, CreditCard, CheckCircle, Loader2, Landmark } from 'lucide-react';
import { Stepper } from '@/components/ui/stepper';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

export default function ConfirmationPage() {
    const [seconds, setSeconds] = useState(5);
    const [showBankConfirmation, setShowBankConfirmation] = useState(false);

    useEffect(() => {
        // Temporizador para la cuenta regresiva
        if (seconds > 0 && !showBankConfirmation) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
        // Después de la cuenta regresiva, simular respuesta del banco
        else if (seconds === 0 && !showBankConfirmation) {
            const bankTimer = setTimeout(() => {
                setShowBankConfirmation(true);
            }, 2000); // Simular un pequeño delay para la respuesta del banco
            return () => clearTimeout(bankTimer);
        }
    }, [seconds, showBankConfirmation]);

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
                                        ¡Pago Exitoso!
                                    </h2>
                                    <Alert className="bg-green-50 border-green-200">
                                        <AlertDescription className="text-green-800">
                                            Hemos recibido la confirmación de su banco.
                                            El pago ha sido procesado correctamente.
                                        </AlertDescription>
                                    </Alert>
                                    <div className="text-center text-sm text-gray-600 mt-4">
                                        <p>Número de transacción: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                        <p>Fecha: {new Date().toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}