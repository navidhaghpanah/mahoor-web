"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowRight, Building2, Menu, X, Phone, Users, Info } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* لوگو و نام برند */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="text-[#d4af37]" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#1e3a5f]">املاک ماهور</h1>
              <p className="text-xs text-gray-500 -mt-1">محمودآباد</p>
            </div>
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors flex items-center gap-1">
              <Home size={18} />
              صفحه اصلی
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors">
              جستجوی املاک
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors flex items-center gap-1">
              <Users size={16} />
              کارشناسان
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors flex items-center gap-1">
              <Info size={16} />
              درباره ما
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors flex items-center gap-1">
              <Phone size={16} />
              تماس
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-[#1e3a5f] font-medium transition-colors">
              ورود
            </Link>
            <Link href="/register" className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#152a45] transition">
              ثبت‌نام
            </Link>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-1 text-gray-600 hover:text-[#1e3a5f] transition-colors"
              title="بازگشت به صفحه قبل"
            >
              <ArrowRight size={20} />
              <span className="text-sm">بازگشت</span>
            </button>
          </div>

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#1e3a5f]"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              صفحه اصلی
            </Link>
            <Link href="/search" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              جستجوی املاک
            </Link>
            <Link href="/agents" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              کارشناسان
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              درباره ما
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              تماس با ما
            </Link>
            <Link href="/login" className="block text-gray-700 hover:text-[#1e3a5f] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              ورود
            </Link>
            <Link href="/register" className="block bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-[#152a45] transition" onClick={() => setIsMenuOpen(false)}>
              ثبت‌نام
            </Link>
            <button
              onClick={() => {
                handleGoBack();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#1e3a5f] py-2 border-t border-gray-200 mt-2"
            >
              <ArrowRight size={20} />
              <span>بازگشت به صفحه قبل</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}