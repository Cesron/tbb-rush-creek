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
import { MailIcon, MailOpenIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";
import { AddTitheDialog } from "./add-tithe-dialog";
import { EditTitheDialog } from "./edit-tithe-dialog";

interface TithesDetailSectionProps {
  form: UseFormReturn<Donation>;
}

export function TithesDetailSection({ form }: TithesDetailSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const tithesDetail = form.watch("tithesDetail") || [];
  const totalTithesDetail = tithesDetail.reduce(
    (sum, tithe) => sum + (parseFloat(tithe.amount) || 0),
    0
  );

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleDeleteTithe = (index: number) => {
    const currentTithes = form.getValues("tithesDetail") || [];
    const updatedTithes = currentTithes.filter((_, i) => i !== index);
    form.setValue("tithesDetail", updatedTithes);
  };

  return (
    <Card className="my-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MailIcon className="h-5 w-5" />
          Detalles de Diezmos:{" "}
          <span className="font-semibold font-mono">
            {currencyFormat(totalTithesDetail)}
          </span>
        </CardTitle>
        {form.watch("tithesDetail") &&
          form.watch("tithesDetail").length > 0 && (
            <Button variant="outline" size="sm" onClick={openAddDialog}>
              Agregar Diezmo
            </Button>
          )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!form.watch("tithesDetail") ||
        form.watch("tithesDetail").length === 0 ? (
          <div className="text-center py-8">
            <MailOpenIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No hay diezmos registrados
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Agregue los detalles de los diezmos recibidos durante el servicio
            </p>
            <Button variant="outline" onClick={openAddDialog}>
              Agregar Primer Diezmo
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
              {form.watch("tithesDetail").map((tithe, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{tithe.name}</TableCell>
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(parseFloat(tithe.amount) || 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditTitheDialog
                        form={form}
                        tithe={tithe}
                        index={index}
                        onEdit={() => {}}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTithe(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-semibold">Total Diezmos</TableCell>
                <TableCell className="text-right font-semibold font-mono">
                  {currencyFormat(
                    form
                      .watch("tithesDetail")
                      ?.reduce(
                        (sum, tithe) => sum + (parseFloat(tithe.amount) || 0),
                        0
                      ) || 0
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        {/* Mensaje de diferencia eliminado: los totales ahora son automáticos */}
      </CardContent>

      <AddTitheDialog
        form={form}
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </Card>
  );
}
