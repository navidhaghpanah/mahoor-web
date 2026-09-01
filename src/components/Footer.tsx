"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV, SITE } from "@/lib/site";
import PhoneText, { NasimMark } from "@/components/PhoneText";

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
    <footer className="mt-auto border-t border-[var(--navy)]/10 bg-[var(--deep)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xl font-black tracking-[0.18em]">املاک ماهور</p>
          <p className="mt-2 text-[11px] font-bold tracking-[0.22em] text-[var(--gold)]">
            <NasimMark />
          </p>
          <p className="mt-6 max-w-sm text-sm leading-8 text-white/65">
            {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
          </p>
          <a href={SITE.telephoneHref} className="mt-5 inline-flex text-sm font-extrabold">
            <PhoneText>{SITE.telephoneDisplay}</PhoneText>
          </a>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-left">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-bold tracking-[0.12em] text-white/70">
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-bold text-white/55">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">اینستاگرام</a>
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer">تلگرام</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">واتساپ</a>
            <span>{SITE.otherSocial}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] tracking-wide text-white/40">
        © {new Date().getFullYear()} {SITE.legalName}
      </div>
    </footer>
  );
}
