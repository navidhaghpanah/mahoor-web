export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import PhoneText from "@/components/PhoneText";
import { CONTACTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "مشاوران و کارشناسان",
  description:
    "تیم کارشناسان املاک ماهور در محمودآباد: حیدری، مهندس آزاد و راعی. مشاوره خرید، فروش، اجاره و پیمانکاری.",
  alternates: { canonical: "/agents" },
  openGraph: {
    title: "کارشناسان املاک ماهور محمودآباد",
    description: "ارتباط مستقیم با مشاوران فروش، اجاره و پیمانکاری ماهور.",
    url: "/agents",
    locale: "fa_IR",
  },
};

export default function AgentsPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-[36px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
          مشاوران دفتر
        </h1>
        <ul className="mt-12 divide-y divide-[var(--navy)]/10 border-y border-[var(--navy)]/10">
          {CONTACTS.map((person) => (
            <li key={person.href}>
              <a href={person.href} className="flex items-center justify-between gap-4 py-6 text-[15px]">
                <span className="font-bold">{person.name}</span>
                <PhoneText className="font-bold">{person.phoneDisplay}</PhoneText>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] leading-7 text-[var(--navy)]/75">
          {SITE.address}. {SITE.hours}.
        </p>
      </section>
    </div>
  );
}
