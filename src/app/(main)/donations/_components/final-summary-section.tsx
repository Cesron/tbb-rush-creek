"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { currencyFormat } from "@/utils/currency-format";
import { CoinsIcon, SendIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface FinalSummarySectionProps {
  form: UseFormReturn<Donation>;
  totalTithes: number;
  totalOfferings: number;
  totalCashCounted: number;
  totalFinancial: number;
  totalRemittances: number;
  totalChecks: number;
  totalOtherDonations: number;
}

export function FinalSummarySection({
  form,
  totalTithes,
  totalOfferings,
  totalCashCounted,
  totalFinancial,
  totalRemittances,
  totalChecks,
  totalOtherDonations,
}: FinalSummarySectionProps) {
  // Recalcular desglose (solo lectura) para mostrar subtotales
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

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <CoinsIcon className="h-5 w-5" />
          Resumen Final de Donaciones
        </CardTitle>
        <Button type="submit">
          <SendIcon className="h-5 w-5 mr-2" />
          Finalizar registro
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Métodos y conteo físico primero */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Desgloce</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal Monedas</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalCoins)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Subtotal Billetes</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalBills)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted/30">
                  <TableCell className="font-medium">
                    Total efectivo contado
                  </TableCell>
                  <TableCell className="text-right font-bold font-mono">
                    {currencyFormat(totalCashCounted)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remesas</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalRemittances)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cheques</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalChecks)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableCell className="font-semibold">
                    Total desgloce
                  </TableCell>
                  <TableCell className="text-right font-bold font-mono">
                    {currencyFormat(
                      totalCashCounted + totalRemittances + totalChecks
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* Resumen financiero después */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-muted/30">
                  <TableCell className="font-medium">Ofrendas</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalOfferings)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Diezmos</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalTithes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Otras Donaciones</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(totalOtherDonations)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Total registrado
                  </TableCell>
                  <TableCell className="text-right font-bold font-mono">
                    {currencyFormat(totalFinancial)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <Separator className="my-4" />
      </CardContent>
    </Card>
  );
}
