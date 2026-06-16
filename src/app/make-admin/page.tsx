export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MakeAdminPage() {
  // دریافت همه کاربران
  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  if (allUsers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-8 rounded-2xl text-red-700 max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">هیچ کاربری وجود ندارد</h2>
          <p className="mb-4">ابتدا باید ثبت‌نام کنید.</p>
          <a href="/register" className="inline-block bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#152a45] transition">
            ثبت‌نام
          </a>
        </div>
      </div>
    );
  }

  // تغییر نقش همه کاربران به ADMIN (فقط برای تست)
  await prisma.user.updateMany({
    data: { role: "ADMIN" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">همه کاربران به ادمین تبدیل شدند!</h1>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
          <h3 className="font-bold text-gray-800 mb-3">لیست کاربران:</h3>
          {allUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
              <div>
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                ADMIN
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          حالا با هر یک از این حساب‌ها وارد شوید و به پنل ادمین دسترسی خواهید داشت.
        </p>
        
        <a
          href="/login"
          className="inline-block bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#152a45] transition"
        >
          ورود به حساب
        </a>
      </div>
    </div>
  );
}