"use server";

import { jsPDF } from "jspdf";
import { autoTable, CellHookData } from "jspdf-autotable";
import { donationSchema, Donation } from "../_lib/donations-schema";
import { actionClient } from "@/lib/safe-action";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

async function generateDonationPDF(data: Donation) {
  try {
    const doc = new jsPDF();
    doc.setFont("helvetica");

    const drawHeader = () => {
      const headerText = "Tabernáculo Rush Creek El Salvador";
      const pageWidth: number = (
        doc as unknown as { internal: { pageSize: { getWidth: () => number } } }
      ).internal.pageSize.getWidth();
      doc.setFontSize(11).setFont("helvetica", "bold");
      doc.text(headerText, pageWidth / 2, 12, { align: "center" });
      doc
        .setDrawColor(0, 0, 0)
        .setLineWidth(0.2)
        .line(15, 14, pageWidth - 15, 14);
      doc.setFont("helvetica", "normal");
    };
    drawHeader();

    let yPosition = 22;

    // Información del Servicio
    doc.setFontSize(10).setTextColor(40, 40, 40).setFont("helvetica", "bold");
    doc.text("Información del Servicio", 20, yPosition);
    yPosition += 10; // extra space after service info section
    doc.setFontSize(9).setTextColor(60, 60, 60).setFont("helvetica", "normal");

    const col1LabelX = 20;
    const col1ValueX = 40;
    const col2LabelX = 100;
    const col2ValueX = 128;
    const rowHeight = 5;

    // Row 1
    doc.setFont("helvetica", "bold").text("Fecha:", col1LabelX, yPosition);
    doc
      .setFont("helvetica", "normal")
      .text(`${data.serviceDate}`, col1ValueX, yPosition);
    doc.setFont("helvetica", "bold").text("Tipo:", col2LabelX, yPosition);
    doc
      .setFont("helvetica", "normal")
      .text(`${getServiceTypeLabel(data.serviceType)}`, col2ValueX, yPosition);
    yPosition += rowHeight;
    // Row 2
    doc.setFont("helvetica", "bold").text("Predicador:", col1LabelX, yPosition);
    doc
      .setFont("helvetica", "normal")
      .text(`${data.preacher}`, col1ValueX, yPosition);
    doc.setFont("helvetica", "bold").text("Tema:", col2LabelX, yPosition);
    doc
      .setFont("helvetica", "normal")
      .text(`${data.sermonTopic}`, col2ValueX, yPosition);
    yPosition += rowHeight;
    // Description
    if (data.serviceDescription) {
      doc
        .setFont("helvetica", "bold")
        .text("Descripción:", col1LabelX, yPosition);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(data.serviceDescription, 170);
      doc.text(descLines, col1ValueX, yPosition);
      yPosition += descLines.length * 4 + 1;
    }
    yPosition += 6;

    // Asistencia
    doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(40, 40, 40);
    doc.text("Asistencia", 20, yPosition);
    yPosition += 4;
    const childrenAttendance = parseInt(data.childrenAttendance || "0");
    const adultAttendance = parseInt(data.adultAttendance || "0");
    const templeServers = parseInt(data.templeServers || "0");
    const bibleSchoolServers = parseInt(data.bibleSchoolServers || "0");
    const totalAttendance =
      childrenAttendance + adultAttendance + templeServers + bibleSchoolServers;
    autoTable(doc, {
      startY: yPosition,
      head: [["Tipo", "Cantidad"]],
      body: [
        ["Asistencia de Niños", childrenAttendance.toString()],
        ["Asistencia de Adultos", adultAttendance.toString()],
        ["Servidores del Templo", templeServers.toString()],
        ["Servidores Escuela Bíblica", bibleSchoolServers.toString()],
        ["TOTAL ASISTENCIA", totalAttendance.toString()],
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
        0: { fontStyle: "bold" },
        1: { cellWidth: 30, halign: "center" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 4) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
          cell.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });
    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 12; // more gap after attendance table

    // Desglose de Efectivo (dos tablas lado a lado)
    doc
      .setFontSize(10)
      .setFont("helvetica", "bold")
      .text("Desglose de Efectivo", 20, yPosition);
    yPosition += 4;
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
    const pageWidthCash: number = (
      doc as unknown as { internal: { pageSize: { getWidth: () => number } } }
    ).internal.pageSize.getWidth();
    const contentWidthCash = pageWidthCash - 40; // margins
    const gap = 6;
    const halfWidth = (contentWidthCash - gap) / 2;
    const leftX = 20;
    const rightX = 20 + halfWidth + gap;
    const cashStartY = yPosition;
    // Monedas
    autoTable(doc, {
      startY: cashStartY,
      head: [["MONEDAS", "Cant.", "Subtotal"]],
      body: [...coinsInfo, ["TOTAL", "", formatCurrency(totalCoins)]],
      theme: "plain",
      tableWidth: halfWidth,
      margin: { left: leftX },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 8,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: halfWidth * 0.45, fontStyle: "bold" },
        1: { cellWidth: halfWidth * 0.18, halign: "center" },
        2: { cellWidth: halfWidth * 0.37, halign: "right" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 5) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
          cell.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });
    const coinsTableY = doc.lastAutoTable?.finalY || cashStartY;
    // Billetes
    autoTable(doc, {
      startY: cashStartY,
      head: [["BILLETES", "Cant.", "Subtotal"]],
      body: [...billsInfo, ["TOTAL", "", formatCurrency(totalBills)]],
      theme: "plain",
      tableWidth: halfWidth,
      margin: { left: rightX },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 8,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: halfWidth * 0.45, fontStyle: "bold" },
        1: { cellWidth: halfWidth * 0.18, halign: "center" },
        2: { cellWidth: halfWidth * 0.37, halign: "right" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 6) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
          cell.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0,
            left: 0,
            right: 0,
          };
        }
      },
    });
    const billsTableY = doc.lastAutoTable?.finalY || cashStartY;
    yPosition = Math.max(coinsTableY, billsTableY) + 12; // more gap after cash breakdown

    // Totales Financieros
    const totalTithes =
      data.tithesDetail?.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0) ||
      0;
    const totalRemittances =
      data.remittancesDetail?.reduce(
        (s, r) => s + (parseFloat(r.amount) || 0),
        0
      ) || 0;
    const totalChecks =
      data.checksDetail?.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0) ||
      0;
    const totalOtherDonations =
      data.otherDonationsDetail?.reduce(
        (s, o) => s + (parseFloat(o.amount) || 0),
        0
      ) || 0;
    const totalCashCounted = totalCoins + totalBills;
    const totalOfferings = Math.max(
      totalCashCounted +
        totalRemittances +
        totalChecks -
        totalTithes -
        totalOtherDonations,
      0
    );
    const totalFinancial = totalTithes + totalOfferings + totalOtherDonations;
    doc
      .setFontSize(10)
      .setFont("helvetica", "bold")
      .text("Totales Financieros", 20, yPosition);
    yPosition += 4;
    autoTable(doc, {
      startY: yPosition,
      head: [["CONCEPTO", "Monto"]],
      body: [
        ["Total Diezmos", formatCurrency(totalTithes)],
        ["Total Remesas", formatCurrency(totalRemittances)],
        ["Total Cheques", formatCurrency(totalChecks)],
        ["Total Otras Donaciones", formatCurrency(totalOtherDonations)],
        ["Total Ofrendas", formatCurrency(totalOfferings)],
        ["TOTAL FINANCIERO", formatCurrency(totalFinancial)],
        ["Total Efectivo Contado", formatCurrency(totalCashCounted)],
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
        0: { fontStyle: "bold" },
        1: { cellWidth: 50, halign: "right" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 4) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
        }
      },
    });
    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 12; // more gap after totals table

    // Firmas (primera página)
    doc
      .setFontSize(10)
      .setFont("helvetica", "bold")
      .setTextColor(40, 40, 40)
      .text("Firmas de los Servidores", 20, yPosition);
    yPosition += 5; // slightly more space under section title
    doc
      .setFontSize(8.5)
      .text("NOMBRE", 25, yPosition)
      .text("FIRMA", 120, yPosition);
    yPosition += 6; // more gap so first line leaves room for handwriting
    doc.setFont("helvetica", "normal").setDrawColor(0, 0, 0);
    const signatureLineHeight = 9; // increased vertical spacing per signer
    for (let i = 0; i < 3; i++) {
      doc.line(20, yPosition, 90, yPosition); // name line
      doc.line(110, yPosition, 190, yPosition); // signature line
      yPosition += signatureLineHeight;
    }
    // Supervisor label and line aligned on same baseline
    doc
      .setFont("helvetica", "bold")
      .setFontSize(8.5)
      .text("SUPERVISOR", 20, yPosition);
    const supervisorLineY = yPosition + 1.5; // a bit below label for clarity
    doc.line(45, supervisorLineY, 190, supervisorLineY);
    yPosition += signatureLineHeight; // maintain consistent spacing after block

    const hasAnyDetail =
      (data.tithesDetail?.length || 0) > 0 ||
      (data.remittancesDetail?.length || 0) > 0 ||
      (data.checksDetail?.length || 0) > 0 ||
      (data.otherDonationsDetail?.length || 0) > 0;
    if (hasAnyDetail) {
      doc.addPage();
      drawHeader();
      yPosition = 22;
    }

    const renderDetail = (
      title: string,
      rows: { name: string; amount: string }[] | undefined,
      totalLabel: string
    ) => {
      if (!rows || rows.length === 0) return;
      doc
        .setFontSize(10)
        .setFont("helvetica", "bold")
        .text(title, 20, yPosition);
      yPosition += 4;
      const mapped = rows.map((r) => [
        r.name,
        formatCurrency(parseFloat(r.amount) || 0),
      ]);
      const total = rows.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
      autoTable(doc, {
        startY: yPosition,
        head: [["Nombre", "Monto"]],
        body: [...mapped, [totalLabel, formatCurrency(total)]],
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
          overflow: "linebreak",
        },
        columnStyles: {
          0: { fontStyle: "bold" },
          1: { cellWidth: 50, halign: "right" },
        },
        didParseCell: (cell: CellHookData) => {
          if (cell.row.index === mapped.length) {
            cell.cell.styles.fontStyle = "bold";
            cell.cell.styles.fillColor = [240, 240, 240];
            cell.cell.styles.lineWidth = {
              top: 0.1,
              bottom: 0,
              left: 0,
              right: 0,
            };
          }
        },
      });
      // Extra spacing after each detail table for clearer separation
      yPosition = (doc.lastAutoTable?.finalY || yPosition) + 14;
    };

    // Detalles
    renderDetail(
      "Detalle de Diezmos",
      data.tithesDetail,
      "TOTAL DIEZMOS DETALLE"
    );
    renderDetail(
      "Detalle de Remesas",
      data.remittancesDetail,
      "TOTAL REMESAS DETALLE"
    );
    renderDetail(
      "Detalle de Cheques",
      data.checksDetail,
      "TOTAL CHEQUES DETALLE"
    );
    renderDetail(
      "Detalle de Otras Donaciones",
      data.otherDonationsDetail,
      "TOTAL OTRAS DONACIONES DETALLE"
    );

    const pdfBase64 = doc.output("datauristring");
    return {
      success: true,
      data: {
        pdfBase64,
        filename: `reporte-donaciones-${data.serviceDate}.pdf`,
      },
    };
  } catch (err) {
    console.error("Error generating PDF", err);
    return { success: false, error: "Error al generar el PDF" };
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
