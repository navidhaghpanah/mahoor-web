export const SITE_URL = "https://mahoor-web.vercel.app";

/** NAP and public contact details already published on the contact page. Do not invent. */
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
  address: "محمودآباد، خیابان امام، بعد از نسیم ۶۹/۱",
  addressExtra: "روبروی بروی پارکینگ قزوینی‌پور",
  locality: "محمودآباد",
  region: "مازندران",
  hours: "همه روزه ۸ صبح تا ۸ شب",
  hoursOpens: "08:00",
  hoursCloses: "20:00",
  geo: { lat: 36.6333, lng: 52.2607 },
  mapsUrl: "https://maps.app.goo.gl/Dv4UxLHXSBrPe1xbA",
  instagram: "https://www.instagram.com/amlake_mahour/",
  telegram: "https://t.me/mahoorrlste",
  whatsapp: "https://wa.me/989111134767",
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

export const PUBLIC_NAV = [
  { href: "/properties", label: "خرید و اجاره" },
  { href: "/search", label: "جستجو" },
  { href: "/about", label: "خدمات" },
  { href: "/agents", label: "مشاوران" },
  { href: "/contact", label: "تماس با ما" },
] as const;
