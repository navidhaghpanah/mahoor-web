"use client";

import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [["/", "خانه"], ["/properties", "املاک"], ["/agents", "مشاوران"], ["/about", "درباره ما"]] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1f37] text-white shadow-[0_4px_20px_rgba(12,31,55,0.16)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9b45c]/60 transition group-hover:border-[#d9b45c]"><Building2 className="text-[#d9b45c]" size={23} /></div>
            <div><h1 className="text-xl font-extrabold text-white">ماهور</h1><p className="-mt-1 text-xs text-slate-300">املاک و سرمایه‌گذاری</p></div>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(([href, label]) => <Link key={href} href={href} className="font-bold text-slate-300 transition hover:text-[#d9b45c]">{label}</Link>)}
            <Link href="/register" className="rounded-xl bg-[#d9b45c] px-5 py-2.5 font-extrabold text-[#0c1f37] transition hover:bg-white">ثبت آگهی</Link>
          </div>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="text-white transition hover:text-[#d9b45c] md:hidden" aria-label="باز کردن منو">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
        {isMenuOpen && <div className="space-y-2 border-t border-white/10 py-4 md:hidden">{navItems.map(([href, label]) => <Link key={href} href={href} className="block rounded-lg px-3 py-3 font-bold text-slate-200 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>{label}</Link>)}<Link href="/register" className="mt-2 block rounded-xl bg-[#d9b45c] px-4 py-3 text-center font-extrabold text-[#0c1f37]" onClick={() => setIsMenuOpen(false)}>ثبت آگهی</Link></div>}
      </div>
    </nav>
  );
}
