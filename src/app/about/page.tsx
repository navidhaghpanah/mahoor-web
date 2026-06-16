import Link from "next/link";
import { Shield, Users, TrendingUp, Building2, Award, Target, Wrench, FileText, PenTool, HardHat, Car } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر صفحه */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Building2 className="text-[#d4af37]" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">درباره املاک ماهور</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            انجام کلیه خدمات ملکی در محمودآباد با بیش از ۱۵ سال تجربه
          </p>
        </div>
      </section>

      {/* داستان ما */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">داستان ما</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-8">
            <p className="mb-4">
              <strong className="text-[#1e3a5f]">املاک ماهور</strong> با بیش از ۱۵ سال سابقه درخشان در زمینه خدمات ملکی در محمودآباد مازندران، یکی از معتبرترین آژانس‌های ملکی منطقه است. ما در خیابان امام، بعد از نسیم ۶۹/۱، روبروی بروی پارکینگ قزوینی‌پور واقع شده‌ایم.
            </p>
            <p className="mb-4">
              تیم ما متشکل از کارشناسان با تجربه و متخصص در حوزه املاک است که با شناخت عمیق از بازار مسکن محمودآباد و مناطق اطراف، بهترین خدمات را به مشتریان عزیز ارائه می‌دهند.
            </p>
            <p>
              هدف ما ایجاد یک پلتفرم جامع و قابل اعتماد در حوزه املاک و مستغلات است تا شما بتوانید در هر زمان و از هر مکانی، ملک مورد نظر خود را پیدا کنید.
            </p>
          </div>
        </div>
      </section>

      {/* ارزش‌های ما */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Shield className="text-[#1e3a5f]" size={32} />}
              title="اعتماد و شفافیت"
              description="تمامی اطلاعات املاک با دقت بررسی و تایید می‌شوند تا شما با اطمینان کامل تصمیم بگیرید."
            />
            <ValueCard
              icon={<Users className="text-[#d4af37]" size={32} />}
              title="مشاوره تخصصی"
              description="تیم کارشناسان ما با سال‌ها تجربه، در تمام مراحل خرید، فروش یا اجاره همراه شما هستند."
            />
            <ValueCard
              icon={<TrendingUp className="text-[#1e3a5f]" size={32} />}
              title="بهترین فرصت‌ها"
              description="دسترسی به گسترده‌ترین مجموعه املاک با بهترین قیمت‌ها در محمودآباد و مناطق اطراف."
            />
          </div>
        </div>
      </section>

      {/* خدمات ما */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">خدمات ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Building2 className="text-white" size={28} />}
              title="خرید و فروش"
              description="خرید و فروش انواع ملک مسکونی، تجاری و زمین"
            />
            <ServiceCard
              icon={<Target className="text-white" size={28} />}
              title="اجاره و رهن"
              description="بهترین قیمت اجاره و رهن کامل در محمودآباد"
            />
            <ServiceCard
              icon={<FileText className="text-white" size={28} />}
              title="تفکیک سند"
              description="خدمات ثبتی و حقوقی برای تفکیک و انتقال سند"
            />
            <ServiceCard
              icon={<Car className="text-white" size={28} />}
              title="بروی پارکینگ"
              description="خدمات تخصصی قزوینی‌پور برای پارکینگ"
            />
            <ServiceCard
              icon={<PenTool className="text-white" size={28} />}
              title="طراحی و نظارت"
              description="خدمات معماری، طراحی و نظارت بر ساخت"
            />
            <ServiceCard
              icon={<HardHat className="text-white" size={28} />}
              title="پیمانکاری"
              description="ساخت و ساز با بهترین کیفیت و قیمت"
            />
          </div>
        </div>
      </section>

      {/* آمار ما */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">ما در اعداد</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="۵۰۰+" label="آگهی فعال" />
            <StatCard number="۱۰۰۰+" label="معامله موفق" />
            <StatCard number="۱۵+" label="سال سابقه" />
            <StatCard number="۳" label="کارشناس متخصص" />
          </div>
        </div>
      </section>

      {/* دعوت به اقدام */}
      <section className="py-16 px-4 gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">آماده همکاری با ما هستید؟</h2>
          <p className="text-xl text-gray-200 mb-8">
            همین حالا با کارشناسان ما تماس بگیرید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
              تماس با ما
            </Link>
            <Link href="/agents" className="btn-outline inline-flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-[#1e3a5f]">
              مشاهده کارشناسان
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card-modern p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-7">{description}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-200 text-sm leading-6">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-gray-100">
      <p className="text-4xl font-extrabold text-[#1e3a5f] mb-2">{number}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}