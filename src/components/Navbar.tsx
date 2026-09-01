"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
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

  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className={`text-[11px] font-bold tracking-[0.14em] ${
        isActive(href)
          ? ghost
            ? "text-white"
            : "text-[var(--navy)]"
          : ghost
            ? "text-white/70 hover:text-white"
            : "text-[var(--navy)]/55 hover:text-[var(--navy)]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        ghost ? "bg-transparent text-white" : "bg-[var(--sand)]/95 text-[var(--navy)] backdrop-blur-md"
      }`}
    >
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 lg:px-8">
        <nav aria-label="منوی اصلی" className="hidden items-center gap-6 lg:flex">
          {PUBLIC_NAV.slice(0, 3).map((item) => link(item.href, item.label))}
        </nav>

        <Link href="/" className="justify-self-center text-center">
          <p className={`text-[17px] font-black tracking-[0.18em] ${ghost ? "text-white" : "text-[var(--navy)]"}`}>
            املاک ماهور
          </p>
          <p className={`mt-0.5 text-[10px] font-bold tracking-[0.22em] ${ghost ? "text-[var(--gold)]" : "text-[var(--sea)]"}`}>
            <NasimMark />
          </p>
        </Link>

        <div className="flex items-center justify-end gap-3">
          <nav className="hidden items-center gap-6 lg:flex">
            {PUBLIC_NAV.slice(3).map((item) => link(item.href, item.label))}
          </nav>
          <a
            href={SITE.telephoneHref}
            className={`hidden items-center gap-2 text-[12px] font-extrabold lg:inline-flex ${ghost ? "text-white" : "text-[var(--navy)]"}`}
          >
            <Phone size={14} className="text-[var(--gold)]" />
            <PhoneText>{SITE.telephoneHeader}</PhoneText>
          </a>
          <Link
            href="/register"
            className={`hidden px-4 py-2 text-[11px] font-extrabold tracking-[0.12em] lg:inline-flex ${
              ghost
                ? "border border-white/80 text-white hover:bg-white hover:text-[var(--navy)]"
                : "bg-[var(--gold)] text-[var(--navy)]"
            }`}
          >
            ثبت آگهی
          </Link>
          <a
            href={SITE.telephoneHref}
            className={`px-2 py-2 text-sm font-extrabold lg:hidden ${ghost ? "text-[var(--gold)]" : "text-[var(--navy)]"}`}
          >
            تماس
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`p-2 lg:hidden ${ghost ? "text-white" : "text-[var(--navy)]"}`}
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-[var(--navy)]/10 bg-[var(--sand)] px-5 py-5 text-[var(--navy)] lg:hidden">
          <nav className="space-y-1" aria-label="منوی موبایل">
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="block py-3 text-sm font-bold tracking-[0.08em]">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={SITE.telephoneHref} className="mt-4 flex items-center gap-2 py-3 text-sm font-extrabold">
            <Phone size={16} />
            <PhoneText>{SITE.telephoneHeader}</PhoneText>
          </a>
          <Link href="/register" className="mt-2 block border border-[var(--navy)] px-4 py-3 text-center text-sm font-extrabold">
            ثبت آگهی
          </Link>
        </div>
      )}
    </header>
  );
}
