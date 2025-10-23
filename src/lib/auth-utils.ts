import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
}
