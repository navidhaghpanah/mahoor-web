import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin } from "lucide-react";

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
  bathrooms,
  area,
  address,
  imageUrl,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`} className="block group">
      <div className="card-modern overflow-hidden h-full flex flex-col">
        <div className="relative h-56 w-full overflow-hidden bg-[#e8dcc8]">
          <Image
            src={imageUrl || "/images/mahoor-hero-v1.png"}
            alt={`${title} — ${address}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
              type === "SALE" ? "bg-[#0b3a4a]" : "bg-[#2a5a45]"
            }`}>
              {type === "SALE" ? "فروش" : "اجاره"}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-[#0b3a4a] mb-2 line-clamp-1 group-hover:text-[#2a5a45] transition-colors">
            {title}
          </h3>

          <p className="text-[#0b3a4a] font-extrabold text-xl mb-4 tracking-tight">
            {formatPrice(price)} <span className="text-sm text-gray-500 font-normal">تومان</span>
          </p>

          <div className="flex items-center justify-between text-gray-600 text-sm mb-4 pt-4 border-t border-[#e8dcc8]">
            <div className="flex items-center gap-1.5">
              <Bed size={16} className="text-gray-400" />
              <span>{bedrooms} خواب</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={16} className="text-gray-400" />
              <span>{bathrooms} سرویس</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square size={16} className="text-gray-400" />
              <span>{area} متر</span>
            </div>
          </div>

          <div className="mt-auto flex items-start gap-2 text-gray-500 text-xs">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#c45c4a]" />
            <span className="line-clamp-2">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
