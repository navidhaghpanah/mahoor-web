"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MapPin, Navigation, Phone, Search } from "lucide-react";
import { CONTACTS, SITE } from "@/lib/site";
import PhoneText, { NasimMark } from "@/components/PhoneText";

const chips = [
  { label: "ویلا", href: "/search?keyword=ویلا" },
  { label: "آپارتمان", href: "/search?keyword=آپارتمان" },
  { label: "زمین", href: "/search?keyword=زمین" },
] as const;

export default function HomePage() {
  const router = useRouter();
  const [deal, setDeal] = useState("");
  const [kind, setKind] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (deal) params.set("type", deal);
    if (kind) params.set("keyword", kind);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="relative isolate -mt-[76px] bg-[var(--deep)] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--gold)]">
            <NasimMark />
            <span className="mx-2 text-white/30">·</span>
            محمودآباد
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.15] tracking-[-0.03em] sm:text-6xl">
            دنبال ملک توی محمودآباد می‌گردی؟
            <span className="mt-3 block text-white">ماهور کنارته.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
            خرید، فروش، رهن و اجاره با دفتر محلی ماهور در خیابان امام.
          </p>
        </div>
      </section>

      <div className="horizon-gold h-[6px] w-full bg-[var(--gold)]" />

      <div className="relative z-10 mx-auto -mt-9 max-w-5xl px-5 sm:px-8">
        <form
          onSubmit={handleSearch}
          className="grid gap-0 overflow-hidden rounded-none border-y-[6px] border-[var(--gold)] bg-[var(--sand)] sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="border-b border-[var(--navy)]/10 px-5 py-4 sm:border-b-0 sm:border-l">
            <span className="block text-[11px] text-[var(--navy)]/50">نوع معامله</span>
            <select
              value={deal}
              onChange={(event) => setDeal(event.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-extrabold text-[var(--navy)] outline-none"
            >
              <option value="">همه</option>
              <option value="SALE">خرید</option>
              <option value="RENT">اجاره</option>
            </select>
          </label>
          <label className="border-b border-[var(--navy)]/10 px-5 py-4 sm:border-b-0 sm:border-l">
            <span className="block text-[11px] text-[var(--navy)]/50">نوع ملک</span>
            <select
              value={kind}
              onChange={(event) => setKind(event.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-extrabold text-[var(--navy)] outline-none"
            >
              <option value="">همه</option>
              <option value="ویلا">ویلا</option>
              <option value="آپارتمان">آپارتمان</option>
              <option value="زمین">زمین</option>
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex min-h-[64px] items-center justify-center gap-2 bg-[var(--navy)] px-8 text-sm font-extrabold text-[var(--sand)] transition hover:bg-[var(--deep)]"
          >
            <Search size={18} />
            جستجو
          </button>
        </form>
      </div>

      <section className="-mt-[6px] bg-[var(--sea)] px-5 pb-8 pt-14 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {chips.map((chip) => (
            <Link key={chip.href} href={chip.href} className="rounded-full bg-[var(--foam)] px-5 py-2 text-sm font-extrabold text-[var(--navy)]">
              {chip.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[var(--sea)]">فایل‌های تاییدشده</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">هنوز آگهی فعالی روی سایت نیست</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--navy)]/70">
          فایل ساختگی نشان نمی‌دهیم. برای بازدید و مشاوره با دفتر ماهور تماس بگیرید.
        </p>
        <article className="mt-8 max-w-xl border border-[var(--navy)]/10 bg-[var(--sand)] ps-[6px] [border-inline-start:6px_solid_var(--sea)] p-6">
          <p className="text-sm font-bold text-[var(--navy)]">محمودآباد، مازندران</p>
          <p className="mt-2 text-sm text-[var(--navy)]/60">منتظر فایل با عکس اختصاصی</p>
          <Link href="/register" className="mt-4 inline-block text-sm font-extrabold text-[var(--navy)]">
            ثبت آگهی
          </Link>
        </article>
      </section>

      <section className="bg-[var(--navy)] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-[var(--gold)]">
              <NasimMark />
            </p>
            <h2 className="mt-3 text-3xl font-black">دفتر ماهور، خیابان امام</h2>
            <p className="mt-4 max-w-xl leading-8 text-white/75">
              {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
            </p>
            <ul className="mt-8 space-y-2">
              {CONTACTS.map((person) => (
                <li key={person.href}>
                  <a
                    href={person.href}
                    className="flex items-center justify-between gap-3 border-t border-white/10 py-3 text-sm"
                  >
                    <span className="font-bold">{person.name}</span>
                    <span className="inline-flex items-center gap-2 text-[var(--gold)]">
                      <Phone size={14} />
                      <PhoneText>{person.phoneDisplay}</PhoneText>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold"
              >
                واتساپ
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold"
              >
                <Navigation size={16} />
                مسیریابی
              </a>
              <span className="rounded-full border border-white/15 px-5 py-2.5 text-xs text-white/70">
                روبیکا، بله و ایتا: {SITE.otherSocial}
              </span>
            </div>
          </div>
          <div className="overflow-hidden border border-white/15 bg-black/20">
            <iframe
              src={SITE.mapEmbed}
              width="100%"
              height="320"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت دفتر املاک ماهور"
            />
            <p className="flex items-center gap-2 px-5 py-3 text-sm text-white/80">
              <MapPin size={16} className="text-[var(--gold)]" />
              {SITE.address}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
