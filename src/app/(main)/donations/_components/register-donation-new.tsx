"use client";

import { Form } from "@/components/ui/form";
import { useRegisterDonation } from "../_hooks/use-register-donation";
import { ServiceInfoSection } from "./service-info-section";
import { AttendanceSection } from "./attendance-section";
import { FinancialTotalSection } from "./financial-total-section";
import { CoinsBreakdownSection } from "./coins-breakdown-section";
import { BillsBreakdownSection } from "./bills-breakdown-section";
import { TithesDetailSection } from "./tithes-detail-section";
import { FinalSummarySection } from "./final-summary-section";

export function RegisterDonation() {
  const { form, onSubmit } = useRegisterDonation();

  const totalTithes = parseFloat((form.watch("totalTithes") as string) || "0");
  const tithesDetail = form.watch("tithesDetail") || [];
  const totalTithesDetail = tithesDetail.reduce(
    (sum, tithe) => sum + (parseFloat(tithe.amount) || 0),
    0
  );
  const tithesDifference = totalTithesDetail - totalTithes;

  const totalOfferings = parseFloat(
    (form.watch("totalOfferings") as string) || "0"
  );
  const otherIncome = parseFloat((form.watch("otherIncome") as string) || "0");
  const totalFinancial = totalOfferings + totalTithes + otherIncome;

  // Calcular totales de monedas
  const coins001 = parseInt((form.watch("coins_001") as string) || "0");
  const coins005 = parseInt((form.watch("coins_005") as string) || "0");
  const coins010 = parseInt((form.watch("coins_010") as string) || "0");
  const coins025 = parseInt((form.watch("coins_025") as string) || "0");
  const coins100 = parseInt((form.watch("coins_100") as string) || "0");

  const totalCoins =
    coins001 * 0.01 +
    coins005 * 0.05 +
    coins010 * 0.1 +
    coins025 * 0.25 +
    coins100 * 1.0;

  // Calcular totales de billetes
  const bills001 = parseInt((form.watch("bills_001") as string) || "0");
  const bills005 = parseInt((form.watch("bills_005") as string) || "0");
  const bills010 = parseInt((form.watch("bills_010") as string) || "0");
  const bills020 = parseInt((form.watch("bills_020") as string) || "0");
  const bills050 = parseInt((form.watch("bills_050") as string) || "0");
  const bills100 = parseInt((form.watch("bills_100") as string) || "0");

  const totalBills =
    bills001 * 1 +
    bills005 * 5 +
    bills010 * 10 +
    bills020 * 20 +
    bills050 * 50 +
    bills100 * 100;

  const totalCashCounted = totalCoins + totalBills;
  const difference = totalCashCounted - totalFinancial;

  const cashMatches = Math.abs(difference) < 0.01;
  const tithesMatch = Math.abs(tithesDifference) < 0.01;
  const canSubmit = cashMatches && tithesMatch;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ServiceInfoSection form={form} />
        <AttendanceSection form={form} />
        <FinancialTotalSection form={form} />
        <CoinsBreakdownSection form={form} />
        <BillsBreakdownSection form={form} />
        <TithesDetailSection form={form} />
        <FinalSummarySection form={form} canSubmit={canSubmit} />
      </form>
    </Form>
  );
}
