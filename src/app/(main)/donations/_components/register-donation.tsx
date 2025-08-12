"use client";

import { Form } from "@/components/ui/form";
import { useRegisterDonation } from "../_hooks/use-register-donation";
import { ServiceInfoSection } from "./service-info-section";
import { AttendanceSection } from "./attendance-section";
import { MinisterialActivitiesSection } from "./ministerial-activities-section";
import { CoinsBreakdownSection } from "./coins-breakdown-section";
import { BillsBreakdownSection } from "./bills-breakdown-section";
import { TithesDetailSection } from "./tithes-detail-section";
import { OtherDonationsDetailSection } from "./other-donations-detail-section";
import { FinalSummarySection } from "./final-summary-section";

export function RegisterDonation() {
  const { form, onSubmit } = useRegisterDonation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className="space-y-4"
      >
        <ServiceInfoSection form={form} />

        <AttendanceSection form={form} />

        <MinisterialActivitiesSection form={form} />

        <TithesDetailSection form={form} />

        <OtherDonationsDetailSection form={form} />

        <CoinsBreakdownSection form={form} />

        <BillsBreakdownSection form={form} />

        <FinalSummarySection
          form={form}
          onSubmit={async () => {
            await form.handleSubmit(onSubmit)();
          }}
        />
      </form>
    </Form>
  );
}
