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
import { PaperclipIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";
import { EditCheckDialog } from "./checks/edit-check-dialog";
import { AddCheckDialog } from "./checks/add-check-dialog";

interface ChecksDetailSectionProps {
  form: UseFormReturn<Donation>;
}

export function ChecksDetailSection({ form }: ChecksDetailSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const checksDetail = form.watch("checksDetail") || [];
  const totalChecks = checksDetail.reduce(
    (sum: number, c: { amount: string }) => sum + (parseFloat(c.amount) || 0),
    0
  );

  const openAddDialog = () => setIsAddDialogOpen(true);

  const handleDelete = (index: number) => {
    const current = form.getValues("checksDetail") || [];
    form.setValue(
      "checksDetail",
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="my-4 h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <PaperclipIcon className="h-5 w-5" />
          Cheques:{" "}
          <span className="font-semibold font-mono">
            {currencyFormat(totalChecks)}
          </span>
        </CardTitle>
        {checksDetail.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openAddDialog}
          >
            Agregar Cheque
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        {checksDetail.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center py-8">
            <PaperclipIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-base font-medium text-muted-foreground mb-1">
              No hay cheques registrados
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Agrega los cheques recibidos.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openAddDialog}
            >
              Agregar Primer Cheque
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
              {checksDetail.map(
                (c: { name: string; amount: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-right font-mono">
                      {currencyFormat(parseFloat(c.amount) || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditCheckDialog
                          form={form}
                          check={c}
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
                <TableCell className="font-semibold">Total Cheques</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(totalChecks)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AddCheckDialog
        form={form}
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </Card>
  );
}
