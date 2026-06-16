import Link from "next/link";
import { Home, TrendingUp, Shield, Users, MapPin, Phone } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section با گرادیان آبی */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <MapPin size={18} className="text-[#d4af37]" />
            <span className="text-sm">مشاورین املاک و سرمایه‌گذاری ماهور</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            خانه رویایی خود را با{" "}
            <span className="text-[#d4af37]">ماهور</span> پیدا کنید
          </h1>
          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            هزاران ملک در سراسر کشور با بهترین قیمت و شرایط
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/properties" className="btn-secondary inline-flex items-center justify-center gap-2">
              <Home size={20} />
              مشاهده املاک
            </Link>
            <Link href="/contact" className="btn-outline inline-flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-[#1e3a5f]">
              <Phone size={20} />
              تماس با ما
            </Link>
          </div>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">چرا ماهور؟</h2>
            <p className="text-gray-600">خدمات متمایز ما را بشناسید</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-[#1e3a5f]" size={40} />}
              title="امن و مطمئن"
              description="تمامی معاملات با ضمانت و امنیت کامل انجام می‌شود"
            />
            <FeatureCard 
              icon={<TrendingUp className="text-[#d4af37]" size={40} />}
              title="بهترین قیمت‌ها"
              description="دسترسی به بهترین فرصت‌های سرمایه‌گذاری"
            />
            <FeatureCard 
              icon={<Users className="text-[#1e3a5f]" size={40} />}
              title="مشاوره تخصصی"
              description="تیم مجرب ما در تمام مراحل همراه شماست"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">آماده شروع هستید؟</h2>
          <p className="text-gray-600">همین حالا ثبت‌نام کنید و به جمع مشتریان ماهور بپیوندید</p>
          <Link href="/register" className="btn-primary inline-flex items-center gap-2">
            ثبت‌نام رایگان
            <TrendingUp size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="card-modern p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}