// // src/components/payment/InvoiceSummary.tsx
// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { formatCurrency } from '@/lib/formatUtils';
// import { PaymentSummaryProps } from '@/types/paymentTypes';
// import { Receipt, User, MapPin, Clock, ArrowLeft, Printer } from 'lucide-react';
//
// export const InvoiceSummary: React.FC<PaymentSummaryProps> = ({
//                                                                   invoice,
//                                                                   property,
//                                                                   showActions = true
//                                                               }) => {
//     const today = new Date();
//     const dueDate = new Date(invoice.dueDate);
//     const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//
//     return (
//         <Card className="shadow-sm">
//             <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                     <Receipt className="h-5 w-5" />
//                     Resumen de Factura
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                     {/* Información básica */}
//                     <div className="grid gap-3 text-sm">
//                         <div className="flex items-center gap-2">
//                             <User className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Propietario:</span>
//                             <span className="font-medium">{property.owner}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <MapPin className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Dirección:</span>
//                             <span className="font-medium">{property.address}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Clock className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Vencimiento:</span>
//                             <span className="font-medium">{dueDate.toLocaleDateString()}</span>
//                         </div>
//                     </div>
//
//                     {/* Totales */}
//                     <div className="mt-6 space-y-3">
//                         <div className="flex justify-between text-gray-600">
//                             <span>Total</span>
//                             <span>{formatCurrency(invoice.totalAmount)}</span>
//                         </div>
//                         {daysLeft > 0 && (
//                             <div className="flex justify-between text-green-600 text-sm bg-green-50 p-2 rounded">
//                                 <span>Descuento Pronto Pago</span>
//                                 <span>-{formatCurrency(invoice.discountAmount)}</span>
//                             </div>
//                         )}
//                         <div className="flex justify-between font-medium text-lg pt-2 border-t">
//                             <span>Total a Pagar</span>
//                             <span className="text-blue-600">
//                                 {formatCurrency(daysLeft > 0 ? invoice.finalAmount : invoice.totalAmount)}
//                             </span>
//                         </div>
//
//                         {showActions && (
//                             <div className="flex gap-2 mt-4 pt-4 border-t">
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="w-full"
//                                     onClick={() => window.print()}
//                                 >
//                                     <Printer className="mr-2 h-4 w-4" />
//                                     Imprimir
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="w-full"
//                                     onClick={() => window.history.back()}
//                                 >
//                                     <ArrowLeft className="mr-2 h-4 w-4" />
//                                     Volver
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// latest
// src/components/payment/InvoiceSummary.tsx
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatUtils';
import { PaymentSummaryProps } from '@/types/paymentTypes';
import { Receipt, User, MapPin, Clock, ArrowLeft, Printer } from 'lucide-react';

