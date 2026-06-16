"use client";
import { useState } from "react";
import { registerUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Phone, Mail, Lock, Building2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      router.push("/agent");
    }
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Header با لوگو و رنگ‌های ماهور */}
        <div className="bg-[#1e3a5f] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4af37] rounded-2xl mb-4">
            <Building2 size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            عضویت در املاک ماهور
          </h2>
          <p className="text-gray-300 text-sm">
            به خانواده بزرگ ماهور بپیوندید
          </p>
        </div>
        
        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-200 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام و نام خانوادگی
              </label>
              <div className="relative">
                <User size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  required
                  className="input-modern pr-11"
                  placeholder="مثال: علی محمدی"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شماره موبایل
              </label>
              <div className="relative">
                <Phone size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="phone"
                  type="tel"
                  required
                  className="input-modern pr-11"
                  placeholder="09123456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <div className="relative">
                <Mail size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  className="input-modern pr-11"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <Lock size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="input-modern pr-11"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  در حال ثبت‌نام...
                </span>
              ) : (
                "ثبت‌نام"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-[#1e3a5f] font-bold hover:text-[#d4af37] transition-colors">
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}