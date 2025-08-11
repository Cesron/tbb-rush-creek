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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface EditOtherDonationDialogProps {
  form: UseFormReturn<Donation>;
  donation: {
    name: string;
    amount: string;
    type: "efectivo" | "remesa" | "cheque";
  };
  index: number;
  onEdit: () => void;
}

export function EditOtherDonationDialog({
  form,
  donation,
  index,
  onEdit,
}: EditOtherDonationDialogProps) {
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState<"efectivo" | "remesa" | "cheque">(
    "efectivo"
  );

  const handleEdit = () => {
    if (!editName.trim() || !editAmount || parseFloat(editAmount) <= 0) {
      return;
    }

    const current = form.getValues("otherDonationsDetail") || [];
    const updated = [...current];
    updated[index] = {
      name: editName.trim(),
      amount: editAmount,
      type: editType,
    };

    form.setValue("otherDonationsDetail", updated);
    setEditName("");
    setEditAmount("");
    setEditType("efectivo");
    onEdit();
  };

  const resetForm = () => {
    setEditName("");
    setEditAmount("");
    setEditType("efectivo");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setEditName(donation.name);
            setEditAmount(donation.amount);
            setEditType(donation.type);
          }}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Otra Donación</DialogTitle>
          <DialogDescription>
            Modifique los detalles de la donación
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <FormLabel htmlFor="editOtherDonationName">
              Nombre / Descripción
            </FormLabel>
            <Input
              id="editOtherDonationName"
              placeholder="Escriba el nombre..."
              onChange={(e) => setEditName(e.target.value)}
              value={editName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEdit();
                }
              }}
            />
          </div>
          <div>
            <FormLabel htmlFor="editOtherDonationAmount">Cantidad</FormLabel>
            <div className="relative">
              <Input
                id="editOtherDonationAmount"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="peer ps-6"
                onChange={(e) => setEditAmount(e.target.value)}
                value={editAmount}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEdit();
                  }
                }}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>
          <div>
            <FormLabel htmlFor="editOtherDonationType">
              Tipo de registro
            </FormLabel>
            <Select
              value={editType}
              onValueChange={(value: "efectivo" | "remesa" | "cheque") =>
                setEditType(value)
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
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleEdit}
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
