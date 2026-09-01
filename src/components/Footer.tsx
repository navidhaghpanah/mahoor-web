"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Instagram, MapPin, Phone, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV, SITE } from "@/lib/site";

function isPrivateRoute(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/agent") ||
    pathname.startsWith("/make-admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/agents/properties")
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (isPrivateRoute(pathname)) return null;

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#102847] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-16 overflow-hidden rounded-lg bg-white p-1">
              <Image
                src="/images/mahoor-logo-v1.png"
                alt="لوگوی املاک ماهور"
                width={128}
                height={72}
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-lg font-black">
                املاک <span className="text-[#d4af37]">ماهور</span>
              </span>
              <span className="text-xs text-slate-300">{SITE.tagline}</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            بیش از ۱۵ سال تجربه در خدمات ملکی محمودآباد. مشاوره رایگان، بازدید هماهنگ‌شده و همراهی تا قرارداد.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold tracking-wide text-[#d4af37]">دسترسی سریع</h2>
          <ul className="mt-4 space-y-2">
            {PUBLIC_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate-200 transition hover:text-[#d4af37]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold tracking-wide text-[#d4af37]">دفتر ماهور</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 shrink-0 text-[#d4af37]" />
              <span>
                {SITE.address}
                <span className="mt-1 block text-xs text-slate-400">{SITE.addressExtra}</span>
              </span>
            </li>
            <li>
              <a href={SITE.telephoneHref} className="inline-flex items-center gap-2 hover:text-[#d4af37]">
                <Phone size={16} className="text-[#d4af37]" />
                {SITE.telephoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-[#d4af37]" />
              {SITE.hours}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold tracking-wide text-[#d4af37]">شبکه‌های اجتماعی</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
            >
              <Instagram size={16} />
              اینستاگرام
            </a>
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
            >
              <Send size={16} />
              تلگرام
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-bold text-white"
            >
              واتساپ
            </a>
          </div>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm text-[#d4af37] hover:underline"
          >
            مسیریابی در گوگل مپ
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {SITE.legalName}. همه حقوق محفوظ است.
      </div>
    </footer>
  );
}
