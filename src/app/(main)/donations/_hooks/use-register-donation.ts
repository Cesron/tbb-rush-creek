import { useForm } from "react-hook-form";
import { Donation, donationSchema } from "../_lib/donations-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePdfAction } from "../_actions/generate-pdf";

function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDefaultServiceType(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  switch (dayOfWeek) {
    case 0:
      return hour < 15 ? "sundayServiceAM" : "sundayServicePM";
    case 1:
      return "mondayService";
    case 2:
      return "tuesdayService";
    case 3:
      return "wednesdayService";
    case 4:
      return "thursdayService";
    case 5:
      return "fridayService";
    case 6:
      return "saturdayService";
    default:
      return "sundayServiceAM";
  }
}

export function useRegisterDonation() {
  const form = useForm<Donation>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      serviceDate: getLocalDateString(),
      sermonTopic: "",
      preacher: "",
      serviceType: getDefaultServiceType(),
      serviceDescription: "",
      childrenAttendance: "",
      adultAttendance: "",
      templeServers: "",
      bibleSchoolServers: "",
      coins_001: "",
      coins_005: "",
      coins_010: "",
      coins_025: "",
      coins_100: "",
      bills_001: "",
      bills_005: "",
      bills_010: "",
      bills_020: "",
      bills_050: "",
      bills_100: "",
      tithesDetail: [],
      otherDonationsDetail: [],
    },
  });

  async function onSubmit(data: Donation) {
    try {
      const result = await generatePdfAction(data);

      if (result?.data?.success && result.data.data) {
        const { pdfBase64, filename } = result.data.data;

        const response = await fetch(pdfBase64);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log("PDF generado y descargado exitosamente");
      } else {
        console.error("Error al generar el PDF:", result?.data?.error);
        alert("Error al generar el PDF. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Error al procesar la solicitud. Por favor, intente nuevamente.");
    }
  }

  return {
    form,
    onSubmit,
  };
}
