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
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-[36px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
          تماس با دفتر
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-[var(--navy)]/75">
          {SITE.address}. {SITE.addressExtra}. {SITE.hours}.
        </p>
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
          <p className="text-[11px] font-bold text-[var(--sea)]">
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
            className="mt-6 inline-block text-[13px] font-bold"
          >
            واتساپ
          </a>
          <div className="mt-12 border-t border-[var(--navy)]/10 pt-10">
            {status === "success" ? (
              <p className="text-[15px] leading-7">پیام ثبت شد. از دفتر تماس می‌گیرند.</p>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <input name="name" required className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none" placeholder="نام" />
                <input name="phone" type="tel" required className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none" placeholder="شماره تماس" dir="ltr" />
                <textarea name="message" required rows={4} className="w-full border-b border-[var(--navy)]/20 bg-transparent py-3 text-[15px] outline-none" placeholder="متن پیام" />
                <button type="submit" disabled={status === "loading"} className="border border-[var(--navy)] px-6 py-3 text-[13px] font-bold disabled:opacity-50">
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
