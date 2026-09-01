import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { NasimMark } from "@/components/PhoneText";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

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
      <section className="relative -mt-16 min-h-[100svh] overflow-hidden text-white">
        <img
          src="/images/mahoor-brand-still.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/50 to-black/30" />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-24 text-center">
          <p className="text-[11px] font-bold text-[var(--gold)]">محمودآباد</p>
          <h1 className="mt-4 text-[56px] font-black leading-[1.1] sm:text-[88px]">
            املاک ماهور
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/80">
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

      <section className="bg-[var(--sand)]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-24 lg:order-1 lg:px-12">
            <div className="max-w-[28rem]">
              <p className="text-[11px] font-bold text-[var(--sea)]">امروز در ماهور</p>
              <h2 className="mt-4 text-[36px] font-black leading-[1.1] sm:text-[44px]">
                دفتر خیابان امام، بعد از <NasimMark />
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-[var(--navy)]/75">
                {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={SITE.telephoneHref}
                  className="inline-flex border border-[var(--navy)] px-5 py-3 text-[13px] font-bold"
                >
                  تماس
                </a>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-[var(--sea)]"
                >
                  مسیریابی
                </a>
              </div>
            </div>
          </div>
          <div className="order-1 min-h-[42vh] lg:order-2">
            <img
              src="/images/mahoor-brand-still.jpg"
              alt=""
              className="h-full min-h-[42vh] w-full object-cover lg:min-h-[70vh]"
            />
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="border-t border-[var(--navy)]/10 bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[36px] font-black leading-[1.1]">فایل‌های فعال</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
