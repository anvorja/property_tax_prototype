// components/home/HeroSection.tsx
import { Button } from '@/components/ui/button'
import { Calendar, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {ROUTES} from "@/app/config/routes";

export const HeroSection = () => {
    return (
        <div className="py-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl font-bold">
                        Aproveche y pague el impuesto predial 2024{' '}
                        <span className="text-blue-600">sin intereses</span>
                    </h1>
                    <p className="text-gray-600">
                        Hasta el 30 de enero puede pagar el predial del 2024 sin interés de mora.
                    </p>

                    <div className="flex justify-center gap-20 py-4">
                        <div className="text-center">
                            <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <h3 className="font-medium">Fecha Límite</h3>
                            <p className="text-sm text-gray-600">30 Enero 2024</p>
                        </div>
                        <div className="text-center">
                            <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <h3 className="font-medium">Pago Seguro</h3>
                            <p className="text-sm text-gray-600">PSE y más</p>
                        </div>
                    </div>

                    <Link href={ROUTES.INVOICE}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Consultar y Pagar Ahora
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}