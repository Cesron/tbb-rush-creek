// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { currencyFormat } from "@/utils/currency-format";
// import { PiggyBankIcon } from "lucide-react";
// import { UseFormReturn } from "react-hook-form";
// import { Donation } from "../_lib/donations-schema";

// interface FinancialTotalSectionProps {
//   form: UseFormReturn<Donation>;
// }

export function FinancialTotalSection() {
// { form }: FinancialTotalSectionProps
  return null;

  // const totalOfferings = parseFloat(
  //   (form.watch("totalOfferings") as string) || "0"
  // );
  // const totalTithes = parseFloat((form.watch("totalTithes") as string) || "0");
  // const otherIncome = parseFloat((form.watch("otherIncome") as string) || "0");
  // const totalFinancial = totalOfferings + totalTithes + otherIncome;

  // return (
  //   <Card className="mt-4">
  //     <CardHeader>
  //       <CardTitle className="flex items-center gap-2">
  //         <PiggyBankIcon className="h-5 w-5" />
  //         Total Financiero:{" "}
  //         <span className="font-semibold font-mono">
  //           {currencyFormat(totalFinancial)}
  //         </span>
  //       </CardTitle>
  //     </CardHeader>

  //     <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //       <FormField
  //         control={form.control}
  //         name="totalOfferings"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Monto de la Ofrenda</FormLabel>
  //             <FormControl>
  //               <div className="relative">
  //                 <Input
  //                   type="number"
  //                   min={0}
  //                   placeholder="0.00"
  //                   className="peer ps-6"
  //                   {...field}
  //                 />
  //                 <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
  //                   $
  //                 </span>
  //               </div>
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />

  //       <FormField
  //         control={form.control}
  //         name="totalTithes"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Monto de los Diezmos</FormLabel>
  //             <FormControl>
  //               <div className="relative">
  //                 <Input
  //                   type="number"
  //                   min={0}
  //                   placeholder="0.00"
  //                   className="peer ps-6"
  //                   {...field}
  //                 />
  //                 <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
  //                   $
  //                 </span>
  //               </div>
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />

  //       <FormField
  //         control={form.control}
  //         name="otherIncome"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Otros Ingresos</FormLabel>
  //             <FormControl>
  //               <div className="relative">
  //                 <Input
  //                   type="number"
  //                   min={0}
  //                   placeholder="0.00"
  //                   className="peer ps-6"
  //                   {...field}
  //                 />
  //                 <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
  //                   $
  //                 </span>
  //               </div>
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //     </CardContent>
  //   </Card>
  // );
}
