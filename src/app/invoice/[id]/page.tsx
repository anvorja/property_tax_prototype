// // src/app/invoice/[id]/page.tsx
// "use client"
//
// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { InvoiceService } from '@/services/invoice/invoice.service'
// import { Invoice, Property } from '@/types/invoiceTypes'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { FileDown, AlertCircle, CreditCard, Calculator } from 'lucide-react'
// import { formatCurrency } from '@/lib/formatUtils'
//
// export default function InvoiceDetailPage() {
//     const params = useParams()
//     const router = useRouter()
//     const [loading, setLoading] = useState(true)
//     const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null)
//     const [error, setError] = useState<string | null>(null)
//
//     useEffect(() => {
//         let isSubscribed = true;
//
//         // IIFE (Immediately Invoked Function Expression)
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
//     if (loading) {
//         return (
//             <div className="container mx-auto p-4">
//                 <Card className="max-w-3xl mx-auto">
//                     <CardContent className="p-6">
//                         <div className="animate-pulse space-y-4">
//                             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                             <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         )
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
//         )
//     }
//
//     const { property, invoice } = data
//
//     return (
//         <div className="container mx-auto p-4">
//             <div className="max-w-3xl mx-auto space-y-6">
//                 {/* Información de la propiedad */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Información del Predio</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Propietario</dt>
//                                 <dd className="mt-1">{property.owner}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Identificación</dt>
//                                 <dd className="mt-1">{property.identification}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Dirección</dt>
//                                 <dd className="mt-1">{property.address}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Comuna</dt>
//                                 <dd className="mt-1">{property.commune}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Estrato</dt>
//                                 <dd className="mt-1">{property.stratum}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Avalúo</dt>
//                                 <dd className="mt-1">{formatCurrency(property.value)}</dd>
//                             </div>
//                         </dl>
//                     </CardContent>
//                 </Card>
//
//                 {/* Detalles de la factura */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Detalles de la Factura</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-6">
//                             <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <dt className="text-sm font-medium text-gray-500">Número de Factura</dt>
//                                     <dd className="mt-1">{invoice.id}</dd>
//                                 </div>
//                                 <div>
//                                     <dt className="text-sm font-medium text-gray-500">Fecha de Vencimiento</dt>
//                                     <dd className="mt-1">{new Date(invoice.dueDate).toLocaleDateString()}</dd>
//                                 </div>
//                             </dl>
//
//                             <div className="border-t pt-4">
//                                 <h4 className="font-medium mb-3">Conceptos</h4>
//                                 <dl className="space-y-2">
//                                     <div className="flex justify-between">
//                                         <dt className="text-gray-600">Impuesto Predial Unificado</dt>
//                                         <dd>{formatCurrency(invoice.unifiedPropertyTax)}</dd>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <dt className="text-gray-600">CVC</dt>
//                                         <dd>{formatCurrency(invoice.cvc)}</dd>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <dt className="text-gray-600">Alumbrado Público</dt>
//                                         <dd>{formatCurrency(invoice.publicLighting)}</dd>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <dt className="text-gray-600">Sobretasa Bomberos</dt>
//                                         <dd>{formatCurrency(invoice.firefightersSurcharge)}</dd>
//                                     </div>
//                                 </dl>
//                             </div>
//
//                             <div className="border-t pt-4">
//                                 <dl className="space-y-2">
//                                     <div className="flex justify-between text-lg">
//                                         <dt className="font-medium">Total</dt>
//                                         <dd className="font-medium">{formatCurrency(invoice.totalAmount)}</dd>
//                                     </div>
//                                     <div className="flex justify-between text-green-600">
//                                         <dt>Descuento Pronto Pago</dt>
//                                         <dd>-{formatCurrency(invoice.discountAmount)}</dd>
//                                     </div>
//                                     <div className="flex justify-between text-lg font-bold">
//                                         <dt>Total a Pagar</dt>
//                                         <dd>{formatCurrency(invoice.finalAmount)}</dd>
//                                     </div>
//                                 </dl>
//                             </div>
//
//                             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                                 <Button
//                                     className="flex-1"
//                                     onClick={() => router.push(`/payment/${invoice.id}`)}
//                                 >
//                                     <CreditCard className="mr-2 h-4 w-4" />
//                                     Pagar en Línea
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="flex-1"
//                                     onClick={() => router.push(`/payment/${invoice.id}/abono`)}
//                                 >
//                                     <Calculator className="mr-2 h-4 w-4" />
//                                     Realizar Abono
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="flex-1"
//                                 >
//                                     <FileDown className="mr-2 h-4 w-4" />
//                                     Descargar PDF
//                                 </Button>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }
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

export default function InvoiceDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ property: Property; invoice: Invoice } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isSubscribed = true;
        console.log('🔄 Efecto iniciado - ID de factura:', params.id);

        // IIFE (Immediately Invoked Function Expression)
        void (async () => {
            try {
                console.log('⏳ Iniciando búsqueda de factura...');
                setLoading(true);

                const result = await InvoiceService.searchInvoice('NUMERO_FACTURA', params.id as string);
                console.log('📄 Resultado de búsqueda:', result);

                if (isSubscribed) {
                    if (result) {
                        console.log('✅ Datos encontrados, actualizando estado...');
                        setData(result);
                    } else {
                        console.log('❌ No se encontró la factura');
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
                    console.log('🏁 Finalizando carga...');
                    setLoading(false);
                }
            }
        })();

        return () => {
            console.log('🧹 Limpieza ejecutada - isSubscribed establecido a false');
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

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Información de la propiedad */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información del Predio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Propietario</dt>
                                <dd className="mt-1">{property.owner}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Identificación</dt>
                                <dd className="mt-1">{property.identification}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                                <dd className="mt-1">{property.address}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Comuna</dt>
                                <dd className="mt-1">{property.commune}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Estrato</dt>
                                <dd className="mt-1">{property.stratum}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Avalúo</dt>
                                <dd className="mt-1">{formatCurrency(property.value)}</dd>
                            </div>
                        </dl>
                    </CardContent>
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
                                <dl className="space-y-2">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Impuesto Predial Unificado</dt>
                                        <dd>{formatCurrency(invoice.unifiedPropertyTax)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">CVC</dt>
                                        <dd>{formatCurrency(invoice.cvc)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Alumbrado Público</dt>
                                        <dd>{formatCurrency(invoice.publicLighting)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Sobretasa Bomberos</dt>
                                        <dd>{formatCurrency(invoice.firefightersSurcharge)}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border-t pt-4">
                                <dl className="space-y-2">
                                    <div className="flex justify-between text-lg">
                                        <dt className="font-medium">Total</dt>
                                        <dd className="font-medium">{formatCurrency(invoice.totalAmount)}</dd>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <dt>Descuento Pronto Pago</dt>
                                        <dd>-{formatCurrency(invoice.discountAmount)}</dd>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <dt>Total a Pagar</dt>
                                        <dd>{formatCurrency(invoice.finalAmount)}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    className="flex-1"
                                    onClick={() => router.push(`/payment/${invoice.id}`)}
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pagar en Línea
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.push(`/payment/${invoice.id}/abono`)}
                                >
                                    <Calculator className="mr-2 h-4 w-4" />
                                    Realizar Abono
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <FileDown className="mr-2 h-4 w-4" />
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