import Link from "next/link";
import { Navigation, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import PhoneText, { NasimMark } from "@/components/PhoneText";
import { CONTACTS, SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const chips = [
  { label: "خرید", href: "/search?type=SALE" },
  { label: "اجاره", href: "/search?type=RENT" },
  { label: "رهن", href: "/search?keyword=رهن" },
  { label: "ویلا", href: "/search?keyword=ویلا" },
  { label: "آپارتمان", href: "/search?keyword=آپارتمان" },
  { label: "زمین", href: "/search?keyword=زمین" },
] as const;

export default async function HomePage() {
  let featured: {
    id: string;
    title: string;
    price: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    address: string;
    imageUrl: string;
  }[] = [];

  try {
    const rows = await prisma.property.findMany({
      where: { status: "ACTIVE" },
      include: { images: { where: { isPrimary: true }, take: 1 } },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    featured = rows.map((property) => ({
      id: property.id,
      title: property.title,
      price: property.price,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      address: property.address,
      imageUrl: property.images[0]?.url || "",
    }));
  } catch {
    featured = [];
  }

  const mobileDesk = featured.slice(0, 2);

  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="relative -mt-[76px] bg-[var(--deep)] px-5 pb-10 pt-28 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold tracking-[0.18em] text-[var(--gold)]">روی میز ماهور</p>
            {featured.length ? (
              <>
                <div className="mt-5 grid gap-4 md:hidden">
                  {mobileDesk.map((listing) => (
                    <PropertyCard key={listing.id} {...listing} />
                  ))}
                </div>
                <div className="mt-5 hidden gap-4 md:grid">
                  {featured.map((listing) => (
                    <PropertyCard key={listing.id} {...listing} />
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-5 border border-white/15 p-6 [border-inline-start:6px_solid_var(--sea)]">
                <p className="text-lg font-black">الان چیزی روی میز نیست — تماس بگیر</p>
                <a href={SITE.telephoneHref} className="mt-4 inline-flex items-center gap-2 font-extrabold text-[var(--gold)]">
                  <Phone size={16} />
                  <PhoneText>{SITE.telephoneDisplay}</PhoneText>
                </a>
              </div>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--gold)]">
              <NasimMark />
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.15] tracking-[-0.03em] sm:text-5xl">
              املاک ماهور · محمودآباد
            </h1>
            <p className="mt-4 text-base leading-8 text-white/80">
              خرید، رهن، اجاره — مشاور محلی، بازدید حضوری.
            </p>
            <p className="mt-2 text-sm text-white/60">بازدید با مشاور، نه آگهی تنها</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.telephoneHref}
                className="inline-flex items-center gap-2 bg-[var(--sand)] px-5 py-3 text-sm font-extrabold text-[var(--navy)]"
              >
                <Phone size={16} />
                <PhoneText>{SITE.telephoneHeader}</PhoneText>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-bold"
              >
                واتساپ
              </a>
              <Link
                href="/register"
                className="inline-flex items-center px-5 py-3 text-sm font-bold text-white/70 underline-offset-4 hover:text-[var(--gold)] hover:underline"
              >
                ثبت آگهی
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[6px] w-full bg-[var(--gold)]" />

      <section className="bg-[var(--sea)] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {chips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="rounded-full bg-[var(--foam)] px-4 py-2 text-sm font-extrabold text-[var(--navy)]"
            >
              {chip.label}
            </Link>
          ))}
          <Link
            href="/properties"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-extrabold text-white"
          >
            همه آگهی‌ها
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[var(--sea)]">دفتر</p>
        <h2 className="mt-2 text-2xl font-black">
          <NasimMark />
          <span className="mx-2 text-[var(--navy)]/30">·</span>
          خیابان امام
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--navy)]/70">
          {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
        </p>
        <ul className="mt-6 max-w-xl divide-y divide-[var(--navy)]/10">
          {CONTACTS.map((person) => (
            <li key={person.href}>
              <a href={person.href} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="font-bold">{person.name}</span>
                <span className="inline-flex items-center gap-2 text-[var(--navy)]">
                  <Phone size={14} />
                  <PhoneText>{person.phoneDisplay}</PhoneText>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--sea)]"
        >
          <Navigation size={16} />
          مسیریابی
        </a>
      </section>
    </div>
  );
}
