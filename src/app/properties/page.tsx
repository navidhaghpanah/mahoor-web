export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { SITE } from "@/lib/site";
import PhoneText from "@/components/PhoneText";

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
    where: { status: "ACTIVE" },
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[var(--sand)] px-6 py-16 text-[var(--navy)]">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">محمودآباد</p>
        <h1 className="mt-3 text-4xl font-black">فایل‌های فعال</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--navy)]/65">فقط آگهی‌های تاییدشده دفتر. بدون فایل ساختگی.</p>

        {properties.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-16 max-w-lg border-t border-[var(--navy)]/10 pt-10">
            <h2 className="text-2xl font-black">هنوز فایل منتشر نشده</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--navy)]/65">
              برای مشاوره یا ثبت آگهی با دفتر ماهور تماس بگیرید. {SITE.address}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={SITE.telephoneHref} className="border border-[var(--navy)] px-5 py-3 text-sm font-extrabold">
                <PhoneText>{SITE.telephoneHeader}</PhoneText>
              </a>
              <Link href="/register" className="px-5 py-3 text-sm font-bold text-[var(--sea)]">
                ثبت آگهی
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
