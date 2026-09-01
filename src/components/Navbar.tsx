"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PUBLIC_NAV, SITE } from "@/lib/site";
import PhoneText from "@/components/PhoneText";

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
      className={`sticky top-0 z-50 ${
        ghost
          ? "bg-transparent text-white"
          : "border-b border-[var(--navy)]/10 bg-[var(--sand)] text-[var(--navy)]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="text-[17px] font-black leading-none">
          املاک ماهور
        </Link>

        <nav aria-label="منوی اصلی" className="hidden items-center gap-8 lg:flex">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-bold ${
                isActive(item.href)
                  ? ghost
                    ? "text-white"
                    : "text-[var(--navy)]"
                  : ghost
                    ? "text-white/70 hover:text-white"
                    : "text-[var(--navy)]/55 hover:text-[var(--navy)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.telephoneHref}
            className={`text-[13px] font-bold ${ghost ? "text-white" : "text-[var(--navy)]"}`}
          >
            <PhoneText>{SITE.telephoneHeader}</PhoneText>
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2 lg:hidden"
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
              <Link key={item.href} href={item.href} className="block py-3 text-[13px] font-bold">
                {item.label}
              </Link>
            ))}
            <Link href="/register" className="block py-3 text-[13px] font-bold">
              ثبت آگهی
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
