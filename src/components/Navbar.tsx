"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PUBLIC_NAV, SITE } from "@/lib/site";
import PhoneText, { NasimMark } from "@/components/PhoneText";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const ghost = home && !scrolled && !isMenuOpen;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!home) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        ghost
          ? "border-b border-white/10 bg-transparent text-white shadow-none"
          : "border-b border-[#102847]/10 bg-[#f4f0e6]/95 text-[#102847] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-16 items-center justify-center overflow-hidden bg-white p-1">
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
              <p className={`text-xl font-black leading-none ${ghost ? "text-white" : "text-[#102847]"}`}>
                املاک ماهور
              </p>
              <p className={`mt-1 text-[11px] font-bold ${ghost ? "text-[#d4af37]" : "text-[#129b96]"}`}>
                <NasimMark />
              </p>
            </div>
          </Link>

          <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive(item.href)
                    ? ghost
                      ? "bg-white/10 text-white"
                      : "bg-[#d7eeea] text-[#0d817e]"
                    : ghost
                      ? "text-white/80 hover:bg-white/10"
                      : "text-[#102847]/70 hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE.telephoneHref}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-extrabold ${ghost ? "text-white" : "text-[#102847]"}`}
            >
              <Phone className={ghost ? "text-[#d4af37]" : "text-[#129b96]"} size={17} />
              <PhoneText>{SITE.telephoneHeader}</PhoneText>
            </a>
            <Link
              href="/register"
              className="bg-[#d4af37] px-5 py-2.5 text-sm font-extrabold text-[#102847]"
            >
              ثبت آگهی
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE.telephoneHref}
              className={`px-3 py-2 text-sm font-extrabold ${ghost ? "text-[#d4af37]" : "text-[#102847]"}`}
            >
              تماس
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`rounded-lg p-2 ${ghost ? "text-white" : "text-[#102847]"}`}
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-[#102847]/10 bg-[#f4f0e6] px-4 py-4 text-[#102847] lg:hidden">
          <nav className="space-y-1" aria-label="منوی موبایل">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-3 font-bold ${isActive(item.href) ? "bg-[#d7eeea] text-[#0d817e]" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={SITE.telephoneHref} className="mt-3 flex items-center gap-2 px-3 py-3 font-bold">
            <Phone size={18} />
            <PhoneText>{SITE.telephoneHeader}</PhoneText>
          </a>
          <Link href="/search" className="mt-1 flex items-center gap-2 px-3 py-3 font-bold">
            <Search size={18} />
            جستجوی پیشرفته
          </Link>
          <Link href="/register" className="mt-2 block bg-[#d4af37] px-4 py-3 text-center font-extrabold text-[#102847]">
            ثبت آگهی
          </Link>
        </div>
      )}
    </header>
  );
}
