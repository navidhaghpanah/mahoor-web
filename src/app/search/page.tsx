export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";

interface SearchParams {
  keyword?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  bedrooms?: string;
}


export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const keyword = params.keyword?.trim();
  const title = keyword ? `جستجو: ${keyword}` : "جستجوی املاک";
  const description = keyword
    ? `نتایج جستجو برای «${keyword}» در آگهی‌های املاک ماهور محمودآباد.`
    : "جستجوی پیشرفته خرید، فروش و اجاره ملک در محمودآباد با فیلتر قیمت، متراژ و تعداد خواب.";
  return {
    title,
    description,
    alternates: { canonical: "/search" },
    openGraph: {
      title: `${title} | املاک ماهور`,
      description,
      url: "/search",
      locale: "fa_IR",
    },
  };
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
    <div className="min-h-screen bg-[#f4f0e6] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">محمودآباد</p>
          <h1 className="mt-3 text-4xl font-black text-[var(--navy)]">جستجو</h1>
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
          <div className="mt-12 max-w-lg border-t border-[var(--navy)]/10 pt-10">
            <h3 className="text-2xl font-black">فایلی با این مشخصات نیست</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--navy)]/65">
              فیلتر را عوض کنید یا با دفتر تماس بگیرید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
