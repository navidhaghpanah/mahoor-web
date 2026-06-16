export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewPropertyForm from "./NewPropertyForm";

export default async function NewPropertyPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">ثبت آگهی جدید</h1>
          <p className="text-gray-600 mt-2">
            اطلاعات ملک خود را با دقت وارد کنید. آگهی شما پس از بررسی ادمین منتشر می‌شود.
          </p>
        </div>
        <NewPropertyForm userId={userId} />
      </div>
    </div>
  );
}