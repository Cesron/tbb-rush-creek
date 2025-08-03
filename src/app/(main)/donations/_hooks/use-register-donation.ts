import { useForm } from "react-hook-form";
import { Donation, donationSchema } from "../_lib/donations-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useRegisterDonation() {
  const form = useForm<Donation>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      serviceDate: new Date().toISOString().slice(0, 10),
      sermonTopic: "",
      preacher: "",
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
