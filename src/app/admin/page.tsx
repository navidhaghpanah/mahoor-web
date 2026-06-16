export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updatePropertyStatus, deleteProperty } from "@/app/actions/adminActions";
import { Shield, CheckCircle, XCircle, Trash2, Home, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // ۱. بررسی اینکه کاربر وارد شده و ادمین است
  const userId = await getCurrentUser();
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-8 rounded-2xl text-red-700 border border-red-200">
          <h2 className="text-xl font-bold mb-2">دسترسی غیرمجاز</h2>
          <p>فقط ادمین‌ها می‌توانند به این صفحه دسترسی داشته باشند.</p>
        </div>
      </div>
    );
  }

  // ۲. دریافت آمار
  const [pendingCount, activeCount, totalCount] = await Promise.all([
    prisma.property.count({ where: { status: "PENDING" } }),
    prisma.property.count({ where: { status: "ACTIVE" } }),
    prisma.property.count(),
  ]);

  // ۳. دریافت آگهی‌های در انتظار تایید
  const pendingProperties = await prisma.property.findMany({
    where: { status: "PENDING" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      agent: { select: { name: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // ۴. دریافت همه آگهی‌ها
  const allProperties = await prisma.property.findMany({
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      agent: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* هدر */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
              <Shield className="text-[#d4af37]" size={24} />
            </div>
            پنل مدیریت املاک ماهور
          </h1>
          <p className="text-gray-600 mt-2">
            خوش آمدید، <strong>{user.name}</strong>
          </p>
        </div>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-modern p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="text-amber-600" size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">در انتظار تایید</p>
              <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>

          <div className="card-modern p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-600" size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">منتشر شده</p>
              <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
            </div>
          </div>

          <div className="card-modern p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">کل آگهی‌ها</p>
              <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
            </div>
          </div>
        </div>

        {/* بخش آگهی‌های در انتظار تایید */}
        {pendingCount > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="text-amber-600" size={24} />
              آگهی‌های در انتظار تایید ({pendingCount})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingProperties.map((property) => (
                <div key={property.id} className="card-modern p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                      در انتظار تایید
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(property.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    <p><strong>مشاور:</strong> {property.agent.name}</p>
                    <p><strong>تماس:</strong> {property.agent.phone}</p>
                    <p><strong>قیمت:</strong> {new Intl.NumberFormat("fa-IR").format(property.price)} تومان</p>
                  </div>

                  <div className="flex gap-2">
                    <form action={async () => { "use server"; await updatePropertyStatus(property.id, "ACTIVE"); }}>
                      <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                        <CheckCircle size={16} />
                        تایید
                      </button>
                    </form>
                    
                    <form action={async () => { "use server"; await updatePropertyStatus(property.id, "REJECTED"); }}>
                      <button className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition">
                        <XCircle size={16} />
                        رد
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* بخش همه آگهی‌ها */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Home className="text-[#1e3a5f]" size={24} />
            آخرین آگهی‌ها
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-sm font-bold text-gray-700">عنوان</th>
                    <th className="p-4 text-sm font-bold text-gray-700">مشاور</th>
                    <th className="p-4 text-sm font-bold text-gray-700">قیمت</th>
                    <th className="p-4 text-sm font-bold text-gray-700">وضعیت</th>
                    <th className="p-4 text-sm font-bold text-gray-700">تاریخ</th>
                    <th className="p-4 text-sm font-bold text-gray-700">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900">{property.title}</td>
                      <td className="p-4 text-sm text-gray-600">{property.agent.name}</td>
                      <td className="p-4 text-sm font-bold text-gray-700">
                        {new Intl.NumberFormat("fa-IR").format(property.price)}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          property.status === "ACTIVE" 
                            ? "bg-green-100 text-green-700" 
                            : property.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {property.status === "ACTIVE" ? "منتشر شده" : 
                           property.status === "PENDING" ? "در انتظار" : "رد شده"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString("fa-IR")}
                      </td>
                      <td className="p-4">
                        <form action={async () => { "use server"; await deleteProperty(property.id); }}>
                          <button className="text-red-500 hover:text-red-700 transition" title="حذف">
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}