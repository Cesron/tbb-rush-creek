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
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface AddOtherDonationDialogProps {
  form: UseFormReturn<Donation>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddOtherDonationDialog({
  form,
  isOpen,
  onOpenChange,
}: AddOtherDonationDialogProps) {
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const closeDialog = () => {
    onOpenChange(false);
    setNewName("");
    setNewAmount("");
  };

  const handleAdd = () => {
    if (!newName.trim() || !newAmount || parseFloat(newAmount) <= 0) {
      return;
    }

    const current = form.getValues("otherDonationsDetail") || [];
    const newDonation = {
      name: newName.trim(),
      amount: newAmount,
    };

    form.setValue("otherDonationsDetail", [...current, newDonation]);
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
