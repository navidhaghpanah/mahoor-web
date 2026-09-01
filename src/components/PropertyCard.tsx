import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
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

function typeTone(type: string) {
  if (type === "SALE") return "bg-[#102847] text-[#f4f0e6]";
  if (type === "RENT") return "bg-[#129b96] text-white";
  return "bg-[#d4af37] text-[#102847]";
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
    <article className="flex h-full flex-col overflow-hidden bg-[#f4f0e6] [border-inline-start:6px_solid_#129b96] border border-[#102847]/10">
      <Link href={`/properties/${id}`} className="flex flex-1 flex-col">
        {imageUrl ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#d7eeea]">
            <Image src={imageUrl} alt={`${title} — ${address}`} fill className="object-cover" />
          </div>
        ) : (
          <div className={`flex aspect-[4/5] items-end p-5 ${typeTone(type)}`}>
            <p className="text-sm font-extrabold">{typeLabel(type)}</p>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          {neighborhood ? (
            <p className="mb-2 w-fit bg-[#d7eeea] px-3 py-1 text-[11px] font-extrabold text-[#0d817e]">
              {neighborhood}
            </p>
          ) : null}
          <h3 className="line-clamp-2 text-lg font-bold text-[#102847]">{title}</h3>
          <p className="mt-3 text-xl font-black text-[#d4af37]">
            {hasPrice ? (
              <>
                {formatPrice(price)} <span className="text-sm font-bold text-[#102847]/50">تومان</span>
              </>
            ) : (
              "تماس برای قیمت"
            )}
          </p>
          <p className="mt-3 text-sm text-[#102847]/70">{meters}</p>
          <p className="mt-auto flex items-start gap-2 pt-4 text-xs text-[#102847]/60">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </p>
        </div>
      </Link>
      <a
        href={SITE.telephoneHref}
        className="border-t border-[#102847]/10 px-5 py-3 text-sm font-extrabold text-[#102847]"
      >
        تماس
      </a>
    </article>
  );
}
