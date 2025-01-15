// // src/lib/pdf-generator.ts
// import { Invoice, Property } from '@/types/invoiceTypes';
// import jsPDF from "jspdf";
// import { formatCurrency } from './formatUtils';
//
// export const generatePaymentReceipt = (
//     invoice: Invoice,
//     property: Property,
//     transactionId: string,
//     paymentDate: string
// ) => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.width;
//
//     // Header
//     pdf.addImage("https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png", "PNG", 20, 10, 40, 40); // Ajusta según tu logo
//     pdf.setFontSize(20);
//     pdf.setTextColor(0, 51, 127);
//     pdf.text("Gobernación del Tolima", pageWidth / 2, 30, { align: "center" });
//     pdf.setFontSize(16);
//     pdf.text("Comprobante de Pago - Impuesto Predial", pageWidth / 2, 40, { align: "center" });
//
//     // Transaction Details
//     pdf.setFontSize(12);
//     pdf.setTextColor(0, 0, 0);
//     pdf.text("Detalles de la Transacción", 20, 60);
//     pdf.setFontSize(10);
//     pdf.text(`Número de Transacción: ${transactionId}`, 20, 70);
//     pdf.text(`Fecha de Pago: ${new Date(paymentDate).toLocaleString()}`, 20, 80);
//     pdf.text(`Número de Factura: ${invoice.documentNumber}`, 20, 90);
//
//     // Property Information
//     pdf.setFontSize(12);
//     pdf.text("Información del Predio", 20, 110);
//     pdf.setFontSize(10);
//     pdf.text(`ID Predio: ${property.propertyNumber}`, 20, 120);
//     pdf.text(`Propietario: ${property.owner}`, 20, 130);
//     pdf.text(`Identificación: ${property.identification}`, 20, 140);
//     pdf.text(`Dirección: ${property.address}`, 20, 150);
//     pdf.text(`Comuna: ${property.commune}`, 20, 160);
//     pdf.text(`Estrato: ${property.stratum}`, 20, 170);
//
//     // Payment Details
//     pdf.setFontSize(12);
//     pdf.text("Detalle del Pago", 20, 190);
//     pdf.setFontSize(10);
//
//     // Table header
//     pdf.text("Concepto", 20, 200);
//     pdf.text("Valor", pageWidth - 50, 200);
//
//     // Table content
//     let yPos = 210;
//     pdf.text("Impuesto Predial Unificado", 20, yPos);
//     pdf.text(formatCurrency(invoice.unifiedPropertyTax), pageWidth - 50, yPos);
//
//     yPos += 10;
//     pdf.text("CVC", 20, yPos);
//     pdf.text(formatCurrency(invoice.cvc), pageWidth - 50, yPos);
//
//     yPos += 10;
//     pdf.text("Alumbrado Público", 20, yPos);
//     pdf.text(formatCurrency(invoice.publicLighting), pageWidth - 50, yPos);
//
//     yPos += 10;
//     pdf.text("Sobretasa Bomberil", 20, yPos);
//     pdf.text(formatCurrency(invoice.firefightersSurcharge), pageWidth - 50, yPos);
//
//     // Total
//     yPos += 20;
//     pdf.setFont('helvetica', 'bold');
//     pdf.text("Total Pagado", 20, yPos);
//     pdf.text(formatCurrency(invoice.finalAmount), pageWidth - 50, yPos);
//
//     // Footer
//     pdf.setFont('helvetica', 'normal');
//     pdf.setFontSize(8);
//     const footerText = "Este documento es una constancia de pago del impuesto predial.";
//     pdf.text(footerText, pageWidth / 2, pdf.internal.pageSize.height - 10, { align: "center" });
//
//     return pdf;
// };


// src/lib/pdf-generator.ts
import { Invoice, Property } from '@/types/invoiceTypes';
import jsPDF from "jspdf";
import { formatCurrency } from './formatUtils';

