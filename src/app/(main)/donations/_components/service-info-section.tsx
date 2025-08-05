"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChurchIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface ServiceInfoSectionProps {
  form: UseFormReturn<Donation>;
}

export function ServiceInfoSection({ form }: ServiceInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChurchIcon className="h-5 w-5" />
          Información del Culto
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="serviceDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha del Servicio</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Fecha del servicio"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Servicio</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un tipo de servicio" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="sundayServiceAM">
                    Servicio dominical AM
                  </SelectItem>
                  <SelectItem value="sundayServicePM">
                    Servicio dominical PM
                  </SelectItem>
                  <SelectItem value="mondayService">
                    Familias en victoria
                  </SelectItem>
                  <SelectItem value="tuesdayService">
                    Torre de oración
                  </SelectItem>
                  <SelectItem value="wednesdayService">
                    Estudio bíblico
                  </SelectItem>
                  <SelectItem value="thursdayService">
                    Amaneciendo con Dios
                  </SelectItem>
                  <SelectItem value="fridayService">
                    Viernes de milagros
                  </SelectItem>
                  <SelectItem value="saturdayService">
                    Servicio de jóvenes
                  </SelectItem>
                  <SelectItem value="specialService">
                    Servicio especial
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Predicador</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el predicador" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pr. Carlos David Abrego">
                    Pr. Carlos David Abrego
                  </SelectItem>
                  <SelectItem value="Pr. Oswaldo Guzmán">
                    Pr. Oswaldo Guzmán
                  </SelectItem>
                  <SelectItem value="Pr. Miguel Berrios">
                    Pr. Miguel Berrios
                  </SelectItem>
                  <SelectItem value="Pr. Alfredo Rivera">
                    Pr. Alfredo Rivera
                  </SelectItem>
                  <SelectItem value="Pr. Moris Hernández">
                    Pr. Moris Hernández
                  </SelectItem>
                  <SelectItem value="Pr. Hazael Mendoza">
                    Pr. Hazael Mendoza
                  </SelectItem>
                  <SelectItem value="Hno. Eduardo Alvarado">
                    Hno. Eduardo Alvarado
                  </SelectItem>
                  <SelectItem value="Hno. Francisco Alfaro">
                    Hno. Francisco Alfaro
                  </SelectItem>
                  <SelectItem value="Hno. Kevin Castro">
                    Hno. Kevin Castro
                  </SelectItem>
                  <SelectItem value="Hno. Carlos Alvarado">
                    Hno. Carlos Alvarado
                  </SelectItem>
                  <SelectItem value="Pr. Steve Webel">
                    Pr. Steve Webel
                  </SelectItem>
                  <SelectItem value="Pr. Gary Meinecke">
                    Pr. Gary Meinecke
                  </SelectItem>
                  <SelectItem value="Hna. Jacqueline Abrego">
                    Hna. Jacqueline Abrego
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sermonTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema del Sermón</FormLabel>
              <FormControl>
                <Input placeholder="Escriba el tema del sermón..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceDescription"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Descripción del Servicio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escriba la descripción del servicio..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
