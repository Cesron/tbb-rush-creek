"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface AddTitheDialogProps {
  form: UseFormReturn<Donation>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTitheDialog({
  form,
  isOpen,
  onOpenChange,
}: AddTitheDialogProps) {
  const [newTitheName, setNewTitheName] = useState("");
  const [newTitheAmount, setNewTitheAmount] = useState("");
  const [newTitheType, setNewTitheType] = useState<
    "efectivo" | "remesa" | "cheque"
  >("efectivo");

  const closeDialog = () => {
    onOpenChange(false);
    setNewTitheName("");
    setNewTitheAmount("");
    setNewTitheType("efectivo");
  };

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
      type: newTitheType,
    };

    form.setValue("tithesDetail", [...currentTithes, newTithe]);
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Diezmo</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del diezmo a registrar
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="tithePersonName">Nombre de la persona</Label>
            <Input
              id="tithePersonName"
              placeholder="Escriba el nombre..."
              onChange={(e) => setNewTitheName(e.target.value)}
              value={newTitheName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTithe();
                }
              }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTithe();
                  }
                }}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titheType">Tipo de registro</Label>
            <Select
              value={newTitheType}
              onValueChange={(value: "efectivo" | "remesa" | "cheque") =>
                setNewTitheType(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">Efectivo</SelectItem>
                <SelectItem value="remesa">Remesa</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={closeDialog}>
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
  );
}
