"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormLabel } from "@/components/ui/form";
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
import { TitheDifferenceMessage } from "./tithe-difference-message";

interface TithesDetailSectionProps {
  form: UseFormReturn<Donation>;
}

export function TithesDetailSection({ form }: TithesDetailSectionProps) {
  const [newTitheName, setNewTitheName] = useState("");
  const [newTitheAmount, setNewTitheAmount] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const totalTithes = parseFloat((form.watch("totalTithes") as string) || "0");
  const tithesDetail = form.watch("tithesDetail") || [];
  const totalTithesDetail = tithesDetail.reduce(
    (sum, tithe) => sum + (parseFloat(tithe.amount) || 0),
    0
  );
  const tithesDifference = totalTithesDetail - totalTithes;

  const handleAddTithe = () => {
    if (
      !newTitheName.trim() ||
      !newTitheAmount ||
      parseFloat(newTitheAmount) <= 0
    ) {
      return;
    }

    const currentTithes = form.getValues("tithesDetail") || [];
    const newTithe = {
      name: newTitheName.trim(),
      amount: newTitheAmount,
    };

    form.setValue("tithesDetail", [...currentTithes, newTithe]);
    setNewTitheName("");
    setNewTitheAmount("");
  };

  const handleEditTithe = () => {
    if (
      editingIndex === null ||
      !newTitheName.trim() ||
      !newTitheAmount ||
      parseFloat(newTitheAmount) <= 0
    ) {
      return;
    }

    const currentTithes = form.getValues("tithesDetail") || [];
    const updatedTithes = [...currentTithes];
    updatedTithes[editingIndex] = {
      name: newTitheName.trim(),
      amount: newTitheAmount,
    };

    form.setValue("tithesDetail", updatedTithes);
    setEditingIndex(null);
    setNewTitheName("");
    setNewTitheAmount("");
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Agregar Diezmo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agregar Diezmo</DialogTitle>
                  <DialogDescription>
                    Ingrese los detalles del diezmo a registrar
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tithePersonName">
                      Nombre de la persona
                    </Label>
                    <Input
                      id="tithePersonName"
                      placeholder="Escriba el nombre..."
                      onChange={(e) => setNewTitheName(e.target.value)}
                      value={newTitheName}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="titheAmount">Cantidad</Label>
                    <div className="relative">
                      <Input
                        id="titheAmount"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        className="peer ps-6"
                        onChange={(e) => setNewTitheAmount(e.target.value)}
                        value={newTitheAmount}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewTitheName("");
                        setNewTitheAmount("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleAddTithe}
                      disabled={
                        !newTitheName.trim() ||
                        !newTitheAmount ||
                        parseFloat(newTitheAmount) <= 0
                      }
                    >
                      Agregar Diezmo
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Agregar Primer Diezmo</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agregar Diezmo</DialogTitle>
                  <DialogDescription>
                    Ingrese los detalles del diezmo a registrar
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tithePersonName">
                      Nombre de la persona
                    </Label>
                    <Input
                      id="tithePersonName"
                      placeholder="Escriba el nombre..."
                      onChange={(e) => setNewTitheName(e.target.value)}
                      value={newTitheName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titheAmount">Cantidad</Label>
                    <div className="relative">
                      <Input
                        id="titheAmount"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        className="peer ps-6"
                        onChange={(e) => setNewTitheAmount(e.target.value)}
                        value={newTitheAmount}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewTitheName("");
                        setNewTitheAmount("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleAddTithe}
                      disabled={
                        !newTitheName.trim() ||
                        !newTitheAmount ||
                        parseFloat(newTitheAmount) <= 0
                      }
                    >
                      Agregar Diezmo
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingIndex(index);
                              setNewTitheName(tithe.name);
                              setNewTitheAmount(tithe.amount);
                            }}
                          >
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Editar Diezmo</DialogTitle>
                            <DialogDescription>
                              Modifique los detalles del diezmo
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div>
                              <FormLabel htmlFor="editTithePersonName">
                                Nombre de la persona
                              </FormLabel>
                              <Input
                                id="editTithePersonName"
                                placeholder="Escriba el nombre..."
                                onChange={(e) =>
                                  setNewTitheName(e.target.value)
                                }
                                value={newTitheName}
                              />
                            </div>
                            <div>
                              <FormLabel htmlFor="editTitheAmount">
                                Cantidad
                              </FormLabel>
                              <div className="relative">
                                <Input
                                  id="editTitheAmount"
                                  type="number"
                                  min={0}
                                  step="0.01"
                                  placeholder="0.00"
                                  className="peer ps-6"
                                  onChange={(e) =>
                                    setNewTitheAmount(e.target.value)
                                  }
                                  value={newTitheAmount}
                                />
                                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                                  $
                                </span>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingIndex(null);
                                  setNewTitheName("");
                                  setNewTitheAmount("");
                                }}
                              >
                                Cancelar
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={handleEditTithe}
                                disabled={
                                  !newTitheName.trim() ||
                                  !newTitheAmount ||
                                  parseFloat(newTitheAmount) <= 0
                                }
                              >
                                Guardar Cambios
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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

        <TitheDifferenceMessage
          difference={tithesDifference}
          currencyFormat={currencyFormat}
        />
      </CardContent>
    </Card>
  );
}
