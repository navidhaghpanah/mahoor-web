export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import PhoneText, { NasimMark } from "@/components/PhoneText";
import { SITE } from "@/lib/site";

const agents = [
  {
    name: "کارشناس حیدری",
    role: "کارشناس فروش",
    phoneDisplay: "۰۹۱۲ ۰۹۹ ۶۴۲۶",
    href: "tel:09120996426",
    specialty: "خرید، فروش و مشاوره ملکی",
  },
  {
    name: "مهندس آزاد",
    role: "مهندس عمران و کارشناس",
    phoneDisplay: "۰۹۱۱ ۳۲۷ ۶۶۴۷",
    href: "tel:09113276647",
    specialty: "پیمانکاری، طراحی و نظارت",
  },
  {
    name: "کارشناس راعی",
    role: "کارشناس اجاره",
    phoneDisplay: "۰۹۱۲ ۰۹۹ ۷۴۵۳",
    href: "tel:09120997453",
    specialty: "اجاره، رهن و مشاوره حقوقی",
  },
];

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
      <section className="bg-[var(--deep)] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--gold)]">
            <NasimMark />
          </p>
          <h1 className="mt-4 text-4xl font-black">مشاوران دفتر</h1>
          <p className="mt-4 max-w-xl text-white/75">حیدری، آزاد، راعی — تماس مستقیم با همان شماره‌های دفتر.</p>
        </div>
      </section>

      <ul className="mx-auto max-w-3xl divide-y divide-[var(--navy)]/10 px-6">
        {agents.map((agent) => (
          <li key={agent.href} className="flex flex-col gap-3 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--sea)]">{agent.role}</p>
              <h2 className="mt-2 text-2xl font-black">{agent.name}</h2>
              <p className="mt-2 text-sm text-[var(--navy)]/65">{agent.specialty}</p>
            </div>
            <a href={agent.href} className="inline-flex items-center gap-2 border border-[var(--navy)] px-5 py-3 text-sm font-extrabold">
              <Phone size={15} />
              <PhoneText>{agent.phoneDisplay}</PhoneText>
            </a>
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-3xl border-t border-[var(--navy)]/10 px-6 py-12">
        <p className="text-sm text-[var(--navy)]/65">دفتر: {SITE.address}. {SITE.hours}.</p>
        <a href={SITE.telephoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold">
          <Phone size={15} />
          <PhoneText>{SITE.telephoneDisplay}</PhoneText>
        </a>
      </div>
    </div>
  );
}
