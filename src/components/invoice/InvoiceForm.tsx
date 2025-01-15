// // src/components/invoice/InvoiceForm.tsx
// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card } from '@/components/ui/card'
// import { Info } from 'lucide-react'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
//
// export const InvoiceForm = () => {
//     const [criterioBusqueda, setCriterioBusqueda] = useState<string>('')
//     const [numeroReferencia, setNumeroReferencia] = useState<string>('')
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         // TODO:
//         // Aquí irá la lógica de búsqueda
//         console.log({ criterioBusqueda, numeroReferencia })
//     }
//
//     return (
//         <Card className="max-w-2xl mx-auto p-6">
//             <div className="mb-6">
//                 <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <Info className="w-4 h-4 text-blue-600" />
//                     Aquí podrá descargar o imprimir las facturas que corresponden a Impuesto Predial, Valorización, ICA y RetelCA, ingresando el número de referencia.
//                 </p>
//             </div>
//
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Seleccione el tipo de renta a consultar:
//                         </label>
//                         <Select disabled defaultValue="PREDIAL">
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Seleccione tipo de renta" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="PREDIAL">PREDIAL</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Seleccione el criterio de búsqueda:
//                         </label>
//                         <Select onValueChange={setCriterioBusqueda} value={criterioBusqueda}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Seleccione una opción" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="NUMERO_FACTURA">Número de factura a pagar</SelectItem>
//                                 <SelectItem value="ID_PREDIO">ID PREDIO</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Digite el número de referencia:
//                         </label>
//                         <Input
//                             type="text"
//                             value={numeroReferencia}
//                             onChange={(e) => setNumeroReferencia(e.target.value)}
//                             placeholder="Digite ID Predio - Identificación - Nro. Documento"
//                         />
//                     </div>
//                 </div>
//
//                 <div className="flex justify-between">
//                     <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//                         Consultar
//                     </Button>
//                     <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => {
//                             setCriterioBusqueda('')
//                             setNumeroReferencia('')
//                         }}
//                     >
//                         Limpiar consulta
//                     </Button>
//                 </div>
//             </form>
//         </Card>
//     )
// }


// src/components/invoice/InvoiceForm.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Info } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {InvoiceService} from "@/services/invoice/invoice.service";

export const InvoiceForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [criterioBusqueda, setCriterioBusqueda] = useState<string>('');
    const [numeroReferencia, setNumeroReferencia] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!criterioBusqueda || !numeroReferencia) {
            toast({
                title: "Campos requeridos",
                description: "Por favor complete todos los campos",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            const result = await InvoiceService.searchInvoice(criterioBusqueda, numeroReferencia);

            if (!result) {
                toast({
                    title: "Factura no encontrada",
                    description: "No se encontraron facturas con los criterios especificados.",
                    variant: "destructive"
                });
                return;
            }

            if (result.invoice.status === 'paid') {
                toast({
                    title: "Factura ya pagada",
                    description: `Esta factura fue pagada el ${new Date(result.invoice.paymentDate!).toLocaleDateString()}. Transacción: ${result.invoice.transactionId}`,
                    variant: "default"
                });
                return;
            }

            // Si la factura existe y está pendiente, redirigir al detalle
            router.push(`/invoice/${result.invoice.id}`);

        } catch {
            toast({
                title: "Error",
                description: "Ocurrió un error al buscar la factura. Intente nuevamente.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Card className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Aquí podrá descargar o imprimir las facturas que corresponden a Impuesto Predial, Valorización, ICA y RetelCA, ingresando el número de referencia.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Seleccione el tipo de renta a consultar:
                        </label>
                        <Select disabled defaultValue="PREDIAL">
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de renta" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PREDIAL">PREDIAL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Seleccione el criterio de búsqueda:
                        </label>
                        <Select onValueChange={setCriterioBusqueda} value={criterioBusqueda}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NUMERO_FACTURA">Número de factura a pagar</SelectItem>
                                <SelectItem value="ID_PREDIO">ID PREDIO</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Digite el número de referencia:
                        </label>
                        <Input
                            type="text"
                            value={numeroReferencia}
                            onChange={(e) => setNumeroReferencia(e.target.value)}
                            placeholder="Digite ID Predio - Identificación - Nro. Documento"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Consultando..." : "Consultar"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setCriterioBusqueda('')
                            setNumeroReferencia('')
                        }}
                    >
                        Limpiar consulta
                    </Button>
                </div>
            </form>
        </Card>
    )
}