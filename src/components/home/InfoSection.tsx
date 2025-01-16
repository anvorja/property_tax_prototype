// components/home/InfoSection.tsx
import { Info, Building2, TrendingUp } from 'lucide-react'

export const InfoSection = () => {
    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Info className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-bold">
                            Información Importante
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-l-blue-600 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <h3 className="font-medium">Desarrollo Departamental</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Los recursos provenientes del recaudo por impuesto predial
                                contribuyen a la recuperación del departamento
                            </p>
                        </div>
                        <div className="border-l-4 border-l-blue-600 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <h3 className="font-medium">Impacto Positivo</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                El pago de los impuestos permite el desarrollo de programas y
                                proyectos que benefician a toda la ciudadanía
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}