export const generatePaymentReceipt = (
    invoice: Invoice,
    property: Property,
    transactionId: string,
    paymentDate: string
) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const centerX = pageWidth / 2;

    // Colores
    const primaryColor = { r: 0, g: 32, b: 96 };
    const secondaryColor = { r: 100, g: 100, b: 100 };
    const lineColor = { r: 0, g: 84, b: 168 };

    // Función helper para dibujar líneas divisorias
    const drawDivider = (y: number) => {
        pdf.setDrawColor(lineColor.r, lineColor.g, lineColor.b);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, pageWidth - margin, y);
    };

    // Header con logo y título
    const logoWidth = 25;
    const logoHeight = 25;
    let yPos = 15;
    pdf.addImage("https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736840733/tolima_kabbtq.png", "PNG", margin, yPos, logoWidth, logoHeight);

    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Gobernación del Tolima", margin + logoWidth + 10, yPos + 10);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Comprobante de Pago - Impuesto Predial", margin + logoWidth + 10, yPos + 18);

    yPos += 35;
    drawDivider(yPos);

    // Detalles de la Transacción
    yPos += 12;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Detalles de la Transacción", margin, yPos);
    yPos += 12;

    // Información de la transacción en dos columnas
    pdf.setFontSize(9);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);

    const labelX = margin + 5;



    const transactionInfo = [
        { label: "Número de Transacción:", value: transactionId },
        { label: "Fecha de Pago:", value: new Date(paymentDate).toLocaleString() },
        { label: "Número de Factura:", value: invoice.documentNumber }
    ];

    transactionInfo.forEach(item => {
        pdf.setFont("helvetica", "bold");
        const labelWidth = pdf.getTextWidth(item.label);
        pdf.text(item.label, labelX, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.text(item.value, labelX + labelWidth + 4, yPos);
        yPos += 8;
    });

    yPos += 5;
    drawDivider(yPos);

    // Información del Predio
    yPos += 12;
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Información del Predio", margin, yPos);
    yPos += 12;

    // Detalles del predio
    pdf.setFontSize(9);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);

    const propertyInfo = [
        { label: "ID Predio:", value: property.propertyNumber },
        { label: "Propietario:", value: property.owner },
        { label: "Identificación:", value: property.identification },
        { label: "Dirección:", value: property.address },
        { label: "Comuna:", value: property.commune },
        { label: "Estrato:", value: property.stratum.toString() }
    ];

    propertyInfo.forEach(item => {
        pdf.setFont("helvetica", "bold");
        const labelWidth = pdf.getTextWidth(item.label);
        pdf.text(item.label, labelX, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.text(item.value, labelX + labelWidth + 4, yPos);
        yPos += 8;
    });

    yPos += 5;
    drawDivider(yPos);

    // Detalle del Pago
    yPos += 12;
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Detalle del Pago", margin, yPos);
    yPos += 12;

    // Headers de la tabla
    pdf.setFontSize(9);
    pdf.text("Concepto", margin + 5, yPos);
    pdf.text("Valor", pageWidth - margin - 40, yPos);
    yPos += 4;
    drawDivider(yPos);
    yPos += 8;

    // Contenido de la tabla
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    pdf.setFont("helvetica", "normal");
    const payments = [
        { concept: "Impuesto Predial Unificado", amount: invoice.unifiedPropertyTax },
        { concept: "CVC", amount: invoice.cvc },
        { concept: "Alumbrado Público", amount: invoice.publicLighting },
        { concept: "Sobretasa Bomberil", amount: invoice.firefightersSurcharge }
    ];

    payments.forEach(item => {
        pdf.text(item.concept, margin + 5, yPos);
        pdf.text(formatCurrency(item.amount), pageWidth - margin - 40, yPos);
        yPos += 8;
    });

    yPos += 2;
    drawDivider(yPos);
    yPos += 10;

    // Total
    pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    pdf.setFont("helvetica", "bold");
    pdf.text("Total Pagado", margin + 5, yPos);
    pdf.text(formatCurrency(invoice.finalAmount), pageWidth - margin - 40, yPos);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    pdf.setFont("helvetica", "normal");
    const footerText = "Este documento es una constancia de pago del impuesto predial.";
    pdf.text(footerText, centerX, pageHeight - 15, { align: "center" });

    return pdf;
};