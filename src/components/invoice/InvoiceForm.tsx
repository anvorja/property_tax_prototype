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

export const InvoiceForm = () => {
    const [criterioBusqueda, setCriterioBusqueda] = useState<string>('')
    const [numeroReferencia, setNumeroReferencia] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO:
        // Aquí irá la lógica de búsqueda
        console.log({ criterioBusqueda, numeroReferencia })
    }

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
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Consultar
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