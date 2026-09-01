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

  return (
    <header
      className={`sticky top-0 z-50 ${
        ghost ? "bg-transparent text-white" : "bg-[var(--deep)] text-white"
      }`}
    >
      <div
        dir="ltr"
        className="relative z-50 mx-auto flex h-16 items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8"
      >
        <Link href="/" className="block shrink-0" aria-label={SITE.name}>
          <img
            src={SITE.logoPath}
            alt={SITE.name}
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={SITE.telephoneHref}
            className="text-[13px] font-normal text-white/80 hover:text-white"
          >
            <PhoneText>{SITE.telephoneHeader}</PhoneText>
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2 text-white"
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="site-menu"
          className="fixed inset-0 z-40 bg-[var(--deep)] text-white"
        >
          <nav
            aria-label="منوی اصلی"
            className="flex h-full flex-col justify-center px-8 pb-12 pt-24 md:px-16"
          >
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-3xl font-normal leading-[1.1] text-white hover:text-[var(--gold)] md:text-4xl"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 text-3xl font-normal leading-[1.1] text-white hover:text-[var(--gold)] md:text-4xl"
            >
              ثبت آگهی
            </Link>
            <a
              href={SITE.telephoneHref}
              className="mt-10 text-xl font-bold text-white/80 hover:text-[var(--gold)] md:text-2xl"
            >
              <PhoneText>{SITE.telephoneHeader}</PhoneText>
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xl font-bold text-white/80 hover:text-[var(--gold)] md:text-2xl"
            >
              واتساپ
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
