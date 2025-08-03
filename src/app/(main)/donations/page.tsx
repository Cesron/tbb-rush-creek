import { DonationsHeader } from "./_components/donations-header";
import { RegisterDonation } from "./_components/register-donation";

export default function Home() {
  return (
    <>
      <DonationsHeader />

      <div className="p-4">
        <h1 className="text-2xl font-bold">Registro de donaciones</h1>
        <p className="mt-2 text-muted-foreground">
          Bienvenido a la página de donaciones. Aquí puedes gestionar tus
          donaciones.
        </p>
      </div>

      <RegisterDonation />
    </>
  );
}
