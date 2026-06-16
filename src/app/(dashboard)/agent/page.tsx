import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, PlusCircle, Clock, MessageSquare } from "lucide-react";

export default async function AgentDashboard() {
  // ۱. بررسی اینکه آیا کاربر وارد شده است یا خیر
  const userId = await getCurrentUser();
  if (!userId) {
    redirect("/login"); // اگر وارد نشده بود، به صفحه ورود برگردان
  }

  // ۲. دریافت اطلاعات کاربر از دیتابیس
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "USER") { 
    // نکته: در آینده نقش "AGENT" را جداگانه مدیریت می‌کنیم، فعلاً همه کاربران عادی می‌توانند ببینند
  }

  // ۳. دریافت آمار املاک ثبت‌شده توسط این کاربر
  const properties = await prisma.property.findMany({
    where: { agentId: userId },
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  const activeCount = properties.filter(p => p.status === "ACTIVE").length;
  const pendingCount = properties.filter(p => p.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* هدر داشبورد */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">داشبورد مشاور املاک ماهور</h1>
            <p className="text-gray-500 mt-1">خوش آمدید، {user?.name}</p>
          </div>
          <Link 
            href="/agent/properties/new" 
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
          >
            <PlusCircle size={20} />
            ثبت آگهی جدید
          </Link>
        </div>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><Home size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm">آگهی‌های منتشر شده</p>
              <p className="text-2xl font-bold text-gray-800">{activeCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600"><Clock size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm">در انتظار تایید ادمین</p>
              <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><MessageSquare size={24} /></div>
            <div>
              <p className="text-gray-500 text-sm">کل آگهی‌های شما</p>
              <p className="text-2xl font-bold text-gray-800">{properties.length}</p>
            </div>
          </div>
        </div>

        {/* لیست آخرین آگهی‌ها */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-3">آخرین آگهی‌های ثبت‌شده</h3>
          
          {properties.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p>هنوز آگهی‌ای ثبت نکرده‌اید.</p>
              <Link href="/agent/properties/new" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
                اولین آگهی خود را ثبت کنید
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {properties.map((prop) => (
                <div key={prop.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div>
                    <p className="font-bold text-gray-800">{prop.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(prop.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                    prop.status === "ACTIVE" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {prop.status === "ACTIVE" ? "منتشر شده" : "در انتظار تایید"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}