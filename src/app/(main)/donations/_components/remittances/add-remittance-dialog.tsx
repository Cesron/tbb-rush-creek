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
import { Donation } from "../../_lib/donations-schema";

interface AddRemittanceDialogProps {
  form: UseFormReturn<Donation>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRemittanceDialog({
  form,
  isOpen,
  onOpenChange,
}: AddRemittanceDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const close = () => {
    onOpenChange(false);
    setName("");
    setAmount("");
  };

  const handleAdd = () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) return;
    const current = form.getValues("remittancesDetail") || [];
    form.setValue("remittancesDetail", [
      ...current,
      { name: name.trim(), amount },
    ]);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Remesa</DialogTitle>
          <DialogDescription>
            Ingrese los datos de la transferencia.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="remittanceName">Nombre</Label>
            <Input
              id="remittanceName"
              placeholder="Nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remittanceAmount">Monto</Label>
            <div className="relative">
              <Input
                id="remittanceAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={close}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleAdd}
              disabled={!name.trim() || !amount || parseFloat(amount) <= 0}
            >
              Agregar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
