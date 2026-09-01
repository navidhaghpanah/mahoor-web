export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "آگهی‌های ملک",
  description:
    "جدیدترین آگهی‌های تاییدشده خرید، فروش و اجاره ملک در محمودآباد از املاک ماهور.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "املاک موجود | املاک ماهور محمودآباد",
    description: "فهرست آگهی‌های فعال خرید و اجاره در محمودآباد.",
    url: "/properties",
    locale: "fa_IR",
  },
};

export default async function PropertiesPage() {
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
    <div className="min-h-screen bg-[#f4f0e6] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-right">
          <p className="text-xs font-bold tracking-[0.2em] text-[#129b96]">محمودآباد · خزر</p>
          <h1 className="text-4xl md:text-5xl text-[#102847] mt-2 flex items-center justify-end gap-3">
            املاک موجود در ماهور
            <Home className="text-[#c6a15b]" />
          </h1>
          <p className="text-[#142428]/70 max-w-2xl mr-auto mt-3">
            فقط آگهی‌های تایید شده. بدون فایل ساختگی.
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
          <div className="empty-lot p-12 text-center">
            <h3 className="text-3xl text-[#102847] mb-2">ساحل هنوز خلوت است</h3>
            <p className="text-[#142428]/70 mb-6">
              هنوز ملک تاییدشده‌ای منتشر نشده. برای ثبت آگهی یا مشاوره با دفتر ماهور در تماس باشید.
            </p>
            <Link href="/register" className="btn-secondary inline-block">
              ثبت آگهی
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
