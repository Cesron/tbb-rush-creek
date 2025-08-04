"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { currencyFormat } from "@/utils/currency-format";
import {
  BanknoteIcon,
  ChurchIcon,
  CoinsIcon,
  PiggyBankIcon,
  UsersIcon,
} from "lucide-react";
import { useRegisterDonation } from "../_hooks/use-register-donation";
import { DifferenceMessage } from "./difference-message";

export function RegisterDonation() {
  const { form, onSubmit } = useRegisterDonation();

  const adultAttendance = parseInt(form.watch("adultAttendance") || "0");
  const childrenAttendance = parseInt(form.watch("childrenAttendance") || "0");
  const templeServers = parseInt(form.watch("templeServers") || "0");
  const bibleSchoolServers = parseInt(form.watch("bibleSchoolServers") || "0");
  const totalAttendance =
    adultAttendance + childrenAttendance + templeServers + bibleSchoolServers;

  const totalOfferings = parseFloat(form.watch("totalOfferings") || "0");
  const totalTithes = parseFloat(form.watch("totalTithes") || "0");
  const otherIncome = parseFloat(form.watch("otherIncome") || "0");
  const totalFinancial = totalOfferings + totalTithes + otherIncome;

  const coins001 = parseInt(form.watch("coins_001") || "0");
  const coins005 = parseInt(form.watch("coins_005") || "0");
  const coins010 = parseInt(form.watch("coins_010") || "0");
  const coins025 = parseInt(form.watch("coins_025") || "0");
  const coins100 = parseInt(form.watch("coins_100") || "0");

  const coins001Total = coins001 * 0.01;
  const coins005Total = coins005 * 0.05;
  const coins010Total = coins010 * 0.1;
  const coins025Total = coins025 * 0.25;
  const coins100Total = coins100 * 1.0;

  const totalCoins =
    coins001Total +
    coins005Total +
    coins010Total +
    coins025Total +
    coins100Total;

  const bills001 = parseInt(form.watch("bills_001") || "0");
  const bills005 = parseInt(form.watch("bills_005") || "0");
  const bills010 = parseInt(form.watch("bills_010") || "0");
  const bills020 = parseInt(form.watch("bills_020") || "0");
  const bills050 = parseInt(form.watch("bills_050") || "0");
  const bills100 = parseInt(form.watch("bills_100") || "0");

  const bills001Total = bills001 * 1;
  const bills005Total = bills005 * 5;
  const bills010Total = bills010 * 10;
  const bills020Total = bills020 * 20;
  const bills050Total = bills050 * 50;
  const bills100Total = bills100 * 100;

  const totalBills =
    bills001Total +
    bills005Total +
    bills010Total +
    bills020Total +
    bills050Total +
    bills100Total;

  const totalCashCounted = totalCoins + totalBills;
  const difference = totalCashCounted - totalFinancial;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input
                      placeholder="Escriba el tema del sermón..."
                      {...field}
                    />
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

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBankIcon className="h-5 w-5" />
              Total Financiero:{" "}
              <span className="font-semibold font-mono">
                {currencyFormat(totalFinancial)}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="totalOfferings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto de la Ofrenda</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min={0}
                        placeholder="0.00"
                        className="peer ps-6"
                        {...field}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                      </span>
                    </div>
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
                    <div className="relative">
                      <Input
                        type="number"
                        min={0}
                        placeholder="0.00"
                        className="peer ps-6"
                        {...field}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                      </span>
                    </div>
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
                    <div className="relative">
                      <Input
                        type="number"
                        min={0}
                        placeholder="0.00"
                        className="peer ps-6"
                        {...field}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5" />
              Desglose de Monedas:{" "}
              <span className="font-semibold font-mono">
                {currencyFormat(totalCoins)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Denominación</TableHead>
                  <TableHead className="w-[150px] text-center">
                    Cantidad
                  </TableHead>
                  <TableHead className="w-[120px] text-right">Total</TableHead>
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(coins001Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(coins005Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(coins010Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(coins025Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(coins100Total)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium" colSpan={2}>
                    Total
                  </TableCell>

                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(totalCoins)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BanknoteIcon className="h-5 w-5" />
              Desglose de Billetes:{" "}
              <span className="font-semibold font-mono">
                {currencyFormat(totalBills)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Denominación</TableHead>
                  <TableHead className="w-[150px] text-center">
                    Cantidad
                  </TableHead>
                  <TableHead className="w-[120px] text-right">Total</TableHead>
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills001Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills005Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills010Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills020Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills050Total)}
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
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(bills100Total)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell className="text-right font-semibold font-mono">
                    {currencyFormat(totalBills)}
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalOfferings)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Diezmos</TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalTithes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Otros ingresos</TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(otherIncome)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Total registrado
                    </TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalFinancial)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Desgloce</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal Monedas </TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalCoins)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Subtotal Billetes </TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalBills)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Total efectivo contado
                    </TableCell>
                    <TableCell className="text-right font-semibold font-mono">
                      {currencyFormat(totalCashCounted)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Separator className="my-4" />
            <DifferenceMessage
              difference={difference}
              currencyFormat={currencyFormat}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
