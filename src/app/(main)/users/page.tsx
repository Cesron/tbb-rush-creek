import { verifySession } from "@/lib/auth-utils";
import { UsersHeader } from "./_components/users-header";

export default async function UsersPage() {
  await verifySession();

  return (
    <>
      <UsersHeader />

      <div className="overflow-hidden">
        <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px"></div>
      </div>
    </>
  );
}
