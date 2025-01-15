// propuesta 1
// src/app/payment/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { InvoiceService } from '@/services/invoice/invoice.service';
import { Invoice, Property } from '@/types/invoiceTypes';
import { PSEFormData } from '@/types/paymentPSETypes';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { InvoiceSummary } from '@/components/payment/InvoiceSummary';
import { PSEForm } from '@/components/payment/PSEForm';
import { FileText, CreditCard, CheckCircle } from 'lucide-react';
import {Stepper} from "@/components/ui/stepper";

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

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isSubscribed = true;

        // IIFE con void operator
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
                }
            } catch {
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

    const handlePSESubmit = async (formData: PSEFormData) => {
        try {
            // TODO:
            // Aquí iría la lógica de pago PSE
            console.log('PSE Form Data:', formData);
            // Después del pago exitoso, redirigir a página de confirmación
            router.push(`/payment/${params.id}/confirmation`);
        } catch (error) {
            console.error('Error en el pago:', error);
            setError('Error al procesar el pago');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="container mx-auto p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto p-4">
                <div className="mb-8">
                    <Stepper
                        steps={paymentSteps}
                        currentStep={2} // El paso actual (Pago PSE)
                    />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Columna izquierda: Resumen de factura */}
                    <div>
                        <InvoiceSummary
                            invoice={data.invoice}
                            property={data.property}
                            showActions={false}
                        />
                    </div>

                    {/* Columna derecha: Formulario PSE */}
                    <div>
                        <PSEForm
                            onSubmit={handlePSESubmit}
                            isLoading={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// // propuesta 2
// // src/app/payment/[id]/page.tsx
// "use client"
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { InvoiceService } from '@/services/invoice/invoice.service';
// import { Invoice, Property } from '@/types/invoiceTypes';
// import { PSEFormData } from '@/types/paymentPSETypes';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { AlertCircle } from 'lucide-react';
// import { InvoiceSummary } from '@/components/payment/InvoiceSummary';
// import { PSEForm } from '@/components/payment/PSEForm';
// import {Stepper} from "@/components/ui/stepper";
//
// const paymentSteps = [
//     {
//         id: 1,
//         label: 'Resumen',
//         description: 'Verificar información'
//     },
//     {
//         id: 2,
//         label: 'Pago',
//         description: 'PSE'
//     },
//     {
//         id: 3,
//         label: 'Confirmación',
//         description: 'Proceso completado'
//     }
// ];
//
// export default function PaymentPage() {
//     const params = useParams();
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         let isSubscribed = true;
//
//         // IIFE con void operator
//         void (async () => {
//             try {
//                 setLoading(true);
//                 const result = await InvoiceService.searchInvoice('NUMERO_FACTURA', params.id as string);
//                 if (isSubscribed) {
//                     if (result) {
//                         setData(result);
//                     } else {
//                         setError('Factura no encontrada');
//                     }
//                 }
//             } catch {
//                 if (isSubscribed) {
//                     setError('Error al cargar la factura');
//                 }
//             } finally {
//                 if (isSubscribed) {
//                     setLoading(false);
//                 }
//             }
//         })();
//
//         return () => {
//             isSubscribed = false;
//         };
//     }, [params.id]);
//
//     const handlePSESubmit = async (formData: PSEFormData) => {
//         try {
//             // TODO:
//             // Aquí iría la lógica de pago PSE
//             console.log('PSE Form Data:', formData);
//             // Después del pago exitoso, redirigir a página de confirmación
//             router.push(`/payment/${params.id}/confirmation`);
//         } catch (error) {
//             console.error('Error en el pago:', error);
//             setError('Error al procesar el pago');
//         }
//     };
//
//     if (loading) {
//         return (
//             <div className="container mx-auto p-4">
//                 <div className="animate-pulse space-y-4">
//                     <Stepper steps={paymentSteps} currentStep={2} />
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//             </div>
//         );
//     }
//
//     if (error || !data) {
//         return (
//             <div className="container mx-auto p-4">
//                 <Alert variant="destructive">
//                     <AlertCircle className="h-4 w-4" />
//                     <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//             </div>
//         );
//     }
//
//     return (
//         <div className="container mx-auto p-4">
//             <div className="mb-8">
//                 <Stepper
//                     steps={paymentSteps}
//                     currentStep={2} // El paso actual (Pago PSE)
//                 />
//             </div>
//             <div className="grid gap-6 md:grid-cols-2">
//                 {/* Columna izquierda: Resumen de factura */}
//                 <div>
//                     <InvoiceSummary
//                         invoice={data.invoice}
//                         property={data.property}
//                         showActions={false}
//                     />
//                 </div>
//
//                 {/* Columna derecha: Formulario PSE */}
//                 <div>
//                     <PSEForm
//                         onSubmit={handlePSESubmit}
//                         isLoading={false}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }


// // alinear card formpse - factura
// // src/app/payment/[id]/page.tsx
// "use client"
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { InvoiceService } from '@/services/invoice/invoice.service';
// import { Invoice, Property } from '@/types/invoiceTypes';
// import { PSEFormData } from '@/types/paymentPSETypes';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { AlertCircle } from 'lucide-react';
// import { InvoiceSummary } from '@/components/payment/InvoiceSummary';
// import { PSEForm } from '@/components/payment/PSEForm';
// import { FileText, CreditCard, CheckCircle } from 'lucide-react';
// import {Stepper} from "@/components/ui/stepper";
//
// const paymentSteps = [
//     {
//         id: 1,
//         label: 'Resumen',
//         description: 'Verificar información',
//         icon: FileText
//     },
//     {
//         id: 2,
//         label: 'Pago',
//         description: 'PSE',
//         icon: CreditCard
//     },
//     {
//         id: 3,
//         label: 'Confirmación',
//         description: 'Proceso completado',
//         icon: CheckCircle
//     }
// ];
//
// export default function PaymentPage() {
//     const params = useParams();
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         let isSubscribed = true;
//
//         // IIFE con void operator
//         void (async () => {
//             try {
//                 setLoading(true);
//                 const result = await InvoiceService.searchInvoice('NUMERO_FACTURA', params.id as string);
//                 if (isSubscribed) {
//                     if (result) {
//                         setData(result);
//                     } else {
//                         setError('Factura no encontrada');
//                     }
//                 }
//             } catch {
//                 if (isSubscribed) {
//                     setError('Error al cargar la factura');
//                 }
//             } finally {
//                 if (isSubscribed) {
//                     setLoading(false);
//                 }
//             }
//         })();
//
//         return () => {
//             isSubscribed = false;
//         };
//     }, [params.id]);
//
//     const handlePSESubmit = async (formData: PSEFormData) => {
//         try {
//             // TODO:
//             // Aquí iría la lógica de pago PSE
//             console.log('PSE Form Data:', formData);
//             // Después del pago exitoso, redirigir a página de confirmación
//             router.push(`/payment/${params.id}/confirmation`);
//         } catch (error) {
//             console.error('Error en el pago:', error);
//             setError('Error al procesar el pago');
//         }
//     };
//
//     if (loading) {
//         return (
//             <div className="container mx-auto p-4">
//                 <div className="animate-pulse space-y-4">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//             </div>
//         );
//     }
//
//     if (error || !data) {
//         return (
//             <div className="container mx-auto p-4">
//                 <Alert variant="destructive">
//                     <AlertCircle className="h-4 w-4" />
//                     <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen bg-slate-50">
//             <div className="container mx-auto p-4">
//                 <div className="mb-8">
//                     <Stepper
//                         steps={paymentSteps}
//                         currentStep={2} // El paso actual (Pago PSE)
//                     />
//                 </div>
//                 <div className="grid gap-6 md:grid-cols-2 items-start">
//                     {/* Columna izquierda: Resumen de factura */}
//                     <div>
//                         <InvoiceSummary
//                             invoice={data.invoice}
//                             property={data.property}
//                             showActions={false}
//                         />
//                     </div>
//
//                     {/* Columna derecha: Formulario PSE */}
//                     <div>
//                         <PSEForm
//                             onSubmit={handlePSESubmit}
//                             isLoading={false}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }