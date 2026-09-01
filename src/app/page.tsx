import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Search, ShieldCheck, Users } from "lucide-react";

const benefits = [
  [ShieldCheck, "انتخاب مطمئن", "آگهی‌ها پیش از نمایش بررسی می‌شوند تا با اطمینان تصمیم بگیرید."],
  [MapPin, "جستجوی دقیق", "ملک مناسب را بر اساس محله، نوع معامله و نیازهای خود پیدا کنید."],
  [Users, "همراهی حرفه‌ای", "برای هر قدم از خرید، فروش یا اجاره، یک مشاور در کنار شماست."],
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[610px] border-b border-slate-200 bg-white">
        <Image src="/images/mahoor-hero-v1.png" alt="ویلای مدرن در میان فضای سبز" fill priority className="object-cover object-left" sizes="100vw" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-l from-white via-white/92 to-white/10 md:w-[70%]" />
        <div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-5 py-16 sm:px-8">
          <div className="ml-auto w-full max-w-2xl text-right">
            <h1 className="text-4xl font-black leading-[1.35] tracking-tight text-[#0c1f37] sm:text-5xl lg:text-6xl">خانه‌ای که به آن تعلق دارید را پیدا کنید</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">ماهور، همراه مطمئن شما برای خرید، فروش و اجاره ملک در بهترین محله‌های ایران است.</p>
            <form action="/search" className="mt-10 grid gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_18px_50px_rgba(15,32,56,0.12)] sm:grid-cols-[1.4fr_1fr_auto]">
              <label className="flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 px-4 text-right"><MapPin className="shrink-0 text-[#b68a31]" size={21} /><span><span className="block text-xs font-bold text-slate-800">موقعیت مکانی</span><span className="mt-1 block text-sm text-slate-500">شهر، محله یا منطقه</span></span></label>
              <label className="flex min-h-14 items-center rounded-xl border border-slate-200 px-4 text-right"><span><span className="block text-xs font-bold text-slate-800">نوع معامله</span><span className="mt-1 block text-sm text-slate-500">خرید، فروش یا اجاره</span></span></label>
              <button type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#bd9139] px-7 text-base font-extrabold text-white transition hover:bg-[#9b7121]"><Search size={19} />جستجو</button>
            </form>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-black text-[#0c1f37]">شروعی مطمئن برای یک انتخاب مهم</h2><p className="mt-3 max-w-xl leading-8 text-slate-600">همه چیز برای رسیدن به ملک بعدی شما، ساده و شفاف طراحی شده است.</p></div><Link href="/properties" className="inline-flex items-center gap-2 self-start font-bold text-[#a77a25] transition hover:text-[#0c1f37] sm:self-auto">مشاهده همه املاک <ArrowLeft size={18} /></Link></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{benefits.map(([Icon, title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d4b16a] hover:shadow-[0_16px_38px_rgba(12,31,55,0.09)]"><Icon className="text-[#bd9139]" size={30} strokeWidth={1.7} /><h3 className="mt-6 text-xl font-extrabold text-[#0c1f37]">{title}</h3><p className="mt-3 leading-8 text-slate-600">{description}</p></article>)}</div>
      </section>
      <section className="border-y border-slate-200 bg-[#0c1f37] px-5 py-16 text-white sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><div className="max-w-2xl"><Building2 className="text-[#d9b45c]" size={32} strokeWidth={1.6} /><h2 className="mt-5 text-3xl font-black">ملک خود را با ماهور ثبت کنید</h2><p className="mt-3 leading-8 text-slate-300">آگهی خود را ثبت کنید تا پس از بررسی، در دسترس خریداران و مستأجران واقعی قرار بگیرد.</p></div><Link href="/register" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d9b45c] px-6 font-extrabold text-[#0c1f37] transition hover:bg-white">ثبت آگهی</Link></div></section>
    </main>
  );
}
