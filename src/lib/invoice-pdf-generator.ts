// // src/lib/invoice-pdf-generator.ts
// import { Invoice, Property } from '@/types/invoiceTypes';
// import jsPDF from "jspdf";
// import { formatCurrency } from './formatUtils';
//
// export const generateInvoiceDetails = (
//     invoice: Invoice,
//     property: Property,
// ) => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.width;
//     const margin = 20;
//
//     // Colores
//     const primaryColor = { r: 0, g: 32, b: 96 };
//     const secondaryColor = { r: 100, g: 100, b: 100 };
//     const lineColor = { r: 0, g: 84, b: 168 };
//
//     // Helper para líneas divisorias
//     const drawDivider = (y: number) => {
//         pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
//         pdf.setLineWidth(0.5);
//         pdf.line(margin, y, pageWidth - margin, y);
//     };
//
//     // Header con logo y título
//     let yPos = 15;
//     pdf.addImage("https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png", "PNG", margin, yPos, 25, 25);
//
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(16);
//     pdf.text("Gobernación del Tolima", margin + 35, yPos + 10);
//
//     pdf.setFontSize(12);
//     pdf.text("Impuesto Predial", margin + 35, yPos + 18);
//
//     yPos += 35;
//     drawDivider(yPos);
//
//     // Información del Predio
//     yPos += 15;
//     pdf.setFontSize(14);
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.text("Información del Predio", margin, yPos);
//     pdf.setFontSize(9);
//     pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
//     pdf.text(`ID Predio: ${property.propertyNumber}`, pageWidth - margin - 100, yPos);
//
//     yPos += 15;
//
//     // Detalles del predio
//     const propertyInfo = [
//         { label: "Propietario:", value: property.owner },
//         { label: "Identificación:", value: property.identification },
//         { label: "Dirección:", value: property.address },
//         { label: "Comuna:", value: property.commune },
//         { label: "Estrato:", value: property.stratum.toString() },
//         { label: "Avalúo:", value: formatCurrency(property.value) }
//     ];
//
//     propertyInfo.forEach(item => {
//         pdf.setFont("helvetica", "bold");
//         pdf.text(item.label, margin, yPos);
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.value, margin + 50, yPos);
//         yPos += 8;
//     });
//
//     yPos += 10;
//     drawDivider(yPos);
//
//     // Detalles de la Factura
//     yPos += 15;
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(14);
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.text("Detalles de la Factura", margin, yPos);
//     yPos += 15;
//
//     // Información básica de la factura
//     pdf.setFontSize(9);
//     pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
//
//     const invoiceBasicInfo = [
//         { label: "Número de Factura:", value: invoice.documentNumber },
//         { label: "Fecha de Vencimiento:", value: new Date(invoice.dueDate).toLocaleDateString() }
//     ];
//
//     invoiceBasicInfo.forEach(item => {
//         pdf.setFont("helvetica", "bold");
//         pdf.text(item.label, margin, yPos);
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.value, margin + 50, yPos);
//         yPos += 8;
//     });
//
//     yPos += 10;
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Conceptos", margin, yPos);
//     yPos += 10;
//
//     // Tabla de conceptos
//     const concepts = [
//         { label: "Impuesto Predial Unificado", value: invoice.unifiedPropertyTax },
//         { label: "CVC", value: invoice.cvc },
//         { label: "Alumbrado Público", value: invoice.publicLighting },
//         { label: "Sobretasa Bomberil", value: invoice.firefightersSurcharge }
//     ];
//
//     concepts.forEach(item => {
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.label, margin, yPos);
//         pdf.text(formatCurrency(item.value), pageWidth - margin - 30, yPos, { align: "right" });
//         yPos += 8;
//     });
//
//     yPos += 5;
//     drawDivider(yPos);
//     yPos += 10;
//
//     // Totales
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Total", margin, yPos);
//     pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 30, yPos, { align: "right" });
//     yPos += 15;
//
//     // Verificar si aplica descuento
//     const today = new Date();
//     const dueDate = new Date(invoice.dueDate);
//     const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//
//     if (daysLeft > 0 && invoice.discountAmount > 0) {
//         pdf.setTextColor(0, 128, 0); // Verde para el descuento
//         pdf.text("Descuento Pronto Pago", margin, yPos);
//         pdf.text(`-${formatCurrency(invoice.discountAmount)}`, pageWidth - margin - 30, yPos, { align: "right" });
//         yPos += 15;
//     }
//
//     // Total a pagar
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.setFontSize(12);
//     pdf.text("Total a Pagar", margin, yPos);
//     pdf.text(formatCurrency(invoice.finalAmount), pageWidth - margin - 30, yPos, { align: "right" });
//
//     return pdf;
// };