export const InvoiceSummary: React.FC<PaymentSummaryProps> = ({
                                                                  invoice,
                                                                  property,
                                                                  showActions = true
                                                              }) => {
    const searchParams = useSearchParams();
    const isAbono = searchParams.get('tipo') === 'abono';
    const montoAbono = Number(searchParams.get('monto')) || 0;

    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    {isAbono ? 'Resumen del Abono' : 'Resumen de Factura'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Información básica */}
                    <div className="grid gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Propietario:</span>
                            <span className="font-medium">{property.owner}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Dirección:</span>
                            <span className="font-medium">{property.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Vencimiento:</span>
                            <span className="font-medium">{dueDate.toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Totales */}
                    <div className="mt-6 space-y-3">
                        {isAbono ? (
                            <>
                                <div className="flex justify-between text-gray-600">
                                    <span>Valor total factura</span>
                                    <span>{formatCurrency(invoice.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-blue-600 bg-blue-50 p-2 rounded">
                                    <span>Monto del abono</span>
                                    <span className="font-medium">{formatCurrency(montoAbono)}</span>
                                </div>
                                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                    <span>Saldo pendiente</span>
                                    <span className="text-gray-900">{formatCurrency(invoice.totalAmount - montoAbono)}</span>
                                </div>
                                <div className="bg-amber-50 p-2 rounded text-sm text-amber-700">
                                    Nota: Los abonos no aplican para descuento por pronto pago
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between text-gray-600">
                                    <span>Total</span>
                                    <span>{formatCurrency(invoice.totalAmount)}</span>
                                </div>
                                {daysLeft > 0 && (
                                    <div className="flex justify-between text-green-600 text-sm bg-green-50 p-2 rounded">
                                        <span>Descuento Pronto Pago</span>
                                        <span>-{formatCurrency(invoice.discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                    <span>Total a Pagar</span>
                                    <span className="text-blue-600">
                                        {formatCurrency(daysLeft > 0 ? invoice.finalAmount : invoice.totalAmount)}
                                    </span>
                                </div>
                            </>
                        )}

                        {showActions && (
                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => window.print()}
                                >
                                    <Printer className="mr-2 h-4 w-4" />
                                    Imprimir
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Volver
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// // src/components/payment/InvoiceSummary.tsx
// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { formatCurrency } from '@/lib/formatUtils';
// import { PaymentSummaryProps } from '@/types/paymentTypes';
// import { Receipt, User, MapPin, Clock, ArrowLeft, Printer } from 'lucide-react';
//
// export const InvoiceSummary: React.FC<PaymentSummaryProps> = ({
//                                                                   invoice,
//                                                                   property,
//                                                                   showActions = true
//                                                               }) => {
//     const today = new Date();
//     const dueDate = new Date(invoice.dueDate);
//     const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//
//     return (
//         <Card className="shadow-lg">  {/* Cambiar shadow-sm por shadow-lg */}
//             <CardHeader className="text-center border-b pb-6"> {/* Añadir clases para coincidir con PSEForm */}
//                 <CardTitle className="text-lg flex items-center gap-2">
//                     <Receipt className="h-5 w-5" />
//                     Resumen de Factura
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//             <div className="space-y-4">
//                     {/* Información básica */}
//                     <div className="grid gap-3 text-sm">
//                         <div className="flex items-center gap-2">
//                             <User className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Propietario:</span>
//                             <span className="font-medium">{property.owner}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <MapPin className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Dirección:</span>
//                             <span className="font-medium">{property.address}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Clock className="h-4 w-4 text-gray-500" />
//                             <span className="text-gray-600">Vencimiento:</span>
//                             <span className="font-medium">{dueDate.toLocaleDateString()}</span>
//                         </div>
//                     </div>
//
//                     {/* Totales */}
//                     <div className="mt-6 space-y-3">
//                         <div className="flex justify-between text-gray-600">
//                             <span>Total</span>
//                             <span>{formatCurrency(invoice.totalAmount)}</span>
//                         </div>
//                         {daysLeft > 0 && (
//                             <div className="flex justify-between text-green-600 text-sm bg-green-50 p-2 rounded">
//                                 <span>Descuento Pronto Pago</span>
//                                 <span>-{formatCurrency(invoice.discountAmount)}</span>
//                             </div>
//                         )}
//                         <div className="flex justify-between font-medium text-lg pt-2 border-t">
//                             <span>Total a Pagar</span>
//                             <span className="text-blue-600">
//                                 {formatCurrency(daysLeft > 0 ? invoice.finalAmount : invoice.totalAmount)}
//                             </span>
//                         </div>
//
//                         {showActions && (
//                             <div className="flex gap-2 mt-4 pt-4 border-t">
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="w-full"
//                                     onClick={() => window.print()}
//                                 >
//                                     <Printer className="mr-2 h-4 w-4" />
//                                     Imprimir
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="w-full"
//                                     onClick={() => window.history.back()}
//                                 >
//                                     <ArrowLeft className="mr-2 h-4 w-4" />
//                                     Volver
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };