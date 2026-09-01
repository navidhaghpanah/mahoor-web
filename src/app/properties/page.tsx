export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { SITE } from "@/lib/site";
import PhoneText, { NasimMark } from "@/components/PhoneText";

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
    <div className="min-h-screen bg-[var(--sand)] text-[var(--navy)]">
      <section className="bg-[var(--deep)] px-5 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-[13px] font-bold text-[var(--gold)]">محمودآباد</p>
          <h1 className="mt-3 text-[36px] font-black leading-[1.1] sm:text-[48px]">فایل‌های فعال</h1>
          <p className="mt-4 max-w-xl text-[15px] font-normal leading-7 text-white/70">
            فقط آگهی‌های تاییدشده دفتر. بدون فایل ساختگی.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="max-w-lg">
            <h2 className="text-[28px] font-black leading-[1.1]">الان فایلی روی میز نیست</h2>
            <p className="mt-4 text-[15px] font-normal leading-7 text-[var(--navy)]/70">
              برای مشاوره یا ثبت آگهی با دفتر ماهور تماس بگیرید. محمودآباد، خیابان امام، بعد از <NasimMark />.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={SITE.telephoneHref}
                className="inline-flex bg-[var(--navy)] px-6 py-3 text-[13px] font-bold text-[var(--sand)]"
              >
                <PhoneText>{SITE.telephoneHeader}</PhoneText>
              </a>
              <Link href="/register" className="text-[13px] font-bold text-[var(--navy)]">
                ثبت آگهی
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
