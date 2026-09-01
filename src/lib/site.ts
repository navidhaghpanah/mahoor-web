export const SITE_URL = "https://mahoor-web.vercel.app";

/** NAP copied from the original live site (mahoor-Multi site-index). Do not invent. */
export const SITE = {
  name: "املاک ماهور",
  legalName: "املاک ماهور محمودآباد",
  englishName: "MAHOOR REAL ESTATE",
  motto: "مشاورین املاک و سرمایه گذاری",
  heroLine: "خانه رویاییت را پیدا کن",
  tagline: "انجام کلیه خدمات ملکی - محمودآباد",
  description:
    "انجام کلیه خدمات ملکی شامل خرید، فروش، اجاره، رهن، تفکیک سند، طراحی، نظارت، اجرا و پیمانکاری. با بیش از ۱۵ سال تجربه در محمودآباد.",
  locale: "fa_IR",
  telephoneDisplay: "۰۱۱ ۴۴۷۳ ۵۳۳۳",
  telephoneIntl: "+98-11-4473-5333",
  telephoneHref: "tel:01144735333",
  telephoneHeader: "011 4473 5333",
  address: "محمودآباد، خیابان امام، بعد از نسیم ۶۹/۱",
  addressExtra: "روبروی بروی پارکینگ قزوینی‌پور",
  locality: "محمودآباد",
  region: "مازندران",
  hours: "همه روزه ۸ صبح تا ۸ شب",
  hoursOpens: "08:00",
  hoursCloses: "20:00",
  geo: { lat: 36.6333, lng: 52.2607 },
  mapsUrl: "https://maps.app.goo.gl/Dv4UxLHXSBrPe1xbA",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.0!2d52.2607!3d36.6333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8eb760f2e84c87%3A0x0!2z2YXYrdmF2YjYr9in2KjYp9ivINmF2KfYmdmI2LMg2LnYsiDZhdix2YPYsiDZhdi52YPZhdin2KvYp9ioINmF2K_YrdmF2YjYr9in2KjYp9iv!5e0!3m2!1sfa!2sir!4v1700000000000!5m2!1sfa!2sir",
  instagram: "https://www.instagram.com/amlake_mahour/",
  telegram: "https://t.me/mahoorrlste",
  whatsapp: "https://wa.me/989111134767",
  otherSocial: "@mahoorrlste",
  logoPath: "/images/mahoor-logo.jpg",
  ogImagePath: "/images/mahoor-logo.jpg",
  keywords: [
    "املاک ماهور",
    "املاک ماهور محمودآباد",
    "خرید ملک محمودآباد",
    "فروش ویلا محمودآباد",
    "اجاره آپارتمان محمودآباد",
    "رهن اجاره محمودآباد",
    "مشاور املاک محمودآباد",
    "آژانس املاک محمودآباد",
  ],
} as const;

/** People and numbers already published on the original site. Do not invent. */
export const CONTACTS = [
  { name: "دفتر ماهور", role: "دفتر مرکزی", phoneDisplay: "۰۱۱ ۴۴۷۳ ۵۳۳۳", href: "tel:01144735333" },
  { name: "مهندس آزاد", role: "مهندس عمران و کارشناس ملکی", phoneDisplay: "۰۹۱۱ ۳۲۷ ۶۶۴۷", href: "tel:09113276647" },
  { name: "حیدری", role: "کارشناس فروش ملکی", phoneDisplay: "۰۹۱۲ ۰۹۹ ۶۴۲۶", href: "tel:09120996426" },
  { name: "راعی", role: "کارشناس اجاره و رهن", phoneDisplay: "۰۹۱۲ ۰۹۹ ۷۴۵۳", href: "tel:09120997453" },
  { name: "موسی مشکیاب", role: "مسئول ویلا و اجاره شبانه", phoneDisplay: "۰۹۳۷ ۳۶۸ ۷۶۰۰", href: "tel:09373687600" },
] as const;

export const SERVICES = [
  { title: "خرید و فروش", body: "ملک دلخواهت را بخر" },
  { title: "اجاره و رهن", body: "بهترین قیمت اجاره" },
  { title: "اجاره شبانه", body: "ویلا و اقامتگاه روزانه" },
  { title: "تفکیک سند", body: "خدمات ثبتی و حقوقی" },
  { title: "طراحی و نظارت", body: "معماری و اجرا" },
  { title: "پیمانکاری", body: "ساخت و ساز" },
] as const;

/** Public chrome: max three links. */
export const PUBLIC_NAV = [
  { href: "/properties", label: "فایل‌ها" },
  { href: "/about", label: "دفتر" },
  { href: "/contact", label: "تماس" },
] as const;
