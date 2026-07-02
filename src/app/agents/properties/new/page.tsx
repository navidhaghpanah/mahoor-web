export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewPropertyPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect("/login");
  }

  redirect("/agent/properties/new");
}