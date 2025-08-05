import { z } from "zod";

export const donationSchema = z.object({
  serviceDate: z.string().min(1, "Por favor, ingrese la fecha del servicio"),
  serviceType: z.string().min(1, "Por favor, seleccione el tipo de servicio"),
  sermonTopic: z
    .string()
    .min(1, "Por favor, ingrese el tema de la predicación"),
  preacher: z.string().min(1, "Por favor, ingrese el nombre del predicador"),
  serviceDescription: z.string(),

  childrenAttendance: z.string().optional(),
  adultAttendance: z.string().optional(),
  templeServers: z.string().optional(),
  bibleSchoolServers: z.string().optional(),

  totalOfferings: z.string().optional(),
  totalTithes: z.string().optional(),
  otherIncome: z.string().optional(),

  coins_001: z.string().optional(),
  coins_005: z.string().optional(),
  coins_010: z.string().optional(),
  coins_025: z.string().optional(),
  coins_100: z.string().optional(),

  bills_001: z.string().optional(),
  bills_005: z.string().optional(),
  bills_010: z.string().optional(),
  bills_020: z.string().optional(),
  bills_050: z.string().optional(),
  bills_100: z.string().optional(),

  tithesDetail: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
});

export type Donation = z.infer<typeof donationSchema>;
