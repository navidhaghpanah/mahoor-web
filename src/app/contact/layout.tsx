import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "تماس با دفتر املاک ماهور در محمودآباد، خیابان امام، بعد از نسیم ۶۹/۱. تلفن ۰۱۱ ۴۴۷۳ ۵۳۳۳ — همه روزه ۸ صبح تا ۸ شب.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تماس با املاک ماهور محمودآباد",
    description:
      "آدرس دفتر، تلفن کارشناسان و فرم پیام املاک ماهور در محمودآباد.",
    url: "/contact",
    locale: "fa_IR",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
