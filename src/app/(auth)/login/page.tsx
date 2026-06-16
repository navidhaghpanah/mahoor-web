"use client";
import { useState } from "react";
import { loginUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await loginUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      // بعد از ورود موفق، کاربر را به صفحه اصلی می‌فرستیم
      // (در مراحل بعد داشبورد اختصاصی بر اساس نقش کاربر را می‌سازیم)
      router.push("/"); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          ورود به املاک ماهور
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ایمیل
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود به حساب"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}