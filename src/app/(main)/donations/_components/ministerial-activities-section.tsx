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
import { HeartHandshakeIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface MinisterialActivitiesSectionProps {
  form: UseFormReturn<Donation>;
}

export function MinisterialActivitiesSection({
  form,
}: MinisterialActivitiesSectionProps) {
  const faithProfessions = parseInt(
    (form.watch("faithProfessions") as string) || "0"
  );
  const baptisms = parseInt((form.watch("baptisms") as string) || "0");
  const holyCommunion = parseInt((form.watch("lordsSupper") as string) || "0");
  const totalMinisterialActivities =
    faithProfessions + baptisms + holyCommunion;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartHandshakeIcon className="h-5 w-5" />
          Actividades Ministeriales:{" "}
          <span className="font-semibold">{totalMinisterialActivities}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="faithProfessions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesiones de Fe</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baptisms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bautismos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lordsSupper"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Santa Cena</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
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
