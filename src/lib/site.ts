export const SITE_URL = "https://mahoor-web.vercel.app";

/** NAP copied from the existing public contact page. Do not invent. */
export const SITE = {
  name: "املاک ماهور",
  legalName: "املاک ماهور محمودآباد",
  tagline: "خرید، فروش، رهن و اجاره ملک در محمودآباد",
  description:
    "پلتفرم جامع جستجو و مدیریت املاک ماهور در محمودآباد مازندران. خرید، فروش، رهن و اجاره با شناخت دقیق منطقه و همراهی مشاوران محلی.",
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
  logoPath: "/images/mahoor-logo-v1.png",
  ogImagePath: "/images/mahoor-hero-v1.png",
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

/** People and numbers already published on /contact. Do not invent. */
export const CONTACTS = [
  { name: "دفتر ماهور", phoneDisplay: "۰۱۱ ۴۴۷۳ ۵۳۳۳", href: "tel:01144735333" },
  { name: "کارشناس حیدری", phoneDisplay: "۰۹۱۲ ۰۹۹ ۶۴۲۶", href: "tel:09120996426" },
  { name: "مهندس آزاد", phoneDisplay: "۰۹۱۱ ۳۲۷ ۶۶۴۷", href: "tel:09113276647" },
  { name: "کارشناس راعی", phoneDisplay: "۰۹۱۲ ۰۹۹ ۷۴۵۳", href: "tel:09120997453" },
] as const;

/** Public chrome: max three links. */
export const PUBLIC_NAV = [
  { href: "/properties", label: "فایل‌ها" },
  { href: "/about", label: "دفتر" },
  { href: "/contact", label: "تماس" },
] as const;
