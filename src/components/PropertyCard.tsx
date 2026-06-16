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

// تابع فرمت کردن قیمت به صورت فارسی (مثلاً ۵,۰۰۰,۰۰۰,۰۰۰)
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
        {/* بخش تصویر */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-200">
          <Image
            src={imageUrl || "/placeholder-property.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
              type === "SALE" ? "bg-[#1e3a5f]" : "bg-[#d4af37]"
            }`}>
              {type === "SALE" ? "فروش" : "اجاره"}
            </span>
          </div>
        </div>

        {/* بخش محتوا */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#1e3a5f] transition-colors">
            {title}
          </h3>
          
          <p className="text-[#d4af37] font-extrabold text-xl mb-4">
            {formatPrice(price)} <span className="text-sm text-gray-500 font-normal">تومان</span>
          </p>

          <div className="flex items-center justify-between text-gray-600 text-sm mb-4 pt-4 border-t border-gray-100">
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
            <MapPin size={14} className="mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}