// // src/lib/invoice-pdf-generator.ts
// import { Invoice, Property } from '@/types/invoiceTypes';
// import jsPDF from "jspdf";
// import { formatCurrency } from './formatUtils';
//
// export const generateInvoiceDetails = (
//     invoice: Invoice,
//     property: Property,
// ) => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.width;
//     const margin = 20;
//
//     // Colores
//     const primaryColor = { r: 0, g: 32, b: 96 };
//     const secondaryColor = { r: 100, g: 100, b: 100 };
//     const lineColor = { r: 0, g: 84, b: 168 };
//
//     // Helper para líneas divisorias
//     const drawDivider = (y: number) => {
//         pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
//         pdf.setLineWidth(0.5);
//         pdf.line(margin, y, pageWidth - margin, y);
//     };
//
//     // Header con logo y título
//     let yPos = 15;
//     pdf.addImage("https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png", "PNG", margin, yPos, 25, 25);
//
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(16);
//     pdf.text("Gobernación del Tolima", margin + 35, yPos + 10);
//
//     pdf.setFontSize(12);
//     pdf.text("Impuesto Predial", margin + 35, yPos + 18);
//
//     yPos += 35;
//     drawDivider(yPos);
//
//     // Información del Predio
//     yPos += 15;
//     pdf.setFontSize(14);
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.text("Información del Predio", margin, yPos);
//     pdf.setFontSize(9);
//     pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
//     pdf.text(`ID Predio: ${property.propertyNumber}`, pageWidth - margin - 100, yPos);
//
//     yPos += 15;
//
//     // Detalles del predio
//     const propertyInfo = [
//         { label: "Propietario:", value: property.owner },
//         { label: "Identificación:", value: property.identification },
//         { label: "Dirección:", value: property.address },
//         { label: "Comuna:", value: property.commune },
//         { label: "Estrato:", value: property.stratum.toString() },
//         { label: "Avalúo:", value: formatCurrency(property.value) }
//     ];
//
//     propertyInfo.forEach(item => {
//         pdf.setFont("helvetica", "bold");
//         pdf.text(item.label, margin, yPos);
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.value, margin + 50, yPos);
//         yPos += 8;
//     });
//
//     yPos += 10;
//     drawDivider(yPos);
//
//     // Detalles de la Factura
//     yPos += 15;
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(14);
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.text("Detalles de la Factura", margin, yPos);
//     yPos += 15;
//
//     // Información básica de la factura
//     pdf.setFontSize(9);
//     pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
//
//     const invoiceBasicInfo = [
//         { label: "Número de Factura:", value: invoice.documentNumber },
//         { label: "Fecha de Vencimiento:", value: new Date(invoice.dueDate).toLocaleDateString() }
//     ];
//
//     invoiceBasicInfo.forEach(item => {
//         pdf.setFont("helvetica", "bold");
//         pdf.text(item.label, margin, yPos);
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.value, margin + 50, yPos);
//         yPos += 8;
//     });
//
//     yPos += 10;
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Conceptos", margin, yPos);
//     yPos += 10;
//
//     // Tabla de conceptos
//     const concepts = [
//         { label: "Impuesto Predial Unificado", value: invoice.unifiedPropertyTax },
//         { label: "CVC", value: invoice.cvc },
//         { label: "Alumbrado Público", value: invoice.publicLighting },
//         { label: "Sobretasa Bomberil", value: invoice.firefightersSurcharge }
//     ];
//
//     concepts.forEach(item => {
//         pdf.setFont("helvetica", "normal");
//         pdf.text(item.label, margin, yPos);
//         pdf.text(formatCurrency(item.value), pageWidth - margin - 30, yPos, { align: "right" });
//         yPos += 8;
//     });
//
//     yPos += 5;
//     drawDivider(yPos);
//     yPos += 10;
//
//     // Totales
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Total", margin, yPos);
//     pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 30, yPos, { align: "right" });
//     yPos += 15;
//
//     // Verificar si aplica descuento
//     const today = new Date();
//     const dueDate = new Date(invoice.dueDate);
//     const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//
//     if (daysLeft > 0 && invoice.discountAmount > 0) {
//         pdf.setTextColor(0, 128, 0); // Verde para el descuento
//         pdf.text("Descuento Pronto Pago", margin, yPos);
//         pdf.text(`-${formatCurrency(invoice.discountAmount)}`, pageWidth - margin - 30, yPos, { align: "right" });
//         yPos += 15;
//     }
//
//     // Total a pagar
//     pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
//     pdf.setFontSize(12);
//     pdf.text("Total a Pagar", margin, yPos);
//     pdf.text(formatCurrency(invoice.finalAmount), pageWidth - margin - 30, yPos, { align: "right" });
//
//     return pdf;
// };

