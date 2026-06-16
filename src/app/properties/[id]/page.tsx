export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MakeAdminPage() {
  // ... بقیه کد
}
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Phone, Mail, Calendar, Home } from "lucide-react";
import PropertyMap from "@/components/PropertyMap";
import ContactForm from "@/components/ContactForm";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // در Next.js 16، params یک Promise است و باید await شود
  const { id } = await params;

  // دریافت اطلاعات ملک از دیتابیس
  const property = await prisma.property.findFirst({
    where: { 
      id: id, 
      status: "ACTIVE" 
    },
    include: { 
      images: {
        orderBy: { isPrimary: "desc" },
      }, 
      agent: { select: { name: true, phone: true, email: true } } 
    },
  });

  if (!property) {
    notFound();
  }

  // تابع فرمت قیمت
  const formatPrice = (price: number) => new Intl.NumberFormat("fa-IR").format(price);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* هدر */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${
              property.type === "SALE" ? "bg-[#1e3a5f]" : "bg-[#d4af37]"
            }`}>
              {property.type === "SALE" ? "فروش" : "اجاره"}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={16} />
              {new Date(property.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={20} className="text-[#d4af37]" />
            <span className="text-lg">{property.address}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون اصلی */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* گالری تصاویر */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-96 w-full bg-gray-200">
                <Image 
                  src={property.images[0]?.url || "/placeholder.jpg"} 
                  alt={property.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {property.images.slice(1, 5).map((img, index) => (
                    <div key={img.id} className="relative h-24 w-full rounded-lg overflow-hidden bg-gray-200">
                      <Image src={img.url} alt={`${property.title} ${index + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* مشخصات کلیدی */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Home size={24} className="text-[#1e3a5f]" />
                مشخصات ملک
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-5 rounded-xl text-center">
                  <Bed className="mx-auto mb-2 text-[#1e3a5f]" size={28} />
                  <p className="text-sm text-gray-500 mb-1">اتاق خواب</p>
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl text-center">
                  <Bath className="mx-auto mb-2 text-[#1e3a5f]" size={28} />
                  <p className="text-sm text-gray-500 mb-1">سرویس بهداشتی</p>
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl text-center">
                  <Square className="mx-auto mb-2 text-[#1e3a5f]" size={28} />
                  <p className="text-sm text-gray-500 mb-1">متراژ</p>
                  <p className="text-2xl font-bold text-gray-900">{property.area} <span className="text-sm font-normal">متر</span></p>
                </div>
              </div>
            </div>

            {/* توضیحات */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                توضیحات ملک
              </h2>
              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* نقشه */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
                <MapPin size={24} className="text-[#d4af37]" />
                موقعیت روی نقشه
              </h2>
              <PropertyMap lat={property.latitude} lng={property.longitude} />
            </div>
          </div>

          {/* ستون کناری */}
          <div className="space-y-6">
            
            {/* کارت قیمت */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-300 text-sm mb-2">
                قیمت {property.type === "SALE" ? "کل" : "رهن و اجاره"}
              </p>
              <p className="text-3xl font-extrabold mb-1">
                {formatPrice(property.price)}
              </p>
              <p className="text-gray-300 text-sm">تومان</p>
            </div>

            {/* کارت مشاور */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone size={20} className="text-[#d4af37]" />
                اطلاعات مشاور
              </h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{property.agent.name}</p>
                  <p className="text-sm text-gray-500">مشاور املاک ماهور</p>
                </div>
              </div>
              
              <a 
                href={`tel:${property.agent.phone}`} 
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition mb-3 shadow-md"
              >
                <Phone size={20} />
                تماس مستقیم
              </a>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>شماره تماس:</strong> {property.agent.phone}
                </p>
                {property.agent.email && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail size={16} />
                    {property.agent.email}
                  </p>
                )}
              </div>

              {/* فرم تماس با مشاور */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">ارسال پیام به مشاور:</h4>
                <ContactForm 
                  propertyId={property.id} 
                  agentId={property.agentId} 
                />
              </div>
            </div>

            {/* نکات ایمنی */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h4 className="font-bold text-amber-900 mb-2 text-sm">⚠️ نکات ایمنی</h4>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• قبل از پرداخت، ملک را بازدید کنید</li>
                <li>• مدارک مالکیت را بررسی کنید</li>
                <li>• از پرداخت بیعانه خودداری کنید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}