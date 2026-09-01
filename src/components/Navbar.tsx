"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const navItems = [["/properties", "خرید و اجاره"], ["/about", "خدمات"], ["/agents", "مشاوران"], ["/contact", "تماس با ما"]] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#102847] shadow-[0_2px_12px_rgba(16,40,71,0.05)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-lg bg-[#f8fbfb] p-1 transition group-hover:ring-2 group-hover:ring-[#159e9b]/50">
              <Image src="/images/mahoor-logo-v1.png" alt="لوگوی املاک ماهور" width={1280} height={720} priority className="h-full w-full object-contain" />
            </div>
            <div><h1 className="text-xl font-black text-[#102847]">املاک <span className="text-[#129b96]">ماهور</span></h1><p className="-mt-1 text-xs text-slate-500">خرید، فروش و اجاره</p></div>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map(([href, label]) => <Link key={href} href={href} className="text-sm font-bold text-slate-600 transition hover:text-[#129b96]">{label}</Link>)}
          </div>
          <div className="hidden items-center gap-5 lg:flex"><a href="tel:01144735333" dir="ltr" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#102847]"><Phone className="text-[#159e9b]" size={17} />011 4473 5333</a><Link href="/register" className="rounded-xl bg-[#e3ae3b] px-5 py-3 text-sm font-extrabold text-[#102847] transition hover:bg-[#c9972e]">+ ثبت آگهی</Link></div>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="text-[#102847] transition hover:text-[#159e9b] lg:hidden" aria-label="باز کردن منو">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
        {isMenuOpen && <div className="space-y-2 border-t border-slate-100 py-4 lg:hidden">{navItems.map(([href, label]) => <Link key={href} href={href} className="block rounded-lg px-3 py-3 font-bold text-slate-700 hover:bg-[#effafa]" onClick={() => setIsMenuOpen(false)}>{label}</Link>)}<a href="tel:01144735333" dir="ltr" className="block rounded-lg px-3 py-3 font-bold text-[#159e9b]">011 4473 5333</a><Link href="/register" className="mt-2 block rounded-xl bg-[#e3ae3b] px-4 py-3 text-center font-extrabold text-[#102847]" onClick={() => setIsMenuOpen(false)}>ثبت آگهی</Link></div>}
      </div>
    </nav>
  );
}
