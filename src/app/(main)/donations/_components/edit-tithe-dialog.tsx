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

interface EditTitheDialogProps {
  form: UseFormReturn<Donation>;
  tithe: {
    name: string;
    amount: string;
    type: "efectivo" | "remesa" | "cheque";
  };
  index: number;
  onEdit: () => void;
}

export function EditTitheDialog({
  form,
  tithe,
  index,
  onEdit,
}: EditTitheDialogProps) {
  const [open, setOpen] = useState(false);
  const [editTitheName, setEditTitheName] = useState("");
  const [editTitheAmount, setEditTitheAmount] = useState("");
  const [editTitheType, setEditTitheType] = useState<
    "efectivo" | "remesa" | "cheque"
  >("efectivo");

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
      type: editTitheType,
    };

    form.setValue("tithesDetail", updatedTithes);
    setEditTitheName("");
    setEditTitheAmount("");
    setEditTitheType("efectivo");
    setOpen(false);
    onEdit();
  };

  const resetForm = () => {
    setEditTitheName("");
    setEditTitheAmount("");
    setEditTitheType("efectivo");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setEditTitheName(tithe.name);
            setEditTitheAmount(tithe.amount);
            setEditTitheType(tithe.type);
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEditTithe();
                }
              }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEditTithe();
                  }
                }}
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                $
              </span>
            </div>
          </div>
          <div>
            <FormLabel htmlFor="editTitheType">Tipo de registro</FormLabel>
            <Select
              value={editTitheType}
              onValueChange={(value: "efectivo" | "remesa" | "cheque") =>
                setEditTitheType(value)
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
