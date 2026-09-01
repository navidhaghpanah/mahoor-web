import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

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

  return (
    <Link href={`/properties/${id}`} className="block group">
      <article className="flex h-full flex-col overflow-hidden bg-[#f4f0e6] [border-inline-start:6px_solid_#129b96] border border-[#102847]/10">
        {imageUrl ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#d7eeea]">
            <Image
              src={imageUrl}
              alt={`${title} — ${address}`}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-5">
          {neighborhood ? (
            <p className="mb-2 w-fit bg-[#d7eeea] px-3 py-1 text-[11px] font-extrabold text-[#0d817e]">
              {neighborhood}
            </p>
          ) : null}
          <h3 className="font-bold text-lg text-[#102847] line-clamp-2">{title}</h3>
          <p className="mt-3 text-xl font-black text-[#d4af37]">
            {formatPrice(price)} <span className="text-sm font-bold text-[#102847]/50">تومان</span>
          </p>
          <p className="mt-3 text-sm text-[#102847]/70">{meters}</p>
          <p className="mt-auto flex items-start gap-2 pt-4 text-xs text-[#102847]/60">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </p>
          <p className="mt-3 text-[11px] font-extrabold text-[#129b96]">
            {type === "SALE" ? "فروش" : "اجاره"}
          </p>
        </div>
      </article>
    </Link>
  );
}
