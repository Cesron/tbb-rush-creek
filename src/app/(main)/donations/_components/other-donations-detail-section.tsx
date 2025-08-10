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
import { GiftIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";
import { AddOtherDonationDialog } from "./add-other-donation-dialog";
import { EditOtherDonationDialog } from "./edit-other-donation-dialog";

interface OtherDonationsDetailSectionProps {
  form: UseFormReturn<Donation>;
}

export function OtherDonationsDetailSection({
  form,
}: OtherDonationsDetailSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const detail = form.watch("otherDonationsDetail") || [];
  const total = detail.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    const current = form.getValues("otherDonationsDetail") || [];
    const updated = current.filter((_, i) => i !== index);
    form.setValue("otherDonationsDetail", updated);
  };

  return (
  <Card className="my-4 h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GiftIcon className="h-5 w-5" />
          Otras Donaciones:{" "}
          <span className="font-semibold font-mono">
            {currencyFormat(total)}
          </span>
        </CardTitle>
        {detail.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openAddDialog}
          >
            Agregar Donación
          </Button>
        )}
      </CardHeader>
  <CardContent className="space-y-4 flex-1 flex flex-col">
        {detail.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center py-8">
            <GiftIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-base font-medium text-muted-foreground mb-1">
              No hay otras donaciones registradas
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Agregue las donaciones especiales recibidas durante el servicio
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openAddDialog}
            >
              Agregar Primera Donación
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Descripción</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detail.map((donation, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{donation.name}</TableCell>
                  <TableCell className="text-right font-mono">
                    {currencyFormat(parseFloat(donation.amount) || 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditOtherDonationDialog
                        form={form}
                        donation={donation}
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
              ))}
              <TableRow>
                <TableCell className="font-semibold">
                  Total Otras Donaciones
                </TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(total)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AddOtherDonationDialog
        form={form}
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </Card>
  );
}