// src/lib/invoice-pdf-generator.ts
import { Invoice, Property } from '@/types/invoiceTypes';
import jsPDF from "jspdf";
import { formatCurrency } from './formatUtils';

export const generateInvoiceDetails = (
    invoice: Invoice,
    property: Property,
) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    // Colores
    const primaryColor = { r: 0, g: 32, b: 96 };
    const secondaryColor = { r: 100, g: 100, b: 100 };
    const lineColor = { r: 0, g: 84, b: 168 };

    // Helper para líneas divisorias
    const drawDivider = (y: number) => {
        pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, pageWidth - margin, y);
    };

    // Header con logo y título
    let yPos = 15;
    pdf.addImage("https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png", "PNG", margin, yPos, 25, 25);

    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Gobernación del Tolima", margin + 35, yPos + 10);

    pdf.setFontSize(12);
    pdf.text("Impuesto Predial", margin + 35, yPos + 18);

    yPos += 35;
    drawDivider(yPos);

    // Información del Predio
    yPos += 15;
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.text("Información del Predio", margin, yPos);
    pdf.setFontSize(9);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    pdf.text(`ID Predio: ${property.propertyNumber}`, pageWidth - margin - 100, yPos);

    yPos += 15;

    // Detalles del predio
    const propertyInfo = [
        { label: "Propietario:", value: property.owner },
        { label: "Identificación:", value: property.identification },
        { label: "Dirección:", value: property.address },
        { label: "Comuna:", value: property.commune },
        { label: "Estrato:", value: property.stratum.toString() },
        { label: "Avalúo:", value: formatCurrency(property.value) }
    ];

    propertyInfo.forEach(item => {
        pdf.setFont("helvetica", "bold");
        pdf.text(item.label, margin, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.text(item.value, margin + 50, yPos);
        yPos += 8;
    });

    yPos += 10;
    drawDivider(yPos);

    // Detalles de la Factura
    yPos += 15;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.text("Detalles de la Factura", margin, yPos);
    yPos += 15;

    // Información básica de la factura
    pdf.setFontSize(9);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);

    const invoiceBasicInfo = [
        { label: "Número de Factura:", value: invoice.documentNumber },
        { label: "Fecha de Vencimiento:", value: new Date(invoice.dueDate).toLocaleDateString() }
    ];

    invoiceBasicInfo.forEach(item => {
        pdf.setFont("helvetica", "bold");
        pdf.text(item.label, margin, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.text(item.value, margin + 50, yPos);
        yPos += 8;
    });

    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Conceptos", margin, yPos);
    yPos += 10;

    // Tabla de conceptos
    const concepts = [
        { label: "Impuesto Predial Unificado", value: invoice.unifiedPropertyTax },
        { label: "CVC", value: invoice.cvc },
        { label: "Alumbrado Público", value: invoice.publicLighting },
        { label: "Sobretasa Bomberil", value: invoice.firefightersSurcharge }
    ];

    concepts.forEach(item => {
        pdf.setFont("helvetica", "normal");
        pdf.text(item.label, margin, yPos);
        pdf.text(formatCurrency(item.value), pageWidth - margin - 30, yPos, { align: "right" });
        yPos += 8;
    });

    yPos += 5;
    drawDivider(yPos);
    yPos += 10;

    // Totales
    pdf.setFont("helvetica", "bold");
    pdf.text("Total", margin, yPos);
    pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 30, yPos, { align: "right" });
    yPos += 15;

    // Verificar si aplica descuento
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Total a pagar
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFontSize(12);

    if (daysLeft > 0 && invoice.discountAmount > 0) {
        // Si está dentro del plazo, mostrar descuento y valor con descuento
        pdf.setTextColor(0, 128, 0); // Verde para el descuento
        pdf.text("Descuento Pronto Pago", margin, yPos);
        pdf.text(`-${formatCurrency(invoice.discountAmount)}`, pageWidth - margin - 30, yPos, { align: "right" });
        yPos += 15;

        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        pdf.text("Total a Pagar", margin, yPos);
        pdf.text(formatCurrency(invoice.finalAmount), pageWidth - margin - 30, yPos, { align: "right" });
    } else {
        // Cuando está vencido, mostrar mensaje y valor total sin descuento
        pdf.setTextColor(220, 38, 38); // Color rojo para indicar vencimiento
        pdf.text("Fecha límite superada - No aplica descuento", margin, yPos);
        yPos += 15;

        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        pdf.text("Total a Pagar", margin, yPos);
        pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 30, yPos, { align: "right" });
    }

    // // Footer
    // pdf.setFontSize(8);
    // pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    // pdf.setFont("helvetica", "normal");
    // const footerText = "Este documento es una constancia de pago del impuesto predial.";
    // pdf.text(footerText, pageWidth / 2, pdf.internal.pageSize.height - 15, { align: "center" });

    return pdf;
};