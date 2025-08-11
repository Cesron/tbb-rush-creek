import { z } from "zod";

export const donationSchema = z.object({
  serviceDate: z.string().min(1, "Por favor, ingrese la fecha del servicio"),
  serviceType: z.string().min(1, "Por favor, seleccione el tipo de servicio"),
  preacher: z.string().min(1, "Por favor, ingrese el nombre del predicador"),
  sermonTopic: z.string(),
  serviceDescription: z.string(),

  childrenAttendance: z.string().optional(),
  adultAttendance: z.string().optional(),
  templeServers: z.string().optional(),
  bibleSchoolServers: z.string().optional(),

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
      type: z.enum(["efectivo", "remesa", "cheque"]),
    })
  ),
  otherDonationsDetail: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
      type: z.enum(["efectivo", "remesa", "cheque"]),
    })
  ),
});

export type Donation = z.infer<typeof donationSchema>;
