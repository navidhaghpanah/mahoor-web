import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "املاک ماهور | خرید، فروش و رهن اجاره ملک در محمودآباد",
    template: "%s | املاک ماهور",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "real estate",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE_URL,
    siteName: SITE.name,
    title: "املاک ماهور | خرید، فروش و رهن اجاره ملک در محمودآباد",
    description: SITE.description,
    images: [
      {
        url: SITE.ogImagePath,
        width: 1200,
        height: 630,
        alt: "نمای برند املاک ماهور در محمودآباد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "املاک ماهور | خرید، فروش و رهن اجاره ملک در محمودآباد",
    description: SITE.description,
    images: [SITE.ogImagePath],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${vazir.variable} font-[family-name:var(--font-vazir)] antialiased bg-[#f6f8fb] text-[#102847]`}>
        <JsonLd />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
        >
          رفتن به محتوای اصلی
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
