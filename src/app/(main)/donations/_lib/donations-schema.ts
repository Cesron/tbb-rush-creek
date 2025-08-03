import { z } from "zod";

export const donationSchema = z.object({
  serviceDate: z.string().min(1, "Por favor, ingrese la fecha del servicio"),
  sermonTopic: z
    .string()
    .min(1, "Por favor, ingrese el tema de la predicación"),
  preacher: z.string().min(1, "Por favor, ingrese el nombre del predicador"),
  childrenAttendance: z
    .string()
    .min(1, "Por favor, ingrese la asistencia de niños"),
  adultAttendance: z
    .string()
    .min(1, "Por favor, ingrese la asistencia de adultos"),
  templeServers: z
    .string()
    .min(1, "Por favor, ingrese el número de servidores del templo"),
  bibleSchoolServers: z
    .string()
    .min(1, "Por favor, ingrese el número de servidores de escuela bíblica"),

  totalOfferings: z.string().min(1, "Por favor, ingrese el total de ofrendas"),
  totalTithes: z.string().min(1, "Por favor, ingrese el total de diezmos"),
  otherIncome: z.string().min(1, "Por favor, ingrese otros ingresos"),

  coins_001: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de monedas de $0.01"),
  coins_005: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de monedas de $0.05"),
  coins_010: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de monedas de $0.10"),
  coins_025: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de monedas de $0.25"),
  coins_100: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de monedas de $1.00"),

  bills_001: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $1.00"),
  bills_005: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $5.00"),
  bills_010: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $10.00"),
  bills_020: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $20.00"),
  bills_050: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $50.00"),
  bills_100: z
    .string()
    .min(1, "Por favor, ingrese la cantidad de billetes de $100.00"),
});

export type Donation = z.infer<typeof donationSchema>;
