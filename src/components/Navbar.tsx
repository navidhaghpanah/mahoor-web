"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PUBLIC_NAV, SITE } from "@/lib/site";

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`z-50 text-[#142428] transition-colors duration-300 ${
        ghost
          ? "sticky top-0 border-b border-white/10 bg-transparent text-white shadow-none"
          : "sticky top-0 border-b border-[#0b3a4a]/10 bg-[#f3eee4]/90 shadow-[0_8px_30px_rgba(11,58,74,0.08)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className={`flex h-12 w-16 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 transition ${ghost ? "ring-white/20" : "ring-[#2a5a45]/15 group-hover:ring-[#c6a15b]/50"}`}>
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
              <p className={`text-xl font-black leading-none ${ghost ? "text-white" : "text-[#0b3a4a]"}`}>
                املاک <span className={ghost ? "text-[#e8dcc8]" : "text-[#2a5a45]"}>ماهور</span>
              </p>
              <p className={`mt-1 text-[11px] ${ghost ? "text-white/70" : "text-slate-500"}`}>خرید، فروش و اجاره در محمودآباد</p>
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
                      ? "bg-white/15 text-white"
                      : "bg-[#e8efe8] text-[#2a5a45]"
                    : ghost
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-white/70 hover:text-[#0b3a4a]"
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
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold transition ${ghost ? "text-white hover:bg-white/10" : "text-[#0b3a4a] hover:bg-white"}`}
            >
              <Phone className={ghost ? "text-[#e8dcc8]" : "text-[#2a5a45]"} size={17} />
              011 4473 5333
            </a>
            <Link
              href="/register"
              className="rounded-full bg-[#c6a15b] px-5 py-2.5 text-sm font-extrabold text-[#041e26] shadow-[0_8px_20px_rgba(198,161,91,0.28)] transition hover:bg-[#e8dcc8]"
            >
              + ثبت آگهی
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`rounded-lg p-2 transition lg:hidden ${ghost ? "text-white hover:bg-white/10" : "text-[#0b3a4a] hover:bg-white"}`}
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
          className="border-t border-[#e8dcc8] bg-[#f3eee4] px-4 py-4 text-[#142428] shadow-lg lg:hidden"
        >
          <nav className="space-y-1" aria-label="منوی موبایل">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-3 py-3 font-bold ${
                  isActive(item.href) ? "bg-[#e8efe8] text-[#2a5a45]" : "text-slate-700 hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={SITE.telephoneHref}
            dir="ltr"
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-3 font-bold text-[#2a5a45]"
          >
            <Phone size={18} />
            011 4473 5333
          </a>
          <Link
            href="/search"
            className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 font-bold text-slate-700 hover:bg-white"
          >
            <Search size={18} />
            جستجوی پیشرفته
          </Link>
          <Link
            href="/register"
            className="mt-2 block rounded-full bg-[#c6a15b] px-4 py-3 text-center font-extrabold text-[#041e26]"
          >
            ثبت آگهی
          </Link>
        </div>
      )}
    </header>
  );
}
