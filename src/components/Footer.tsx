"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
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
    <footer className="mt-auto bg-[var(--deep)] text-white">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <img src={SITE.logoPath} alt={SITE.name} className="h-16 w-auto object-contain" />
        <p className="mt-6 max-w-md text-[15px] font-normal leading-7 text-white/70">
          {SITE.description}
        </p>
        <p className="mt-5 max-w-md text-[15px] font-normal leading-7 text-white/70">
          محمودآباد، خیابان امام، بعد از <NasimMark />. {SITE.addressExtra}.
        </p>
        <p className="mt-2 text-[15px] font-normal leading-7 text-white/70">{SITE.hours}</p>
        <a href={SITE.telephoneHref} className="mt-5 inline-block text-[15px] font-bold hover:text-[var(--gold)]">
          <PhoneText>{SITE.telephoneDisplay}</PhoneText>
        </a>
        <div className="mt-10 flex flex-wrap gap-6">
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-white/80 hover:text-[var(--gold)]"
          >
            کانال تلگرام
          </a>
          <Link href="/register" className="text-[13px] font-bold text-white/80 hover:text-[var(--gold)]">
            ثبت آگهی
          </Link>
        </div>
        <p className="mt-10 text-[13px] text-white/45">
          © تمامی حقوق برای املاک ماهور محمودآباد محفوظ است | mahoorrlste.ir
        </p>
      </div>
    </footer>
  );
}
