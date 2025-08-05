"use server";

import { jsPDF } from "jspdf";
import { autoTable, CellHookData } from "jspdf-autotable";
import { donationSchema, Donation } from "../_lib/donations-schema";
import { actionClient } from "@/lib/safe-action";

// Type declarations for jsPDF with autoTable
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}

async function generateDonationPDF(data: Donation) {
  try {
    // Create new PDF document
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica");

    let yPosition = 20;

    // Service Information Section - as text instead of table
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Información del Servicio", 20, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    // Service info as text with bold labels
    doc.setFont("helvetica", "bold");
    doc.text("Fecha:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.serviceDate}`, 35, yPosition);

    doc.setFont("helvetica", "bold");
    doc.text("Tipo:", 120, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`${getServiceTypeLabel(data.serviceType)}`, 135, yPosition);
    yPosition += 4;

    doc.setFont("helvetica", "bold");
    doc.text("Predicador:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.preacher}`, 50, yPosition);
    yPosition += 4;

    doc.setFont("helvetica", "bold");
    doc.text("Tema:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.sermonTopic}`, 35, yPosition);
    yPosition += 4;

    if (data.serviceDescription) {
      doc.setFont("helvetica", "bold");
      doc.text("Descripción:", 20, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(`${data.serviceDescription}`, 55, yPosition);
      yPosition += 4;
    }

    yPosition += 4;

    // Attendance Section
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Asistencia", 20, yPosition);
    yPosition += 4;

    const childrenAttendance = parseInt(data.childrenAttendance || "0");
    const adultAttendance = parseInt(data.adultAttendance || "0");
    const templeServers = parseInt(data.templeServers || "0");
    const bibleSchoolServers = parseInt(data.bibleSchoolServers || "0");
    const totalAttendance =
      childrenAttendance + adultAttendance + templeServers + bibleSchoolServers;

    const attendanceInfo = [
      ["Asistencia de Niños", childrenAttendance.toString()],
      ["Asistencia de Adultos", adultAttendance.toString()],
      ["Servidores del Templo", templeServers.toString()],
      ["Servidores Escuela Bíblica", bibleSchoolServers.toString()],
      ["TOTAL ASISTENCIA", totalAttendance.toString()],
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [["Tipo", "Cantidad"]],
      body: attendanceInfo,
      theme: "plain",
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 9,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: "auto", fontStyle: "bold" },
        1: { cellWidth: 30, halign: "center" },
      },
      didParseCell: function (cellData: CellHookData) {
        if (cellData.row.index === 4) {
          // Total row (last row)
          cellData.cell.styles.fontStyle = "bold";
          cellData.cell.styles.fillColor = [240, 240, 240];
          cellData.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });

    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 6;

    // Financial Totals Section
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Totales Financieros", 20, yPosition);
    yPosition += 4;

    const totalOfferings = parseFloat(data.totalOfferings || "0");
    const totalTithes = parseFloat(data.totalTithes || "0");
    const otherIncome = parseFloat(data.otherIncome || "0");
    const totalFinancial = totalOfferings + totalTithes + otherIncome;

    const financialInfo = [
      ["Total de Ofrendas", formatCurrency(totalOfferings)],
      ["Total de Diezmos", formatCurrency(totalTithes)],
      ["Otros Ingresos", formatCurrency(otherIncome)],
      ["TOTAL FINANCIERO", formatCurrency(totalFinancial)],
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [["Concepto", "Monto"]],
      body: financialInfo,
      theme: "plain",
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 9,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: "auto", fontStyle: "bold" },
        1: { cellWidth: 50, halign: "right" },
      },
      didParseCell: function (cellData: CellHookData) {
        if (cellData.row.index === 3) {
          // Total row (last row)
          cellData.cell.styles.fontStyle = "bold";
          cellData.cell.styles.fillColor = [240, 240, 240];
          cellData.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });

    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 6;

    // Cash Breakdown Section
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Desglose de Efectivo", 20, yPosition);
    yPosition += 4;

    // Coins
    const coins001 = parseInt(data.coins_001 || "0");
    const coins005 = parseInt(data.coins_005 || "0");
    const coins010 = parseInt(data.coins_010 || "0");
    const coins025 = parseInt(data.coins_025 || "0");
    const coins100 = parseInt(data.coins_100 || "0");

    const coinsInfo = [
      ["$0.01", coins001.toString(), formatCurrency(coins001 * 0.01)],
      ["$0.05", coins005.toString(), formatCurrency(coins005 * 0.05)],
      ["$0.10", coins010.toString(), formatCurrency(coins010 * 0.1)],
      ["$0.25", coins025.toString(), formatCurrency(coins025 * 0.25)],
      ["$1.00", coins100.toString(), formatCurrency(coins100 * 1.0)],
    ];

    const totalCoins =
      coins001 * 0.01 +
      coins005 * 0.05 +
      coins010 * 0.1 +
      coins025 * 0.25 +
      coins100 * 1.0;

    // Coins table (left side)
    autoTable(doc, {
      startY: yPosition,
      head: [["MONEDAS", "Cant.", "Subtotal"]],
      body: [...coinsInfo, ["TOTAL", "", formatCurrency(totalCoins)]],
      theme: "plain",
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 8,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      margin: { left: 20, right: 105 },
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: 25, fontStyle: "bold" },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 30, halign: "right" },
      },
      didParseCell: function (cellData: CellHookData) {
        if (cellData.row.index === 5) {
          // Total row (last row)
          cellData.cell.styles.fontStyle = "bold";
          cellData.cell.styles.fillColor = [240, 240, 240];
          cellData.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });

    // Bills
    const bills001 = parseInt(data.bills_001 || "0");
    const bills005 = parseInt(data.bills_005 || "0");
    const bills010 = parseInt(data.bills_010 || "0");
    const bills020 = parseInt(data.bills_020 || "0");
    const bills050 = parseInt(data.bills_050 || "0");
    const bills100 = parseInt(data.bills_100 || "0");

    const billsInfo = [
      ["$1", bills001.toString(), formatCurrency(bills001 * 1)],
      ["$5", bills005.toString(), formatCurrency(bills005 * 5)],
      ["$10", bills010.toString(), formatCurrency(bills010 * 10)],
      ["$20", bills020.toString(), formatCurrency(bills020 * 20)],
      ["$50", bills050.toString(), formatCurrency(bills050 * 50)],
      ["$100", bills100.toString(), formatCurrency(bills100 * 100)],
    ];

    const totalBills =
      bills001 * 1 +
      bills005 * 5 +
      bills010 * 10 +
      bills020 * 20 +
      bills050 * 50 +
      bills100 * 100;

    // Bills table (right side)
    autoTable(doc, {
      startY: yPosition,
      head: [["BILLETES", "Cant.", "Subtotal"]],
      body: [...billsInfo, ["TOTAL", "", formatCurrency(totalBills)]],
      theme: "plain",
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 8,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      margin: { left: 115, right: 20 },
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: 25, fontStyle: "bold" },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 30, halign: "right" },
      },
      didParseCell: function (cellData: CellHookData) {
        if (cellData.row.index === 6) {
          // Total row (last row)
          cellData.cell.styles.fontStyle = "bold";
          cellData.cell.styles.fillColor = [240, 240, 240];
          cellData.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });

    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 6;

    // Total Cash Counted
    const totalCashCounted = totalCoins + totalBills;
    const difference = totalCashCounted - totalFinancial;

    autoTable(doc, {
      startY: yPosition,
      head: [["RESUMEN", "Monto"]],
      body: [
        ["Total Efectivo Contado", formatCurrency(totalCashCounted)],
        ["Total Financiero", formatCurrency(totalFinancial)],
        ["Diferencia", formatCurrency(difference)],
      ],
      theme: "plain",
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 9,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: "auto", fontStyle: "bold" },
        1: { cellWidth: 50, halign: "right" },
      },
      didParseCell: function (cellData: CellHookData) {
        if (cellData.row.index === 2) {
          // Difference row (last row)
          const diff = parseFloat(difference.toString());
          if (Math.abs(diff) < 0.01) {
            cellData.cell.styles.fillColor = [230, 255, 230]; // Light green
          } else {
            cellData.cell.styles.fillColor = [255, 230, 230]; // Light red
          }
          cellData.cell.styles.fontStyle = "bold";
          cellData.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });

    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 6;

    // Tithes Detail Section if there are any
    if (data.tithesDetail && data.tithesDetail.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text("Detalle de Diezmos", 20, yPosition);
      yPosition += 4;

      const tithesDetailRows = data.tithesDetail.map(
        (tithe: { name: string; amount: string }) => [
          tithe.name,
          formatCurrency(parseFloat(tithe.amount) || 0),
        ]
      );

      const totalTithesDetail = data.tithesDetail.reduce(
        (sum: number, tithe: { name: string; amount: string }) =>
          sum + (parseFloat(tithe.amount) || 0),
        0
      );

      autoTable(doc, {
        startY: yPosition,
        head: [["Nombre", "Monto"]],
        body: [
          ...tithesDetailRows,
          ["TOTAL DIEZMOS DETALLE", formatCurrency(totalTithesDetail)],
        ],
        theme: "plain",
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          fontSize: 9,
          lineColor: [0, 0, 0],
          lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
        },
        margin: { left: 20, right: 20 },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineColor: [0, 0, 0],
          lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
        },
        columnStyles: {
          0: { cellWidth: "auto", fontStyle: "bold" },
          1: { cellWidth: 50, halign: "right" },
        },
        didParseCell: function (cellData: CellHookData) {
          if (cellData.row.index === tithesDetailRows.length) {
            // Total row (last row)
            cellData.cell.styles.fontStyle = "bold";
            cellData.cell.styles.fillColor = [240, 240, 240];
            cellData.cell.styles.lineWidth = {
              top: 0.1,
              bottom: 0,
              left: 0,
              right: 0,
            };
          }
        },
      });

      yPosition = (doc.lastAutoTable?.finalY || yPosition) + 6;
    }

    // Signatures Section - Compact lines like notebook
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Firmas de los Servidores", 20, yPosition);
    yPosition += 6;

    // Headers
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Nombres", 30, yPosition);
    doc.text("Firmas", 120, yPosition);
    yPosition += 4;

    // Draw 4 lines for servers
    doc.setFont("helvetica", "normal");
    doc.setDrawColor(0, 0, 0);
    for (let i = 0; i < 4; i++) {
      doc.line(20, yPosition, 90, yPosition); // Name line
      doc.line(110, yPosition, 190, yPosition); // Signature line
      yPosition += 8;
    }

    // Supervisor section
    yPosition += 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SUPERVISOR:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.line(60, yPosition - 2, 190, yPosition - 2);

    yPosition += 6;

    // Generate the PDF as base64
    const pdfBase64 = doc.output("datauristring");

    return {
      success: true,
      data: {
        pdfBase64,
        filename: `reporte-donaciones-${data.serviceDate}.pdf`,
      },
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      success: false,
      error: "Error al generar el PDF",
    };
  }
}

function getServiceTypeLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    sundayServiceAM: "Servicio dominical AM",
    sundayServicePM: "Servicio dominical PM",
    mondayService: "Familias en victoria",
    tuesdayService: "Torre de oración",
    wednesdayService: "Estudio bíblico",
    thursdayService: "Amaneciendo con Dios",
    fridayService: "Viernes de milagros",
    saturdayService: "Servicio de jóvenes",
    specialService: "Servicio especial",
  };
  return labels[serviceType] || serviceType;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export const generatePdfAction = actionClient
  .inputSchema(donationSchema)
  .action(async ({ parsedInput }: { parsedInput: Donation }) => {
    return await generateDonationPDF(parsedInput);
  });
