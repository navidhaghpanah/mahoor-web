import type { Metadata } from "next";
import { NasimMark } from "@/components/PhoneText";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "درباره ما و خدمات ملکی",
  description: SITE.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره املاک ماهور محمودآباد",
    description: SITE.description,
    url: "/about",
    locale: "fa_IR",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="relative min-h-[50vh] overflow-hidden text-white">
        <img
          src="/images/mahoor-brand-still.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--deep)]/70" />
        <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-5 py-20 text-center">
          <img src={SITE.logoPath} alt={SITE.name} className="mb-8 h-24 w-auto object-contain" />
          <h1 className="text-[56px] font-black leading-[1.1] sm:text-[80px]">دفتر</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)]" />
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-[15px] font-normal leading-7 text-[var(--navy)]/80">
          {SITE.description}
        </p>
        <p className="mt-5 text-[15px] font-normal leading-7 text-[var(--navy)]/80">
          <strong className="font-bold text-[var(--navy)]">املاک ماهور</strong> در محمودآباد،
          خیابان امام، بعد از <NasimMark />. {SITE.addressExtra}.
        </p>
        <p className="mt-5 text-[15px] font-normal leading-7 text-[var(--navy)]/80">
          {SITE.motto}. {SITE.hours}.
        </p>
      </section>

      <section id="services" className="mx-auto max-w-3xl border-t border-[var(--navy)]/10 px-5 py-20">
        <h2 className="text-[36px] font-black leading-[1.1] sm:text-[48px]">خدمات</h2>
        <ul className="mt-10">
          {SERVICES.map((item) => (
            <li key={item.title} className="border-t border-[var(--navy)]/10 py-8 first:border-t-0">
              <p className="text-2xl font-black leading-[1.1] sm:text-3xl">{item.title}</p>
              <p className="mt-3 text-[15px] font-normal leading-7 text-[var(--navy)]/70">{item.body}</p>
            </li>
          ))}
        </ul>
        <a
          href={SITE.telephoneHref}
          className="mt-10 inline-flex bg-[var(--navy)] px-8 py-3.5 text-[13px] font-bold text-[var(--sand)]"
        >
          تماس با دفتر
        </a>
      </section>
    </div>
  );
}
