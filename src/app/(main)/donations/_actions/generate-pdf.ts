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
      doc.setFontSize(13).setFont("helvetica", "bold");
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
    doc.setFontSize(12).setTextColor(40, 40, 40).setFont("helvetica", "bold");
    doc.text("Información del Servicio", 20, yPosition);
    yPosition += 6; // reduced space after service info section
    doc.setFontSize(10).setTextColor(60, 60, 60).setFont("helvetica", "normal");

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
    yPosition += 4;

    // Asistencia y Actividades Ministeriales
    doc.setFontSize(12).setFont("helvetica", "bold").setTextColor(40, 40, 40);
    doc.text("Resumen del Servicio", 20, yPosition);
    yPosition += 4;
    const childrenAttendance = parseInt(data.childrenAttendance || "0");
    const adultAttendance = parseInt(data.adultAttendance || "0");
    const templeServers = parseInt(data.templeServers || "0");
    const bibleSchoolServers = parseInt(data.bibleSchoolServers || "0");
    const totalAttendance =
      childrenAttendance + adultAttendance + templeServers + bibleSchoolServers;

    const faithProfessions = parseInt(data.faithProfessions || "0");
    const baptisms = parseInt(data.baptisms || "0");
    const holyCommunion = parseInt(data.lordsSupper || "0");
    const totalMinisterialActivities =
      faithProfessions + baptisms + holyCommunion;

    // Configuración para las dos tablas lado a lado
    const pageWidthSummary: number = (
      doc as unknown as { internal: { pageSize: { getWidth: () => number } } }
    ).internal.pageSize.getWidth();
    const contentWidthSummary = pageWidthSummary - 40; // margins
    const gapSummary = 6;
    const halfWidthSummary = (contentWidthSummary - gapSummary) / 2;
    const leftXSummary = 20;
    const rightXSummary = 20 + halfWidthSummary + gapSummary;
    const summaryStartY = yPosition;

    // Tabla de Asistencia (izquierda)
    autoTable(doc, {
      startY: summaryStartY,
      head: [["Asistencia", "Cant."]],
      body: [
        ["Niños", childrenAttendance.toString()],
        ["Adultos", adultAttendance.toString()],
        ["Serv. Templo", templeServers.toString()],
        ["Serv. Esc. Bíblica", bibleSchoolServers.toString()],
        ["TOTAL ASISTENCIA", totalAttendance.toString()],
      ],
      theme: "plain",
      tableWidth: halfWidthSummary,
      margin: { left: leftXSummary },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 11,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { fontStyle: "bold" },
        1: { halign: "center" },
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

    // Tabla de Actividades Ministeriales (derecha)
    autoTable(doc, {
      startY: summaryStartY,
      head: [["Actividades Ministeriales", "Cant."]],
      body: [
        ["Profesiones de Fe", faithProfessions.toString()],
        ["Bautismos", baptisms.toString()],
        ["Santa Cena", holyCommunion.toString()],
        ["", ""],
        ["TOTAL ACTIVIDADES", totalMinisterialActivities.toString()],
      ],
      theme: "plain",
      tableWidth: halfWidthSummary,
      margin: { left: rightXSummary },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 11,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { fontStyle: "bold" },
        1: { halign: "center" },
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
    yPosition = (doc.lastAutoTable?.finalY || yPosition) + 8; // reduced gap after attendance table

    // Desglose de Efectivo (dos tablas lado a lado)
    doc
      .setFontSize(12)
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
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 9,
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
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 9,
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
    yPosition = Math.max(coinsTableY, billsTableY) + 8; // reduced gap after cash breakdown

    // Totales Financieros
    const totalTithes =
      data.tithesDetail?.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0) ||
      0;

    // Calcular remesas y cheques desde diezmos y otras donaciones
    const allItems = [
      ...(data.tithesDetail || []),
      ...(data.otherDonationsDetail || []),
    ];
    const totalRemittances = allItems
      .filter((item) => item.type === "remesa")
      .reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
    const totalChecks = allItems
      .filter((item) => item.type === "cheque")
      .reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
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
      .setFontSize(12)
      .setFont("helvetica", "bold")
      .text("Totales Financieros", 20, yPosition);
    yPosition += 4;

    // Calcular dimensiones para tablas lado a lado
    const pageWidthFinancial: number = (
      doc as unknown as { internal: { pageSize: { getWidth: () => number } } }
    ).internal.pageSize.getWidth();
    const contentWidthFinancial = pageWidthFinancial - 40; // margins
    const gapFinancial = 6;
    const halfWidthFinancial = (contentWidthFinancial - gapFinancial) / 2;
    const leftXFinancial = 20;
    const rightXFinancial = 20 + halfWidthFinancial + gapFinancial;
    const financialStartY = yPosition;

    // Primera tabla: Desglose (lado izquierdo)
    autoTable(doc, {
      startY: financialStartY,
      head: [["DESGLOSE", "Monto"]],
      body: [
        ["Subtotal Monedas", formatCurrency(totalCoins)],
        ["Subtotal Billetes", formatCurrency(totalBills)],
        ["Total efectivo contado", formatCurrency(totalCashCounted)],
        ["Remesas", formatCurrency(totalRemittances)],
        ["Cheques", formatCurrency(totalChecks)],
        [
          "TOTAL DEL DESGLOSE",
          formatCurrency(totalCashCounted + totalRemittances + totalChecks),
        ],
      ],
      theme: "plain",
      tableWidth: halfWidthFinancial,
      margin: { left: leftXFinancial },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 9,
        cellPadding: 1.5,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: halfWidthFinancial * 0.65, fontStyle: "bold" },
        1: { cellWidth: halfWidthFinancial * 0.35, halign: "right" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 2 || cell.row.index === 5) {
          // Total efectivo contado y Total del desglose
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
          cell.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0.1,
            left: 0,
            right: 0,
          };
        }
      },
    });

    // Segunda tabla: Totales por concepto (lado derecho)
    autoTable(doc, {
      startY: financialStartY,
      head: [["TOTALES", "Monto"]],
      body: [
        ["Ofrendas", formatCurrency(totalOfferings)],
        ["Diezmos", formatCurrency(totalTithes)],
        ["Otras Donaciones", formatCurrency(totalOtherDonations)],
        ["TOTAL REGISTRADO", formatCurrency(totalFinancial)],
      ],
      theme: "plain",
      tableWidth: halfWidthFinancial,
      margin: { left: rightXFinancial },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      styles: {
        fontSize: 9,
        cellPadding: 1.5,
        lineColor: [0, 0, 0],
        lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
      },
      columnStyles: {
        0: { cellWidth: halfWidthFinancial * 0.65, fontStyle: "bold" },
        1: { cellWidth: halfWidthFinancial * 0.35, halign: "right" },
      },
      didParseCell: (cell: CellHookData) => {
        if (cell.row.index === 3) {
          // Total registrado
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.fillColor = [240, 240, 240];
          cell.cell.styles.lineWidth = {
            top: 0.1,
            bottom: 0.1,
            left: 0,
            right: 0,
          };
        }
      },
    });

    const desgloseTableY = doc.lastAutoTable?.finalY || financialStartY;
    // Note: doc.lastAutoTable will have the info from the last table rendered (TOTALES table)
    // Since both tables start at the same Y position, we take the finalY from the last one
    yPosition = desgloseTableY + 20; // increased gap after totals tables to avoid overlap with signatures

    // Firmas (primera página)
    doc
      .setFontSize(12)
      .setFont("helvetica", "bold")
      .setTextColor(40, 40, 40)
      .text("Firmas de los Servidores", 20, yPosition);
    yPosition += 4; // reduced space under section title
    doc
      .setFontSize(10)
      .text("NOMBRE", 25, yPosition)
      .text("FIRMA", 120, yPosition);
    yPosition += 5; // reduced gap so first line leaves room for handwriting
    doc.setFont("helvetica", "normal").setDrawColor(0, 0, 0);
    const signatureLineHeight = 8; // reduced vertical spacing per signer
    for (let i = 0; i < 3; i++) {
      doc.line(20, yPosition, 90, yPosition); // name line
      doc.line(110, yPosition, 190, yPosition); // signature line
      yPosition += signatureLineHeight;
    }
    // Supervisor label and line aligned on same baseline
    doc
      .setFont("helvetica", "bold")
      .setFontSize(10)
      .text("SUPERVISOR", 20, yPosition);
    const supervisorLineY = yPosition + 1.5; // a bit below label for clarity
    doc.line(45, supervisorLineY, 190, supervisorLineY);
    yPosition += signatureLineHeight; // maintain consistent spacing after block

    const hasAnyDetail =
      (data.tithesDetail?.length || 0) > 0 ||
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
        .setFontSize(12)
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
          fontSize: 11,
          lineColor: [0, 0, 0],
          lineWidth: { top: 0, bottom: 0.1, left: 0, right: 0 },
        },
        margin: { left: 20, right: 20 },
        styles: {
          fontSize: 10,
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
      "Detalle de Otras Donaciones",
      data.otherDonationsDetail,
      "TOTAL OTRAS DONACIONES DETALLE"
    );

    // Renderizar remesas (filtradas de diezmos y otras donaciones)
    const remesasItems = allItems.filter((item) => item.type === "remesa");
    if (remesasItems.length > 0) {
      renderDetail("Detalle de Remesas", remesasItems, "TOTAL REMESAS DETALLE");
    }

    // Renderizar cheques (filtrados de diezmos y otras donaciones)
    const chequesItems = allItems.filter((item) => item.type === "cheque");
    if (chequesItems.length > 0) {
      renderDetail("Detalle de Cheques", chequesItems, "TOTAL CHEQUES DETALLE");
    }

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
