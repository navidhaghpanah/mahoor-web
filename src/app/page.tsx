"use client";

import Link from "next/link";
import { MapPin, Navigation, Phone } from "lucide-react";
import { CONTACTS, SITE } from "@/lib/site";

const tides = [
  { label: "خرید و اجاره", href: "/properties" },
  { label: "جستجو", href: "/search" },
  { label: "ثبت آگهی", href: "/register" },
  { label: "تماس", href: "/contact" },
] as const;

export default function HomePage() {
  return (
    <div className="shore-page bg-[var(--foam)] text-[var(--ink)] pb-14 lg:pb-0">
      <section className="relative isolate min-h-[100svh] -mt-[76px] overflow-hidden bg-[var(--sea-deep)] text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/mahoor-hero-v1.png"
          aria-hidden="true"
        >
          <source src="/videos/mahoor-brand-v1.mp4" type="video/mp4" />
        </video>
        <div className="hero-mist pointer-events-none absolute inset-0" />

        <p className="shore-spine hidden lg:block" aria-hidden="true">
          محمودآباد · دریای خزر · نسیم ۶۹/۱
        </p>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-28 sm:px-8 lg:pb-24">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[var(--sand)] backdrop-blur-md">
            دفتر محلی · خیابان امام
          </p>
          <h1 className="display-font max-w-3xl text-5xl leading-[1.15] sm:text-7xl">
            از نسیم ۶۹/۱
            <br />
            تا خط ساحل.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            خرید، فروش و اجاره در محمودآباد، با شناخت خیابان‌به‌خیابان منطقه.
            ماهور همین‌جاست، کنار دفتر، کنار شما.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={SITE.telephoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--sand)] px-6 py-3 text-sm font-extrabold text-[var(--sea-deep)] transition hover:bg-white"
            >
              <Phone size={16} />
              {SITE.telephoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:border-[var(--sand)]"
            >
              مسیر دفتر
            </Link>
          </div>

          <div className="tide-dock mt-12 flex flex-wrap gap-2">
            {tides.map((tide) => (
              <Link
                key={tide.href}
                href={tide.href}
                className="tide-chip"
              >
                {tide.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="wave-break" />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--pine)]">فایل‌های زنده</p>
            <h2 className="display-font mt-1 text-4xl text-[var(--sea)]">ساحل هنوز خلوت است</h2>
          </div>
          <Link href="/register" className="text-sm font-bold text-[var(--pine)] hover:text-[var(--sea)]">
            اولین آگهی را ثبت کنید ←
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink)]/70">
          هنوز ملک تاییدشده‌ای روی سایت نیست. به‌جای فایل ساختگی، دفتر ماهور و تماس مستقیم را گذاشتیم.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["ویلا و ساحل", "آپارتمان شهری", "زمین و سرمایه‌"].map((slot) => (
            <article
              key={slot}
              className="empty-lot flex min-h-[220px] flex-col justify-between p-6"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-[var(--pine)]">{slot}</p>
              <p className="display-font text-2xl text-[var(--sea)]">منتظر فایل تاییدشده</p>
              <Link href="/register" className="text-sm font-bold text-[var(--coral)]">
                ثبت آگهی
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--sea)] px-5 py-20 text-[var(--foam)] sm:px-8">
        <p className="plate-number" aria-hidden="true">
          ۶۹/۱
        </p>
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-[var(--sand)]">پلاک دفتر</p>
            <h2 className="display-font mt-3 text-4xl sm:text-5xl">نسیم ۶۹/۱، خیابان امام</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
              {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {CONTACTS.map((person) => (
                <li key={person.href}>
                  <a
                    href={person.href}
                    className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-3 transition hover:border-[var(--sand)]"
                  >
                    <span className="font-bold">{person.name}</span>
                    <span className="inline-flex items-center gap-2 font-extrabold text-[var(--sand)]" dir="ltr">
                      <Phone size={14} />
                      {person.phoneDisplay}
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
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold"
              >
                واتساپ
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold"
              >
                <Navigation size={16} />
                مسیریابی
              </a>
              <span className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-xs text-white/70">
                روبیکا، بله و ایتا: {SITE.otherSocial}
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-white/15 bg-black/20 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
            <iframe
              src={SITE.mapEmbed}
              width="100%"
              height="320"
              className="border-0 grayscale-[30%] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت دفتر املاک ماهور"
            />
            <p className="flex items-center gap-2 px-5 py-3 text-sm text-white/80">
              <MapPin size={16} className="text-[var(--sand)]" />
              {SITE.address}
            </p>
          </div>
        </div>
      </section>

      <div className="nap-dock lg:hidden">
        <a href={SITE.telephoneHref}>تماس</a>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          واتساپ
        </a>
        <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
          مسیر
        </a>
      </div>
    </div>
  );
}
