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
import { FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../../_lib/donations-schema";

interface EditRemittanceDialogProps {
  form: UseFormReturn<Donation>;
  remittance: { name: string; amount: string };
  index: number;
  onEdit: () => void;
}

export function EditRemittanceDialog({
  form,
  remittance,
  index,
  onEdit,
}: EditRemittanceDialogProps) {
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleSave = () => {
    if (!editName.trim() || !editAmount || parseFloat(editAmount) <= 0) return;
    const current = form.getValues("remittancesDetail") || [];
    const updated = [...current];
    updated[index] = { name: editName.trim(), amount: editAmount };
    form.setValue("remittancesDetail", updated);
    setEditName("");
    setEditAmount("");
    onEdit();
  };

  const reset = () => {
    setEditName("");
    setEditAmount("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setEditName(remittance.name);
            setEditAmount(remittance.amount);
          }}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Remesa</DialogTitle>
          <DialogDescription>
            Modifique los datos de la transferencia.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <FormLabel htmlFor="editRemittanceName">Nombre</FormLabel>
            <Input
              id="editRemittanceName"
              placeholder="Nombre..."
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </div>
          <div>
            <FormLabel htmlFor="editRemittanceAmount">Monto</FormLabel>
            <div className="relative">
              <Input
                id="editRemittanceAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSave();
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
            <Button type="button" variant="outline" onClick={reset}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleSave}
              disabled={
                !editName.trim() || !editAmount || parseFloat(editAmount) <= 0
              }
            >
              Guardar Cambios
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
