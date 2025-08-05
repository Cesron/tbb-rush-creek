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
import { CoinsIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Donation } from "../_lib/donations-schema";

interface CoinsBreakdownSectionProps {
  form: UseFormReturn<Donation>;
}

export function CoinsBreakdownSection({ form }: CoinsBreakdownSectionProps) {
  const coins001 = parseInt((form.watch("coins_001") as string) || "0");
  const coins005 = parseInt((form.watch("coins_005") as string) || "0");
  const coins010 = parseInt((form.watch("coins_010") as string) || "0");
  const coins025 = parseInt((form.watch("coins_025") as string) || "0");
  const coins100 = parseInt((form.watch("coins_100") as string) || "0");

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

  return (
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
              <TableHead className="w-[150px] text-center">Cantidad</TableHead>
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
  );
}
