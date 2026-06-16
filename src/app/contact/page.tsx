"use client";
import { useState } from "react";
import { Phone, MapPin, Clock, Send, Loader2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">تماس با املاک ماهور</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ما در محمودآباد آماده پاسخگویی به شما هستیم. از هر طریقی که راحت‌ترید با ما در ارتباط باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* اطلاعات تماس */}
          <div className="space-y-6">
            <div className="card-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Phone className="text-[#d4af37]" size={24} />
                راه‌های ارتباطی
              </h2>
              
              <div className="space-y-5">
                <ContactItem
                  icon={<Phone size={20} />}
                  label="کارشناس عزیزپور"
                  value="۰۹۱۱۱۱۳۴۷۶۷"
                  href="tel:09111134767"
                />
                <ContactItem
                  icon={<Phone size={20} />}
                  label="مهندس آزاد"
                  value="۰۹۱۱۳۲۷۶۶۷"
                  href="tel:09113276667"
                />
                <ContactItem
                  icon={<Phone size={20} />}
                  label="کارشناس رضایی"
                  value="۰۹۱۹۵۱۸۳۹۵۰"
                  href="tel:09195183950"
                />
                <ContactItem
                  icon={<MapPin size={20} />}
                  label="آدرس دفتر"
                  value="محمودآباد، خیابان امام، بعد از نسیم ۶۹/۱"
                />
                <ContactItem
                  icon={<Clock size={20} />}
                  label="ساعات کاری"
                  value="همه روزه ۸ صبح تا ۸ شب"
                />
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="card-modern p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="text-[#1e3a5f]" size={20} />
                شبکه‌های اجتماعی
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <a 
                  href="https://www.instagram.com/amlake_mahour/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-center text-white hover:scale-105 transition-transform"
                >
                  <div className="text-2xl mb-1">📷</div>
                  <div className="text-xs">اینستاگرام</div>
                </a>
                <a 
                  href="https://t.me/mahoorrlste" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#229ED9] rounded-xl p-4 text-center text-white hover:scale-105 transition-transform"
                >
                  <div className="text-2xl mb-1">✈️</div>
                  <div className="text-xs">تلگرام</div>
                </a>
                <a 
                  href="https://wa.me/989111134767" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] rounded-xl p-4 text-center text-white hover:scale-105 transition-transform"
                >
                  <div className="text-2xl mb-1">💬</div>
                  <div className="text-xs">واتساپ</div>
                </a>
              </div>
              <div className="mt-3 text-xs text-gray-500 text-center">
                روبیکا، بله و ایتا: @mahoorrlste
              </div>
            </div>

            {/* نکات مهم */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-xl">💡</span>
                نکات مهم
              </h3>
              <ul className="text-sm text-amber-800 space-y-2 leading-7">
                <li>• پاسخگویی به تماس‌ها: ۸ صبح تا ۸ شب</li>
                <li>• مشاوره اولیه کاملاً رایگان است</li>
                <li>• برای بازدید ملک، هماهنگی قبلی لازم است</li>
                <li>• آدرس: روبروی بروی پارکینگ قزوینی‌پور</li>
              </ul>
            </div>
          </div>

          {/* فرم تماس */}
          <div className="lg:col-span-2">
            <div className="card-modern p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Send className="text-[#1e3a5f]" size={24} />
                ارسال پیام
              </h2>

              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">پیام شما با موفقیت ارسال شد!</h3>
                  <p className="text-green-700 mb-4">
                    کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-primary"
                  >
                    ارسال پیام جدید
                  </button>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام و نام خانوادگی
                      </label>
                      <input
                        name="name"
                        required
                        className="input-modern"
                        placeholder="مثال: علی محمدی"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره تماس
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="input-modern"
                        placeholder="۰۹۱۲۴۵۶۷۸۹"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      موضوع
                    </label>
                    <select name="subject" required className="input-modern">
                      <option value="">انتخاب کنید...</option>
                      <option value="buy">درخواست خرید ملک</option>
                      <option value="sell">درخواست فروش ملک</option>
                      <option value="rent">درخواست اجاره ملک</option>
                      <option value="consult">درخواست مشاوره</option>
                      <option value="contract">خدمات پیمانکاری و ساخت</option>
                      <option value="deed">تفکیک سند</option>
                      <option value="other">سایر موارد</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      متن پیام
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="input-modern resize-none"
                      placeholder="پیام خود را با جزئیات بنویسید..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>در حال ارسال...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        ارسال پیام
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* نقشه */}
            <div className="card-modern p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-[#d4af37]" size={24} />
                موقعیت ما روی نقشه
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.0!2d52.2607!3d36.6333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8eb760f2e84c87%3A0x0!2z2YXYrdmF2YjYr9in2KjYp9ivINmF2KfYmdmI2LMg2LnYsiDZhdix2YPYsiDZhdi52YPZhdin2KvYp9ioINmF2K_YrdmF2YjYr9in2KjYp9iv!5e0!3m2!1sfa!2sir!4v1700000000000!5m2!1sfa!2sir"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقعیت دفتر املاک ماهور در محمودآباد"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/Dv4UxLHXSBrPe1xbA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 mt-4"
              >
                <MapPin size={20} />
                مسیریابی در گوگل مپ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1e3a5f]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:bg-gray-50 p-3 rounded-lg transition-colors">
        {content}
      </a>
    );
  }

  return <div className="p-3">{content}</div>;
}