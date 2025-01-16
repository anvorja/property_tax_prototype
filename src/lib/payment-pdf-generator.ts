// src/lib/payment-pdf-generator.ts
import { Invoice, Property } from '@/types/invoiceTypes';
import jsPDF from "jspdf";
import { formatCurrency } from './formatUtils';

export interface PaymentReceiptParams {
    invoice: Invoice;
    property: Property;
    transactionId: string;
    paymentDate: string;
    isAbono?: boolean;
    montoAbono?: number;
}

export const generatePaymentReceipt = ({
                                           invoice,
                                           property,
                                           transactionId,
                                           paymentDate,
                                           isAbono = false,
                                           montoAbono
                                       }: PaymentReceiptParams) => {
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

    yPos += 2;
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

    yPos += 2;
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

    // Verificar si aplica descuento
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Totales
    if (isAbono) {
        // Si es un abono, mostrar valor total, monto abonado y saldo pendiente
        pdf.setFont("helvetica", "normal");
        pdf.text("Valor total factura:", margin + 5, yPos);
        pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 40, yPos);
        yPos += 10;

        pdf.setTextColor(0, 84, 168); // Azul para el abono
        pdf.setFont("helvetica", "bold");
        pdf.text("Monto del abono:", margin + 5, yPos);
        pdf.text(formatCurrency(montoAbono || 0), pageWidth - margin - 40, yPos);
        yPos += 10;

        const saldoPendiente = invoice.totalAmount - (montoAbono || 0);
        pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        pdf.text("Saldo pendiente:", margin + 5, yPos);
        pdf.text(formatCurrency(saldoPendiente), pageWidth - margin - 40, yPos);
        yPos += 15;

        // Nota sobre no aplicar descuento
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(183, 107, 0); // Color ámbar para la nota
        pdf.text("Nota: Los abonos no son beneficiarios del descuento por pronto pago", margin + 5, yPos);
    } else {
        // Totales para pago completo (código existente)
        pdf.setFont("helvetica", "bold");
        pdf.text("Total", margin + 5, yPos);
        pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 40, yPos);
        yPos += 15;

        // Verificar si aplica descuento
        if (daysLeft > 0 && invoice.discountAmount > 0) {
            pdf.setTextColor(0, 128, 0);
            pdf.text("Descuento Pronto Pago", margin + 5, yPos);
            pdf.text(`-${formatCurrency(invoice.discountAmount)}`, pageWidth - margin - 40, yPos);
            yPos += 15;

            pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
            pdf.text("Total Pagado", margin + 5, yPos);
            pdf.text(formatCurrency(invoice.finalAmount), pageWidth - margin - 40, yPos);
        } else {
            pdf.setTextColor(220, 38, 38);
            pdf.text("Fecha límite superada - No aplica descuento", margin + 5, yPos);
            yPos += 15;

            pdf.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
            pdf.text("Total Pagado", margin + 5, yPos);
            pdf.text(formatCurrency(invoice.totalAmount), pageWidth - margin - 40, yPos);
        }
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    pdf.setFont("helvetica", "normal");
    const footerText = "Este documento es una constancia de pago del impuesto predial.";
    pdf.text(footerText, centerX, pageHeight - 15, { align: "center" });

    return pdf;
};