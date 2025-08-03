"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CalendarDaysIcon, CoinsIcon } from "lucide-react";
import { useRegisterDonation } from "../_hooks/use-register-donation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RegisterDonation() {
  const { form, onSubmit } = useRegisterDonation();

  // Valores de asistencia
  const adultAttendance = parseInt(form.watch("adultAttendance") || "0");
  const childrenAttendance = parseInt(form.watch("childrenAttendance") || "0");
  const templeServers = parseInt(form.watch("templeServers") || "0");
  const bibleSchoolServers = parseInt(form.watch("bibleSchoolServers") || "0");
  const totalAttendance =
    adultAttendance + childrenAttendance + templeServers + bibleSchoolServers;

  // Valores financieros
  const totalOfferings = parseFloat(form.watch("totalOfferings") || "0");
  const totalTithes = parseFloat(form.watch("totalTithes") || "0");
  const otherIncome = parseFloat(form.watch("otherIncome") || "0");
  const totalFinancial = totalOfferings + totalTithes + otherIncome;

  // Valores de monedas
  const coins001 = parseInt(form.watch("coins_001") || "0");
  const coins005 = parseInt(form.watch("coins_005") || "0");
  const coins010 = parseInt(form.watch("coins_010") || "0");
  const coins025 = parseInt(form.watch("coins_025") || "0");
  const coins100 = parseInt(form.watch("coins_100") || "0");

  // Cálculos de monedas
  const coins001Total = coins001 * 0.01;
  const coins005Total = coins005 * 0.05;
  const coins010Total = coins010 * 0.1;
  const coins025Total = coins025 * 0.25;
  const coins100Total = coins100 * 1.0;
  const totalCoinsCount = coins001 + coins005 + coins010 + coins025 + coins100;
  const totalCoinsValue =
    coins001Total +
    coins005Total +
    coins010Total +
    coins025Total +
    coins100Total;

  // Valores de billetes
  const bills001 = parseInt(form.watch("bills_001") || "0");
  const bills005 = parseInt(form.watch("bills_005") || "0");
  const bills010 = parseInt(form.watch("bills_010") || "0");
  const bills020 = parseInt(form.watch("bills_020") || "0");
  const bills050 = parseInt(form.watch("bills_050") || "0");
  const bills100 = parseInt(form.watch("bills_100") || "0");

  // Cálculos de billetes
  const bills001Total = bills001 * 1;
  const bills005Total = bills005 * 5;
  const bills010Total = bills010 * 10;
  const bills020Total = bills020 * 20;
  const bills050Total = bills050 * 50;
  const bills100Total = bills100 * 100;
  const totalBillsCount =
    bills001 + bills005 + bills010 + bills020 + bills050 + bills100;
  const totalBillsValue =
    bills001Total +
    bills005Total +
    bills010Total +
    bills020Total +
    bills050Total +
    bills100Total;

  // Totales finales
  const totalCashCounted = totalCoinsValue + totalBillsValue;
  const difference = totalCashCounted - totalFinancial;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              Información del Culto
            </CardTitle>
            <CardDescription>
              Registre los datos básicos del servicio
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="serviceDate"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
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
              name="preacher"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Predicador</FormLabel>
                  <FormControl>
                    <Input placeholder="Predicador" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sermonTopic"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Tema del Sermón</FormLabel>
                  <FormControl>
                    <Input placeholder="Tema del Sermón" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="col-span-full" />

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
                    <Input placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="col-span-full">
            <span className="font-semibold">
              Total asistentes: {totalAttendance}
            </span>
          </CardFooter>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              Información Financiera
            </CardTitle>
            <CardDescription>
              Registre los datos financieros del servicio
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="totalOfferings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto de la Ofrenda</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalTithes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto de los Diezmos</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otros Ingresos</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="col-span-full">
            <span className="font-semibold">
              Total Financiero: ${totalFinancial.toFixed(2)}
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5" />
              Desglose de Monedas
            </CardTitle>
            <CardDescription>
              Cantidad de monedas por denominación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Denominación</TableHead>
                  <TableHead className="w-[150px] text-center">
                    Cantidad
                  </TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">$0.01</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="coins_001"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${coins001Total.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">$0.05</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="coins_005"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${coins005Total.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">$0.10</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="coins_010"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${coins010Total.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">$0.25</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="coins_025"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${coins025Total.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">$1.00</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="coins_100"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${coins100Total.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-center font-semibold">
                    {totalCoinsCount}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${totalCoinsValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5" />
              Desglose de Billetes
            </CardTitle>
            <CardDescription>
              Cantidad de billetes por denominación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Denominación</TableHead>
                  <TableHead className="w-[150px] text-center">
                    Cantidad
                  </TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">$1</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_001"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills001Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">$5</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_005"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills005Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">$10</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_010"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills010Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">$20</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_020"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills020Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">$50</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_050"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills050Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">$100</TableCell>
                  <TableCell className="text-center">
                    <FormField
                      control={form.control}
                      name="bills_100"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="w-20 mx-auto text-center"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${bills100Total.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-center font-semibold">
                    {totalBillsCount}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${totalBillsValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="my-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5" />
              Resumen Final de Donaciones
            </CardTitle>
            <CardDescription>
              Totales por categoría y comparación con el desgloce de efectivo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Totales por Categoría */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ofrendas</TableCell>
                    <TableCell className="text-right">
                      ${totalOfferings.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Diezmos</TableCell>
                    <TableCell className="text-right">
                      ${totalTithes.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Otros ingresos</TableCell>
                    <TableCell className="text-right">
                      ${otherIncome.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Total registrado
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${totalFinancial.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* Desgloce de Efectivo */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Desgloce</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Subtotal Monedas{" "}
                      <span className="text-xs text-muted-foreground">
                        ({totalCoinsCount} monedas)
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${totalCoinsValue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Subtotal Billetes{" "}
                      <span className="text-xs text-muted-foreground">
                        ({totalBillsCount} billetes)
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${totalBillsValue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Total efectivo contado
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${totalCashCounted.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Separator className="my-4" />
            {(() => {
              let mensaje = "";
              let color =
                "bg-green-50 text-green-900 dark:bg-green-900/30 dark:text-green-200";
              if (Math.abs(difference) < 0.01) {
                mensaje = "¡El desgloce cuadra perfectamente!";
              } else if (difference < 0) {
                mensaje = `Falta efectivo: $${Math.abs(difference).toFixed(2)}`;
                color =
                  "bg-red-50 text-red-900 dark:bg-red-900/30 dark:text-red-200";
              } else {
                mensaje = `Excedente de efectivo: $${difference.toFixed(2)}`;
                color =
                  "bg-yellow-50 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200";
              }
              return (
                <div
                  className={`rounded-md px-4 py-2 font-semibold text-center ${color}`}
                >
                  {mensaje}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
