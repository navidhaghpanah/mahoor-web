"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import PhoneText from "@/components/PhoneText";

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
    <footer className="mt-auto border-t border-[var(--navy)]/10 bg-[var(--sand)] text-[var(--navy)]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-[17px] font-black">املاک ماهور</p>
        <p className="mt-4 max-w-md text-[15px] leading-7 text-[var(--navy)]/75">
          {SITE.address}. {SITE.hours}.
        </p>
        <a href={SITE.telephoneHref} className="mt-3 inline-block text-[15px] font-bold">
          <PhoneText>{SITE.telephoneDisplay}</PhoneText>
        </a>
        <div className="mt-8">
          <Link href="/register" className="text-[13px] font-bold">
            ثبت آگهی
          </Link>
        </div>
      </div>
    </footer>
  );
}
