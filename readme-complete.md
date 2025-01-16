# Portal de Impuesto Predial - Property tax prototype 🏛️

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1+-000000.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2.1.8-black.svg)](https://ui.shadcn.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15+-F69220.svg)](https://pnpm.io/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-0.471.1-purple.svg)](https://lucide.dev/)
[![jsPDF](https://img.shields.io/badge/jsPDF-2.5+-red.svg)](https://github.com/parallax/jsPDF)

Portal web moderno para la consulta y pago de impuestos prediales de la Gobernación del Tolima, ofreciendo una experiencia fluida y segura para los ciudadanos.

## ✨ Características Principales

[![Consulta](https://img.shields.io/badge/Módulo-Consulta-blue.svg)](#consulta)
[![Pagos](https://img.shields.io/badge/Módulo-Pagos-green.svg)](#pagos)
[![Abonos](https://img.shields.io/badge/Módulo-Abonos-yellow.svg)](#abonos)
[![Comprobantes](https://img.shields.io/badge/Módulo-Comprobantes-red.svg)](#comprobantes)

- **📋 Consulta de Facturas**
  - Búsqueda por número de factura o ID predial
  - Visualización detallada de la información
  - Validación del estado actual

- **💳 Sistema de Pagos**
  - Integración completa con PSE
  - Aplicación automática de descuentos
  - Sistema de abonos parciales
  - Comprobantes digitales

- **📄 Generación de Comprobantes**
  - PDFs estandarizados
  - Diferenciación entre pagos y abonos
  - Descarga automática

## 🛠️ Tecnologías Utilizadas

### Core
- **TypeScript 5.0+** - Lenguaje base con tipado estático
- **Next.js 15.1** - Framework de React con SSR y routing
- **pnpm** - Gestor de paquetes rápido y eficiente

### Estilos y UI
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes reutilizables y accesibles
- **Lucide Icons** - Set de iconos modernos y personalizables

### Utilidades
- **jsPDF** - Generación de documentos PDF
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd predial_tax_prototype

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

## 🧪 Pruebas

### Facturas de Prueba

[![Vencida](https://img.shields.io/badge/000069704647-Vencida-red.svg)](#)
[![Con Descuento](https://img.shields.io/badge/000011123448-Con_Descuento-green.svg)](#)
[![Pagada](https://img.shields.io/badge/000011123450-Pagada-blue.svg)](#)

### Casos de Uso Recomendados

| Caso de Prueba | Descripción | Resultado Esperado |
|----------------|-------------|-------------------|
| Factura Vencida | `000069704647` | Sin descuento aplicable |
| Con Descuento | `000011123448` | Descuento por pronto pago |
| Ya Pagada | `000011123450` | Muestra estado pagado |
| Abono Parcial | Cualquier factura pendiente | Mínimo $30,000 |
| Factura Inválida | Números aleatorios | Mensaje de error |

## 🏗️ Estructura del Proyecto

```plaintext
.
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── src
│   ├── app
│   │   ├── config
│   │   │   └── routes.ts
│   │   ├── globals.css
│   │   ├── invoice                      # Módulo de factura/invoice
│   │   │   ├── [id]                     # Ruta dinámica factura específica
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx                 # Página consulta factura
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Página principal/Home
│   │   └── payment                      # Módulo de pago
│   │       ├── [id]
│   │       │   ├── confirmation
│   │       │   │   └── page.tsx
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── components
│   │   ├── home
│   │   │   ├── HeroSection.tsx
│   │   │   └── InfoSection.tsx
│   │   ├── invoice                      # Componentes específicos factura
│   │   │   ├── InvoiceDetails.tsx
│   │   │   ├── InvoiceForm.tsx          # Formulario consulta factura
│   │   │   ├── InvoiceOptions.tsx       # Opciones (descargar/pagar/abonar)
│   │   │   └── InvoicePreview.tsx       # Vista previa factura PDF
│   │   ├── payment                      # Componentes de pago
│   │   │   ├── AbonoForm.tsx            # Formulario de abono
│   │   │   ├── InvoiceSummary.tsx
│   │   │   └── PSEForm.tsx              # Formulario pago PSE
│   │   ├── shared
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui                          # Componentes que sean necesarios
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── stepper.tsx
│   │       ├── toaster.tsx
│   │       ├── toast.tsx
│   │       └── tooltip.tsx
│   ├── data
│   │   ├── BanksMockData.ts             # Lista bancos PSE
│   │   ├── InvoiceMockData.ts           # Datos factura predial
│   │   ├── NavMockData.ts
│   │   └── PropertyMockData.ts          # Datos predio
│   ├── hooks
│   │   ├── useAbono.ts                  # Hook proceso abono
│   │   ├── useInvoice.ts                # Hook consulta factura
│   │   ├── usePayment.ts                # Hook proceso pago
│   │   └── use-toast.ts               
│   ├── lib
│   │   ├── constants.ts                 # Constantes
│   │   ├── formatUtils.ts
│   │   ├── pdf-generator.ts             # Utilidades generación PDF
│   │   └── utils.ts                     # Utilidades generales
│   ├── services                         # Servicios para lógica de negocio
│   │   ├── api                          # Servicios API base
│   │   │   ├── client.ts                # Cliente API base
│   │   │   └── config.ts                # Configuración API (endpoints, headers)
│   │   ├── invoice                      # Servicios relacionados a facturas
│   │   │   ├── invoice.service.ts       # Métodos CRUD factura
│   │   │   └── types.ts                 # Tipos específicos del servicio
│   │   ├── payment                      # Servicios relacionados a pagos
│   │   │   ├── payment.service.ts       # Lógica de pagos y PSE
│   │   │   └── types.ts                 # Tipos específicos del servicio
│   │   └── property                     # Servicios relacionados a predios 
│   │       ├── property.service.ts      # Consultas de predios
│   │       └── types.ts                 # Tipos específicos del servicio
│   ├── store                            # Estado global si necesario
│   │   └── invoiceStore.ts              # Estado factura actual
│   └── types
│       ├── commonTypes.ts               # Interfaces comunes
│       ├── invoiceDetailsTypes.ts
│       ├── invoiceTypes.ts              # Interfaces factura
│       ├── navigation.ts 
│       ├── paymentPSETypes.ts           # Interfaces PSE
│       ├── paymentTypes.ts              # Interfaces pago
│       ├── propertyTypes.ts             # Interfaces predio
│       └── stepperTypes.ts              # Interfaces stepper
├── tailwind.config.ts
└── tsconfig.json

```

## 🤝 Contribución

[![Contribuciones](https://img.shields.io/badge/Contribuciones-Bienvenidas-brightgreen.svg)](#contribución)

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Licencia

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

https://github.com/pnpm/pnpm

## 🌟 

[![Autor](https://img.shields.io/badge/anvorja-blue.svg)](https://github.com/anvorja/)
