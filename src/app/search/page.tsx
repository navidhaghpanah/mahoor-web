export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { Search, Home } from "lucide-react";

interface SearchParams {
  keyword?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  bedrooms?: string;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  // ساخت شرط‌های پویا برای Prisma
  const whereConditions: any = {
    status: "ACTIVE",
  };

  if (params.keyword) {
    whereConditions.OR = [
      { title: { contains: params.keyword } },
      { address: { contains: params.keyword } },
      { description: { contains: params.keyword } },
    ];
  }

  if (params.type) {
    whereConditions.type = params.type;
  }

  if (params.minPrice) {
    whereConditions.price = { ...whereConditions.price, gte: parseInt(params.minPrice) };
  }

  if (params.maxPrice) {
    whereConditions.price = { ...whereConditions.price, lte: parseInt(params.maxPrice) };
  }

  if (params.minArea) {
    whereConditions.area = { ...whereConditions.area, gte: parseInt(params.minArea) };
  }

  if (params.maxArea) {
    whereConditions.area = { ...whereConditions.area, lte: parseInt(params.maxArea) };
  }

  if (params.bedrooms) {
    if (params.bedrooms === "4") {
      whereConditions.bedrooms = { gte: 4 };
    } else {
      whereConditions.bedrooms = parseInt(params.bedrooms);
    }
  }

  // دریافت املاک بر اساس فیلترها
  const properties = await prisma.property.findMany({
    where: whereConditions,
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Search className="text-[#d4af37]" />
            جستجوی املاک
          </h1>
          <p className="text-gray-600">ملک رویایی خود را با فیلترهای پیشرفته پیدا کنید</p>
        </div>

        {/* فرم فیلتر */}
        <SearchFilters />

        {/* نتایج */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-bold text-[#1e3a5f]">{properties.length}</span> ملک یافت شد
          </p>
        </div>

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
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm mt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Home className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ملکی با این مشخصات یافت نشد</h3>
            <p className="text-gray-500">
              لطفاً فیلترهای خود را تغییر دهید یا عبارت دیگری را جستجو کنید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
