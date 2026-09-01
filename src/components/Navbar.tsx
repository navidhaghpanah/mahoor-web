"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PUBLIC_NAV, SITE } from "@/lib/site";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e3a5f]/10 bg-white/90 text-[#102847] shadow-[0_8px_30px_rgba(16,40,71,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#f8fbfb] p-1 ring-1 ring-[#129b96]/15 transition group-hover:ring-[#d4af37]/50">
              <Image
                src="/images/mahoor-logo-v1.png"
                alt="لوگوی املاک ماهور"
                width={1280}
                height={720}
                priority
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-[#102847]">
                املاک <span className="text-[#129b96]">ماهور</span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500">خرید، فروش و اجاره در محمودآباد</p>
            </div>
          </Link>

          <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive(item.href)
                    ? "bg-[#e8f7f6] text-[#087e7b]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#129b96]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE.telephoneHref}
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold text-[#102847] transition hover:bg-slate-50"
            >
              <Phone className="text-[#129b96]" size={17} />
              011 4473 5333
            </a>
            <Link
              href="/register"
              className="rounded-xl bg-[#d4af37] px-5 py-2.5 text-sm font-extrabold text-[#102847] shadow-[0_8px_20px_rgba(212,175,55,0.28)] transition hover:bg-[#c9972e]"
            >
              + ثبت آگهی
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-[#102847] transition hover:bg-slate-50 hover:text-[#129b96] lg:hidden"
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden"
        >
          <nav className="space-y-1" aria-label="منوی موبایل">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-3 py-3 font-bold ${
                  isActive(item.href) ? "bg-[#e8f7f6] text-[#087e7b]" : "text-slate-700 hover:bg-[#effafa]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={SITE.telephoneHref}
            dir="ltr"
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-3 font-bold text-[#129b96]"
          >
            <Phone size={18} />
            011 4473 5333
          </a>
          <Link
            href="/search"
            className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 font-bold text-slate-700 hover:bg-[#effafa]"
          >
            <Search size={18} />
            جستجوی پیشرفته
          </Link>
          <Link
            href="/register"
            className="mt-2 block rounded-xl bg-[#d4af37] px-4 py-3 text-center font-extrabold text-[#102847]"
          >
            ثبت آگهی
          </Link>
        </div>
      )}
    </header>
  );
}
