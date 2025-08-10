"use client";

import { useState } from "react";
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
import { currencyFormat } from "@/utils/currency-format";
import { SendIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";
import { EditRemittanceDialog } from "./remittances/edit-remittance-dialog";
import { AddRemittanceDialog } from "./remittances/add-remittance-dialog";

interface RemittancesDetailSectionProps {
  form: UseFormReturn<Donation>;
}

export function RemittancesDetailSection({
  form,
}: RemittancesDetailSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const remittancesDetail = form.watch("remittancesDetail") || [];
  const totalRemittances = remittancesDetail.reduce(
    (sum: number, r: { amount: string }) => sum + (parseFloat(r.amount) || 0),
    0
  );

  const openAddDialog = () => setIsAddDialogOpen(true);

  const handleDelete = (index: number) => {
    const current = form.getValues("remittancesDetail") || [];
    form.setValue(
      "remittancesDetail",
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="my-4 h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <SendIcon className="h-5 w-5" />
          Remesas:{" "}
          <span className="font-semibold font-mono">
            {currencyFormat(totalRemittances)}
          </span>
        </CardTitle>
        {remittancesDetail.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openAddDialog}
          >
            Agregar Remesa
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        {remittancesDetail.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center py-8">
            <SendIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-base font-medium text-muted-foreground mb-1">
              No hay remesas registradas
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Agrega las transferencias bancarias recibidas.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openAddDialog}
            >
              Agregar Primera Remesa
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remittancesDetail.map(
                (r: { name: string; amount: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-right font-mono">
                      {currencyFormat(parseFloat(r.amount) || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditRemittanceDialog
                          form={form}
                          remittance={r}
                          index={index}
                          onEdit={() => {}}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableCell className="font-semibold">Total Remesas</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalRemittances)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AddRemittanceDialog
        form={form}
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </Card>
  );
}
