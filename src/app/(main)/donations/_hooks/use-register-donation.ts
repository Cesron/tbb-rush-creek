import { useForm } from "react-hook-form";
import { Donation, donationSchema } from "../_lib/donations-schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
      serviceDate: new Date().toISOString().slice(0, 10),
      sermonTopic: "",
      preacher: "",
      serviceType: getDefaultServiceType(),
      serviceDescription: "",
      childrenAttendance: "",
      adultAttendance: "",
      templeServers: "",
      bibleSchoolServers: "",
      totalOfferings: "",
      totalTithes: "",
      otherIncome: "",
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
    },
  });

  function onSubmit(data: Donation) {
    console.log("Submitted data:", data);
  }

  return {
    form,
    onSubmit,
  };
}
