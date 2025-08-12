"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormat } from "@/utils/currency-format";
import { CoinsIcon, SendIcon, Loader2, CheckCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface FinalSummarySectionProps {
  form: UseFormReturn<Donation>;
  onSubmit: () => Promise<void> | void;
}

export function FinalSummarySection({
  form,

  onSubmit,
}: FinalSummarySectionProps) {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
      setShowSubmitDialog(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tithesDetail = form.watch("tithesDetail") || [];
  const totalTithes = tithesDetail.reduce(
    (sum, tithe) => sum + (parseFloat(tithe.amount) || 0),
    0
  );

  const otherDonationsDetail = form.watch("otherDonationsDetail") || [];
  const totalOtherDonations = otherDonationsDetail.reduce(
    (sum, o) => sum + (parseFloat(o.amount) || 0),
    0
  );

  const totalRemittances = [...tithesDetail, ...otherDonationsDetail]
    .filter((item) => item.type === "remesa")
    .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const totalChecks = [...tithesDetail, ...otherDonationsDetail]
    .filter((item) => item.type === "cheque")
    .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

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

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <CoinsIcon className="h-5 w-5" />
          Resumen Final de Donaciones
        </CardTitle>
        <Button type="button" onClick={handleSubmitClick}>
          <SendIcon />
          Finalizar registro
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
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
                  <TableCell>Ofrendas</TableCell>
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
      </CardContent>

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Confirmar Registro de Donaciones
            </DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea finalizar y guardar el registro de
              donaciones? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <CheckCircle />
              )}
              Confirmar y Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
