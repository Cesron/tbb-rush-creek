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

interface EditCheckDialogProps {
  form: UseFormReturn<Donation>;
  check: { name: string; amount: string };
  index: number;
  onEdit: () => void;
}

export function EditCheckDialog({
  form,
  check,
  index,
  onEdit,
}: EditCheckDialogProps) {
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleSave = () => {
    if (!editName.trim() || !editAmount || parseFloat(editAmount) <= 0) return;
    const current = form.getValues("checksDetail") || [];
    const updated = [...current];
    updated[index] = { name: editName.trim(), amount: editAmount };
    form.setValue("checksDetail", updated);
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
          variant="outline"
          size="sm"
          onClick={() => {
            setEditName(check.name);
            setEditAmount(check.amount);
          }}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Cheque</DialogTitle>
          <DialogDescription>Modifique los datos del cheque.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <FormLabel htmlFor="editCheckName">Nombre</FormLabel>
            <Input
              id="editCheckName"
              placeholder="Nombre..."
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="editCheckAmount">Monto</FormLabel>
            <div className="relative">
              <Input
                id="editCheckAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={reset}>
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
