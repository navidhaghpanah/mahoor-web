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

  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      {/* Jade Mills cinema fold — brand video, identity, one CTA */}
      <section className="relative -mt-[76px] min-h-[100svh] overflow-hidden text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/mahoor-logo-v1.png"
          aria-label="ویدیوی معرفی برند ماهور"
        >
          <source src="/videos/mahoor-brand-v1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33] via-[#0b1f33]/45 to-black/25" />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-28 text-center">
          <p className="text-[11px] font-bold tracking-[0.42em] text-[var(--gold)]">
            <NasimMark />
            <span className="mx-3 text-white/35">·</span>
            محمودآباد
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-7xl">
            املاک ماهور
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/80">
            خرید، رهن، اجاره — مشاور محلی، بازدید حضوری.
          </p>
          <a
            href={SITE.telephoneHref}
            className="mt-10 inline-flex items-center gap-3 border border-white/80 px-8 py-3.5 text-sm font-extrabold tracking-[0.12em] hover:bg-white hover:text-[var(--navy)]"
          >
            <Phone size={16} />
            تماس با دفتر
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--gold)]" />
      </section>

      {/* The Modern House editorial split — office story + map */}
      <section className="bg-[var(--sand)]">
        <div className="mx-auto grid min-h-[70vh] max-w-7xl lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">
              امروز در ماهور
            </p>
            <h2 className="mt-4 text-3xl font-black leading-[1.25] sm:text-4xl">
              دفتر خیابان امام،
              <br />
              بعد از <NasimMark />
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-8 text-[var(--navy)]/75">
              {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.telephoneHref}
                className="inline-flex items-center gap-2 border border-[var(--navy)] px-5 py-3 text-sm font-extrabold"
              >
                <Phone size={15} />
                <PhoneText>{SITE.telephoneHeader}</PhoneText>
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[var(--sea)]"
              >
                <Navigation size={15} />
                مسیریابی
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--navy)]/55">
              {chips.map((chip) => (
                <Link key={chip.href} href={chip.href} className="hover:text-[var(--navy)]">
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="order-1 min-h-[42vh] border-b border-[var(--navy)]/10 lg:order-2 lg:min-h-full lg:border-b-0 lg:border-r">
            <iframe
              src={SITE.mapEmbed}
              width="100%"
              height="100%"
              className="h-full min-h-[42vh] w-full border-0 lg:min-h-[70vh]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت دفتر املاک ماهور"
            />
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="border-t border-[var(--navy)]/10 bg-white px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">فایل‌های فعال</p>
            <h2 className="mt-3 text-3xl font-black">روی میز ماهور</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => (
                <PropertyCard key={listing.id} {...listing} />
              ))}
            </div>
            <Link href="/properties" className="mt-8 inline-block text-sm font-bold tracking-wide">
              همه آگهی‌ها
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--deep)] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--gold)]">تماس</p>
          <h2 className="mt-3 text-3xl font-black">مشاوران دفتر</h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CONTACTS.map((person) => (
              <li key={person.href}>
                <a href={person.href} className="flex items-center justify-between gap-3 py-5 text-sm">
                  <span className="font-bold">{person.name}</span>
                  <span className="inline-flex items-center gap-2 text-[var(--gold)]">
                    <Phone size={14} />
                    <PhoneText>{person.phoneDisplay}</PhoneText>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
