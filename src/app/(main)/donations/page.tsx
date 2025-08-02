import { DonationsHeader } from "./_components/donations-header";

export default function Home() {
  return (
    <>
      <DonationsHeader />

      <div className="overflow-hidden">
        <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px"></div>
      </div>
    </>
  );
}
