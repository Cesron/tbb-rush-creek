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
import { UsersIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface AttendanceSectionProps {
  form: UseFormReturn<Donation>;
}

export function AttendanceSection({ form }: AttendanceSectionProps) {
  const adultAttendance = parseInt(
    (form.watch("adultAttendance") as string) || "0"
  );
  const childrenAttendance = parseInt(
    (form.watch("childrenAttendance") as string) || "0"
  );
  const templeServers = parseInt(
    (form.watch("templeServers") as string) || "0"
  );
  const bibleSchoolServers = parseInt(
    (form.watch("bibleSchoolServers") as string) || "0"
  );
  const totalAttendance =
    adultAttendance + childrenAttendance + templeServers + bibleSchoolServers;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5" />
          Asistencia al Servicio:{" "}
          <span className="font-semibold">{totalAttendance}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="adultAttendance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asistencia de Adultos</FormLabel>
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
          name="childrenAttendance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asistencia de Niños</FormLabel>
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
          name="templeServers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servidores del Templo</FormLabel>
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
          name="bibleSchoolServers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servidores de la Escuela Bíblica</FormLabel>
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
