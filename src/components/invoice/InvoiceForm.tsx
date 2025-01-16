// src/components/invoice/InvoiceForm.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {Check, Info} from 'lucide-react'
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
import {formatCurrency} from "@/lib/formatUtils";

export const InvoiceForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [criterioBusqueda, setCriterioBusqueda] = useState<string>('');
    const [numeroReferencia, setNumeroReferencia] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación más explícita
        if (!criterioBusqueda) {
            toast({
                title: "Campo requerido",
                description: "Por favor seleccione un criterio de búsqueda",
                variant: "destructive"
            });
            return;
        }

        if (!numeroReferencia) {
            toast({
                title: "Campo requerido",
                description: "Por favor ingrese el número de referencia",
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
                    variant: "default",
                    title: "Factura Pagada",
                    description: (
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <Check className="h-4 w-4" />
                                <span>La factura del predio {result.property.id} ya fue pagada</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md space-y-1.5">
                                <p className="font-medium text-gray-900">{result.property.owner}</p>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Fecha de pago: {new Date(result.invoice.paymentDate!).toLocaleDateString()}</p>
                                    <p>Transacción: {result.invoice.transactionId}</p>
                                    <p>Valor pagado: {formatCurrency(result.invoice.totalAmount)}</p>
                                </div>
                            </div>
                        </div>
                    ),
                    duration: 8000
                });
                setLoading(false);
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
                        disabled={loading || !criterioBusqueda || !numeroReferencia}
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