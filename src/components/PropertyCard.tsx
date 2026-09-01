import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  imageUrl: string;
  neighborhood?: string;
  landArea?: number;
  buildingArea?: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

function typeLabel(type: string) {
  if (type === "SALE") return "فروش";
  if (type === "RENT") return "اجاره";
  return type;
}

export default function PropertyCard({
  id,
  title,
  price,
  type,
  bedrooms,
  bathrooms: _bathrooms,
  area,
  address,
  imageUrl,
  neighborhood,
  landArea,
  buildingArea,
}: PropertyCardProps) {
  const meters =
    landArea && buildingArea
      ? `${new Intl.NumberFormat("fa-IR").format(landArea)} زمین · ${new Intl.NumberFormat("fa-IR").format(buildingArea)} بنا`
      : `${new Intl.NumberFormat("fa-IR").format(area)} متر · ${bedrooms} خواب`;
  const hasPrice = typeof price === "number" && price > 0;

  return (
    <article className="flex h-full flex-col bg-white">
      <Link href={`/properties/${id}`} className="flex flex-1 flex-col">
        {imageUrl ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--foam)]">
            <Image src={imageUrl} alt={`${title} — ${address}`} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-[4/5] items-end bg-[var(--navy)] p-6 text-white">
            <p className="text-xs font-bold tracking-[0.2em]">{typeLabel(type)}</p>
          </div>
        )}
        <div className="flex flex-1 flex-col px-1 py-5">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[var(--sea)]">
            {neighborhood || typeLabel(type)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-black text-[var(--navy)]">{title}</h3>
          <p className="mt-3 text-xl font-black text-[var(--gold)]">
            {hasPrice ? (
              <>
                {formatPrice(price)} <span className="text-sm font-bold text-[var(--navy)]/40">تومان</span>
              </>
            ) : (
              "تماس برای قیمت"
            )}
          </p>
          <p className="mt-3 text-sm text-[var(--navy)]/60">{meters}</p>
          <p className="mt-auto line-clamp-2 pt-4 text-xs text-[var(--navy)]/50">{address}</p>
        </div>
      </Link>
      <a href={SITE.telephoneHref} className="border-t border-[var(--navy)]/10 py-3 text-sm font-extrabold tracking-[0.08em]">
        تماس
      </a>
    </article>
  );
}
