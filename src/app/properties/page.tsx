export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MakeAdminPage() {
  // ... بقیه کد
}
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { Search, Home } from "lucide-react";

export default async function PropertiesPage() {
  // دریافت فقط املاک تایید شده (ACTIVE) از دیتابیس
  const properties = await prisma.property.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Home className="text-[#d4af37]" />
            املاک موجود در ماهور
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            جدیدترین آگهی‌های تایید شده را مشاهده کنید. برای اطلاعات بیشتر روی هر ملک کلیک کنید.
          </p>
        </div>

        {/* لیست املاک */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                type={property.type}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                address={property.address}
                imageUrl={property.images[0]?.url || ""}
              />
            ))}
          </div>
        ) : (
          // حالت خالی بودن لیست
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">هنوز ملکی منتشر نشده است</h3>
            <p className="text-gray-500">
              به زودی املاک جدید به این بخش اضافه خواهند شد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}