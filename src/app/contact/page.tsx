"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import PhoneText, { NasimMark } from "@/components/PhoneText";
import { CONTACTS, SITE } from "@/lib/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit() {
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  }

  return (
    <div className="bg-[var(--sand)] text-[var(--navy)]">
      <section className="bg-[var(--deep)] px-5 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[48px] font-black leading-[1.1] sm:text-[72px]">تماس</h1>
          <p className="mt-6 text-[15px] font-normal leading-7 text-white/75">
            محمودآباد، خیابان امام، بعد از <NasimMark />. {SITE.addressExtra}. {SITE.hours}.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="min-h-[42vh] lg:min-h-[70vh]">
          <iframe
            src={SITE.mapEmbed}
            width="100%"
            height="100%"
            className="h-full min-h-[42vh] w-full border-0 lg:min-h-[70vh]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقعیت دفتر املاک ماهور"
          />
        </div>
        <div className="px-5 py-12 sm:px-10">
          <p className="text-[13px] font-bold text-[var(--navy)]">
            <NasimMark />
          </p>
          <ul className="mt-6 divide-y divide-[var(--navy)]/10">
            {CONTACTS.map((person) => (
              <li key={person.href}>
                <a href={person.href} className="flex items-center justify-between gap-3 py-4 text-[15px]">
                  <span className="font-bold">{person.name}</span>
                  <PhoneText className="font-bold">{person.phoneDisplay}</PhoneText>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[13px] font-bold hover:text-[var(--gold)]"
          >
            واتساپ
          </a>
          <div className="mt-12 border-t border-[var(--navy)]/10 pt-10">
            {status === "success" ? (
              <p className="text-[15px] font-normal leading-7">پیام ثبت شد. از دفتر تماس می‌گیرند.</p>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  required
                  className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none"
                  placeholder="نام"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none"
                  placeholder="شماره تماس"
                  dir="ltr"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none"
                  placeholder="متن پیام"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[var(--navy)] px-8 py-3.5 text-[13px] font-bold text-[var(--sand)] disabled:opacity-50"
                >
                  {status === "loading" ? <Loader2 className="inline animate-spin" size={16} /> : "ارسال"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
