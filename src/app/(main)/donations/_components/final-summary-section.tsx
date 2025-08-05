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
import { DifferenceMessage } from "./difference-message";

interface FinalSummarySectionProps {
  form: UseFormReturn<Donation>;
  canSubmit: boolean;
}

export function FinalSummarySection({
  form,
  canSubmit,
}: FinalSummarySectionProps) {
  const totalOfferings = parseFloat(
    (form.watch("totalOfferings") as string) || "0"
  );
  const totalTithes = parseFloat((form.watch("totalTithes") as string) || "0");
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

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CoinsIcon className="h-5 w-5" />
          Resumen Final de Donaciones
        </CardTitle>
        <Button type="submit" disabled={!canSubmit}>
          <SendIcon className="h-5 w-5 mr-2" />
          Finalizar registro
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ofrendas</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalOfferings)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Diezmos</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalTithes)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Otros ingresos</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(otherIncome)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  Total registrado
                </TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalFinancial)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Desgloce</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal Monedas </TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalCoins)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subtotal Billetes </TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalBills)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  Total efectivo contado
                </TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalCashCounted)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Separator className="my-4" />
        <DifferenceMessage
          difference={difference}
          currencyFormat={currencyFormat}
        />
      </CardContent>
    </Card>
  );
}
