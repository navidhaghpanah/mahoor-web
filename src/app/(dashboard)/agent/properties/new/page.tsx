"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { createProperty } from "@/app/actions/propertyActions";
import { useRouter } from "next/navigation";
import { Home, MapPin, Image as ImageIcon, Loader2 } from "lucide-react";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
      <Loader2 className="animate-spin text-[#1e3a5f]" size={32} />
    </div>
  ),
});

export default function NewPropertyPage() {
  const router = useRouter();
  const [lat, setLat] = useState(35.6892);
  const [lng, setLng] = useState(51.3890);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");
    setUploadProgress("در حال آپلود تصاویر...");

    try {
      // ۱. دریافت عکس‌ها از فرم
      const images = formData.getAll("images") as File[];

      if (images.length === 0) {
        setError("لطفاً حداقل یک تصویر انتخاب کنید.");
        setIsSubmitting(false);
        setUploadProgress("");
        return;
      }

      // ۲. آپلود عکس‌ها به سرور
      const uploadFormData = new FormData();
      images.forEach((img) => uploadFormData.append("images", img));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        setError("خطا در آپلود تصاویر. لطفاً دوباره تلاش کنید.");
        setIsSubmitting(false);
        setUploadProgress("");
        return;
      }

      setUploadProgress("در حال ثبت اطلاعات ملک...");

      // ۳. ساخت FormData جدید بدون فایل‌ها
      const cleanFormData = new FormData();
      
      // کپی کردن همه فیلدها به جز images
      for (const [key, value] of formData.entries()) {
        if (key !== "images") {
          cleanFormData.append(key, value as string);
        }
      }

      // ۴. افزودن مختصات و لینک عکس‌ها
      cleanFormData.append("latitude", lat.toString());
      cleanFormData.append("longitude", lng.toString());
      cleanFormData.append("imageUrls", JSON.stringify(uploadData.urls));

      // ۵. ثبت ملک در دیتابیس
      const result = await createProperty(cleanFormData);

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        setUploadProgress("");
      } else if (result.success) {
        router.push("/agent");
      }
    } catch (err) {
      setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.");
      setIsSubmitting(false);
      setUploadProgress("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* هدر */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
              <Home className="text-[#d4af37]" size={24} />
            </div>
            ثبت آگهی جدید
          </h1>
          <p className="text-gray-600 mt-2">
            اطلاعات ملک خود را با دقت وارد کنید. آگهی شما پس از تایید ادمین منتشر می‌شود.
          </p>
        </div>

        {/* پیام خطا */}
        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* فرم */}
        <form action={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          
          {/* بخش ۱: اطلاعات اصلی */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              اطلاعات اصلی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان آگهی
                </label>
                <input
                  name="title"
                  required
                  className="input-modern"
                  placeholder="مثال: آپارتمان ۱۰۰ متری نوساز در سعادت‌آباد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع معامله
                </label>
                <select name="type" required className="input-modern">
                  <option value="SALE">فروش</option>
                  <option value="RENT">اجاره</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت (تومان)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  className="input-modern"
                  placeholder="مثال: 5000000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  متراژ (متر مربع)
                </label>
                <input
                  name="area"
                  type="number"
                  required
                  className="input-modern"
                  placeholder="مثال: 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تعداد اتاق خواب
                </label>
                <input
                  name="bedrooms"
                  type="number"
                  required
                  className="input-modern"
                  placeholder="مثال: 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تعداد سرویس بهداشتی
                </label>
                <input
                  name="bathrooms"
                  type="number"
                  required
                  className="input-modern"
                  placeholder="مثال: 1"
                />
              </div>
            </div>
          </div>

          {/* بخش ۲: توضیحات و آدرس */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              توضیحات و آدرس
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کامل ملک
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="input-modern resize-none"
                  placeholder="طبقه، امکانات، سال ساخت، جهت ساختمان، وضعیت سند و..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  آدرس دقیق
                </label>
                <input
                  name="address"
                  required
                  className="input-modern"
                  placeholder="مثال: تهران، سعادت‌آباد، خیابان علامه شمالی، پلاک ۱۲۳"
                />
              </div>
            </div>
          </div>

          {/* بخش ۳: موقعیت روی نقشه */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <MapPin size={20} className="text-[#d4af37]" />
              موقعیت روی نقشه
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              برای تنظیم دقیق موقعیت ملک، روی نقشه کلیک کنید.
            </p>
            <MapPicker
              onLocationSelect={(newLat, newLng) => {
                setLat(newLat);
                setLng(newLng);
              }}
              initialLat={lat}
              initialLng={lng}
            />
            <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <strong>مختصات فعلی:</strong> {lat.toFixed(6)}, {lng.toFixed(6)}
            </div>
          </div>

          {/* بخش ۴: تصاویر */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <ImageIcon size={20} className="text-[#d4af37]" />
              تصاویر ملک
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              حداقل ۱ تصویر و حداکثر ۵ تصویر با فرمت JPG یا PNG آپلود کنید.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1e3a5f] transition-colors">
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                required
                className="block w-full text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#1e3a5f] file:text-white
                  hover:file:bg-[#152a45]
                  file:cursor-pointer cursor-pointer"
              />
            </div>
          </div>

          {/* دکمه ثبت */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{uploadProgress || "در حال پردازش..."}</span>
                </>
              ) : (
                <>
                  <Home size={20} />
                  ثبت آگهی و ارسال برای تایید
                </>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              آگهی شما پس از ثبت، توسط ادمین بررسی و در صورت تایید منتشر می‌شود.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}