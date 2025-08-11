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
  DialogTrigger,
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

interface AddOtherDonationDialogProps {
  form: UseFormReturn<Donation>;
}

export function AddOtherDonationDialog({ form }: AddOtherDonationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState<"efectivo" | "remesa" | "cheque">(
    "efectivo"
  );

  const closeDialog = () => {
    setIsOpen(false);
    setNewName("");
    setNewAmount("");
    setNewType("efectivo");
  };

  const handleAdd = () => {
    if (!newName.trim() || !newAmount || parseFloat(newAmount) <= 0) {
      return;
    }

    const current = form.getValues("otherDonationsDetail") || [];
    const newDonation = {
      name: newName.trim(),
      amount: newAmount,
      type: newType,
    };

    form.setValue("otherDonationsDetail", [...current, newDonation]);
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Agregar Donación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Otra Donación</DialogTitle>
          <DialogDescription>
            Ingrese los detalles de la donación a registrar
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="otherDonationName">Nombre / Descripción</Label>
            <Input
              id="otherDonationName"
              placeholder="Escriba el nombre..."
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherDonationAmount">Cantidad</Label>
            <div className="relative">
              <Input
                id="otherDonationAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                onChange={(e) => setNewAmount(e.target.value)}
                value={newAmount}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherDonationType">Tipo de registro</Label>
            <Select
              value={newType}
              onValueChange={(value: "efectivo" | "remesa" | "cheque") =>
                setNewType(value)
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
              onClick={handleAdd}
              disabled={
                !newName.trim() || !newAmount || parseFloat(newAmount) <= 0
              }
            >
              Agregar Donación
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
