// components/shared/Footer.tsx
export const Footer = () => {
    return (
        <footer className="bg-gray-50 py-4 border-t"> {/* Reducido el padding */}
            <div className="container mx-auto px-4">
                <div className="text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Departamento del Tolima</p>
                    <p>Todos los Derechos Reservados</p>
                </div>
            </div>
        </footer>
    )
}