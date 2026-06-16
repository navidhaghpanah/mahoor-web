export const dynamic = "force-dynamic";
import { Phone, Star, Award, Briefcase } from "lucide-react";

interface Agent {
  name: string;
  role: string;
  phone: string;
  initial: string;
  deals: string;
  experience: string;
  rating: string;
  specialty: string;
}

const agents: Agent[] = [
  {
    name: "کارشناس عزیزپور",
    role: "کارشناس ارشد ملکی",
    phone: "09111134767",
    initial: "ع",
    deals: "۳۰۰+",
    experience: "۱۰+ سال",
    rating: "۴.۹",
    specialty: "خرید، فروش و مشاوره ملکی",
  },
  {
    name: "مهندس آزاد",
    role: "مهندس عمران و کارشناس",
    phone: "09113276667",
    initial: "آ",
    deals: "۵۰+",
    experience: "۸+ سال",
    rating: "۴.۸",
    specialty: "پیمانکاری، طراحی و نظارت",
  },
  {
    name: "کارشناس رضایی",
    role: "کارشناس اجاره و رهن",
    phone: "09195183950",
    initial: "ر",
    deals: "۲۰۰+",
    experience: "۷+ سال",
    rating: "۴.۷",
    specialty: "اجاره، رهن و مشاوره حقوقی",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* هدر */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">کارشناسان املاک ماهور</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تیم متخصص ما با سال‌ها تجربه، آماده خدمت‌رسانی به شما هستند
          </p>
        </div>

        {/* لیست کارشناسان */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.phone} className="card-modern p-8 text-center">
              {/* آواتار */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto border-4 border-[#d4af37]">
                  {agent.initial}
                </div>
              </div>

              {/* اطلاعات */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
              <p className="text-[#d4af37] font-medium text-sm mb-4">{agent.role}</p>
              <p className="text-gray-600 text-sm mb-4">{agent.specialty}</p>

              {/* آمار */}
              <div className="flex justify-center gap-4 py-4 border-y border-gray-200 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#1e3a5f]">{agent.deals}</p>
                  <p className="text-xs text-gray-500">معامله</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#1e3a5f]">{agent.experience}</p>
                  <p className="text-xs text-gray-500">سابقه</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#1e3a5f] flex items-center gap-1">
                    <Star size={16} className="fill-[#d4af37] text-[#d4af37]" />
                    {agent.rating}
                  </p>
                  <p className="text-xs text-gray-500">امتیاز</p>
                </div>
              </div>

              {/* دکمه تماس */}
              <a
                href={`tel:${agent.phone}`}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                تماس با {agent.name.split(" ")[1]}
              </a>
            </div>
          ))}
        </div>

        {/* اطلاعات تماس دفتر */}
        <div className="mt-12 gradient-hero text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">نیاز به مشاوره دارید؟</h2>
          <p className="text-gray-200 mb-6">
            با هر یک از کارشناسان ما تماس بگیرید یا به دفتر ما در محمودآباد مراجعه کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:09111134767" className="btn-secondary inline-flex items-center justify-center gap-2">
              <Phone size={20} />
              ۰۹۱۱۱۱۳۴۷۶۷
            </a>
            <a href="/contact" className="btn-outline inline-flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-[#1e3a5f]">
              اطلاعات تماس کامل
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}