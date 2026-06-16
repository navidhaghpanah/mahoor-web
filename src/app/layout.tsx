import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const vazir = Vazirmatn({ 
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "املاک ماهور | خرید، فروش و رهن اجاره ملک",
  description: "پلتفرم جامع جستجو و مدیریت املاک ماهور",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "املاک ماهور",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      <body className={`${vazir.variable} font-[family-name:var(--font-vazir)] antialiased bg-gray-50`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}