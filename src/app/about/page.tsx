import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

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
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-[36px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
          درباره املاک ماهور
        </h1>
        <p className="mt-6 text-[15px] leading-7 text-[var(--navy)]/75">
          انجام کلیه خدمات ملکی در محمودآباد با بیش از ۱۵ سال تجربه.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[var(--navy)]/75">
          <strong className="text-[var(--navy)]">املاک ماهور</strong> در {SITE.address}. {SITE.addressExtra}.
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[var(--navy)]/75">
          تیم کارشناسان با شناخت بازار محلی، همراه خرید، فروش، رهن و اجاره تا قرارداد.
        </p>
      </section>
      <section className="mx-auto max-w-3xl border-t border-[var(--navy)]/10 px-5 py-16">
        <h2 className="text-[36px] font-black leading-[1.1]">خدمات</h2>
        <ul className="mt-8 divide-y divide-[var(--navy)]/10">
          {services.map((item) => (
            <li key={item.title} className="py-5">
              <p className="font-black">{item.title}</p>
              <p className="mt-1 text-[15px] leading-7 text-[var(--navy)]/65">{item.body}</p>
            </li>
          ))}
        </ul>
        <a href={SITE.telephoneHref} className="mt-10 inline-flex border border-[var(--navy)] px-6 py-3 text-[13px] font-bold">
          تماس با دفتر
        </a>
      </section>
    </div>
  );
}
