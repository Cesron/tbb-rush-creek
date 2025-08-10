"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormat } from "@/utils/currency-format";
import { BanknoteIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface BillsBreakdownSectionProps {
  form: UseFormReturn<Donation>;
}

export function BillsBreakdownSection({ form }: BillsBreakdownSectionProps) {
  const bills001 = parseInt((form.watch("bills_001") as string) || "0");
  const bills005 = parseInt((form.watch("bills_005") as string) || "0");
  const bills010 = parseInt((form.watch("bills_010") as string) || "0");
  const bills020 = parseInt((form.watch("bills_020") as string) || "0");
  const bills050 = parseInt((form.watch("bills_050") as string) || "0");
  const bills100 = parseInt((form.watch("bills_100") as string) || "0");

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

  return (
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
              <TableHead className="w-[150px] text-center">Cantidad</TableHead>
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
              <TableCell className="text-right font-mono">
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
              <TableCell className="text-right font-mono">
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
              <TableCell className="text-right font-mono">
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
              <TableCell className="text-right font-mono">
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
              <TableCell className="text-right font-mono">
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
              <TableCell className="text-right font-mono">
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
  );
}
