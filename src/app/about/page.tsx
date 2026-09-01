import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { NasimMark } from "@/components/PhoneText";

export const metadata: Metadata = {
  title: "درباره ما و خدمات ملکی",
  description:
    "املاک ماهور با بیش از ۱۵ سال سابقه در محمودآباد: خرید، فروش، رهن و اجاره، تفکیک سند، طراحی و پیمانکاری.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره املاک ماهور محمودآباد",
    description: "خدمات ملکی، ارزش‌ها و داستان آژانس املاک ماهور در محمودآباد.",
    url: "/about",
    locale: "fa_IR",
  },
};

const services = [
  { title: "خرید و فروش", body: "خرید و فروش انواع ملک مسکونی، تجاری و زمین" },
  { title: "اجاره و رهن", body: "بهترین قیمت اجاره و رهن کامل در محمودآباد" },
  { title: "تفکیک سند", body: "خدمات ثبتی و حقوقی برای تفکیک و انتقال سند" },
  { title: "طراحی و نظارت", body: "خدمات معماری، طراحی و نظارت بر ساخت" },
  { title: "پیمانکاری", body: "ساخت و ساز با بهترین کیفیت و قیمت" },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="bg-[var(--deep)] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--gold)]">
            <NasimMark /> · محمودآباد
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.15] sm:text-5xl">درباره املاک ماهور</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
            انجام کلیه خدمات ملکی در محمودآباد با بیش از ۱۵ سال تجربه.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-6 py-16 sm:px-12">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">داستان</p>
          <h2 className="mt-3 text-3xl font-black">دفتر خیابان امام</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-8 text-[var(--navy)]/75">
            <p>
              <strong className="text-[var(--navy)]">املاک ماهور</strong> با بیش از ۱۵ سال سابقه در خدمات ملکی
              محمودآباد مازندران. {SITE.address}. {SITE.addressExtra}.
            </p>
            <p>
              تیم کارشناسان با شناخت بازار محلی، همراه خرید، فروش، رهن و اجاره تا قرارداد.
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--navy)]/10 px-6 py-16 sm:px-12 lg:border-t-0 lg:border-r">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--sea)]">خدمات</p>
          <ul className="mt-6 divide-y divide-[var(--navy)]/10">
            {services.map((item) => (
              <li key={item.title} className="py-4">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-[var(--navy)]/65">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--navy)]/10 px-6 py-16 text-center">
        <p className="text-lg font-black">برای بازدید یا مشاوره، با دفتر هماهنگ کنید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={SITE.telephoneHref} className="border border-[var(--navy)] px-6 py-3 text-sm font-extrabold">
            تماس با دفتر
          </a>
          <Link href="/agents" className="px-6 py-3 text-sm font-bold text-[var(--sea)]">
            مشاوران
          </Link>
        </div>
      </section>
    </div>
  );
}
