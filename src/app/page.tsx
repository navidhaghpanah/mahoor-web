import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import PhoneText, { NasimMark } from "@/components/PhoneText";
import { CONTACTS, SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const SERVICES = [
  "خرید و فروش",
  "اجاره و رهن",
  "تفکیک سند",
  "طراحی و نظارت",
  "پیمانکاری",
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
    <div className="bg-[var(--deep)] text-white">
      <section className="relative -mt-16 min-h-[100svh] overflow-hidden text-white">
        <img
          src="/images/mahoor-brand-still.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/55 to-black/35" />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-24 text-center">
          <p className="text-[13px] font-bold text-[var(--gold)]">املاک ماهور</p>
          <h1 className="mt-5 text-[56px] font-black leading-[1.1] sm:text-[88px] md:text-[104px]">
            محمودآباد
          </h1>
          <p className="mt-6 max-w-lg text-[15px] font-normal leading-7 text-white/80">
            خرید، رهن، اجاره — مشاور محلی، بازدید حضوری.
          </p>
          <a
            href={SITE.telephoneHref}
            className="mt-10 inline-flex bg-[var(--sand)] px-8 py-3.5 text-[13px] font-bold text-[var(--navy)]"
          >
            تماس با دفتر
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)]" />
      </section>

      <section className="relative min-h-[80vh] overflow-hidden text-white">
        <img
          src="/images/mahoor-hero-v1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--deep)]/70" />
        <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-5 py-24 text-center">
          <h2 className="text-[48px] font-black leading-[1.1] sm:text-[72px]">دفتر</h2>
          <p className="mt-6 max-w-xl text-[15px] font-normal leading-7 text-white/80">
            محمودآباد، خیابان امام، بعد از <NasimMark />. {SITE.addressExtra}.
          </p>
          <Link
            href="/about"
            className="mt-8 text-[15px] font-bold text-white hover:text-[var(--gold)]"
          >
            «بیشتر»
          </Link>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center bg-[var(--deep)] px-5 py-24 text-white">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-[48px] font-black leading-[1.1] sm:text-[72px]">خدمات</h2>
          <ul className="mt-12 space-y-4">
            {SERVICES.map((title) => (
              <li key={title} className="text-2xl font-normal leading-[1.1] sm:text-3xl">
                {title}
              </li>
            ))}
          </ul>
          <Link
            href="/about#services"
            className="mt-12 inline-block text-[15px] font-bold text-white hover:text-[var(--gold)]"
          >
            «بیشتر»
          </Link>
        </div>
      </section>

      <section className="bg-[var(--sand)] px-5 py-24 text-[var(--navy)]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[48px] font-black leading-[1.1] sm:text-[72px]">تماس</h2>
          <ul className="mt-12 divide-y divide-[var(--navy)]/10 text-right">
            {CONTACTS.map((person) => (
              <li key={person.href}>
                <a
                  href={person.href}
                  className="flex items-center justify-between gap-3 py-4 text-[15px]"
                >
                  <span className="font-bold">{person.name}</span>
                  <PhoneText className="font-bold">{person.phoneDisplay}</PhoneText>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] font-normal leading-7">{SITE.hours}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold hover:text-[var(--gold)]"
            >
              واتساپ
            </a>
            <Link href="/contact" className="text-[15px] font-bold hover:text-[var(--gold)]">
              «بیشتر»
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="bg-white px-5 py-24 text-[var(--navy)]">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[36px] font-black leading-[1.1] sm:text-[48px]">فایل‌های فعال</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => (
                <PropertyCard key={listing.id} {...listing} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
