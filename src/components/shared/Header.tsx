// components/shared/Header.tsx
import Image from 'next/image'
import { Home, HelpCircle } from 'lucide-react'

export const Header = () => {
    return (
        <header className="bg-[#1e3a8a] w-full">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png"
                            alt="Gobernación del Tolima"
                            width={40}
                            height={40}
                        />
                        <div className="text-white">
                            <h1 className="font-medium">Gobernación del Tolima</h1>
                            <p className="text-sm text-gray-200">Portal de Impuestos</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Home className="w-6 h-6 text-white" />
                        <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </header>
    )
}