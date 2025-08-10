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
import { Donation } from "../_lib/donations-schema";

interface EditTitheDialogProps {
  form: UseFormReturn<Donation>;
  tithe: { name: string; amount: string };
  index: number;
  onEdit: () => void;
}

export function EditTitheDialog({
  form,
  tithe,
  index,
  onEdit,
}: EditTitheDialogProps) {
  const [editTitheName, setEditTitheName] = useState("");
  const [editTitheAmount, setEditTitheAmount] = useState("");

  const handleEditTithe = () => {
    if (
      !editTitheName.trim() ||
      !editTitheAmount ||
      parseFloat(editTitheAmount) <= 0
    ) {
      return;
    }

    const currentTithes = form.getValues("tithesDetail") || [];
    const updatedTithes = [...currentTithes];
    updatedTithes[index] = {
      name: editTitheName.trim(),
      amount: editTitheAmount,
    };

    form.setValue("tithesDetail", updatedTithes);
    setEditTitheName("");
    setEditTitheAmount("");
    onEdit();
  };

  const resetForm = () => {
    setEditTitheName("");
    setEditTitheAmount("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditTitheName(tithe.name);
            setEditTitheAmount(tithe.amount);
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
              onChange={(e) => setEditTitheName(e.target.value)}
              value={editTitheName}
            />
          </div>
          <div>
            <FormLabel htmlFor="editTitheAmount">Cantidad</FormLabel>
            <div className="relative">
              <Input
                id="editTitheAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                onChange={(e) => setEditTitheAmount(e.target.value)}
                value={editTitheAmount}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleEditTithe}
              disabled={
                !editTitheName.trim() ||
                !editTitheAmount ||
                parseFloat(editTitheAmount) <= 0
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
