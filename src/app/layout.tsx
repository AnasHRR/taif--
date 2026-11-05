import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/cairo";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "./globals.css";

import { storeConfig } from "@/config/store";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import CartToast from "@/components/CartToast";
import WhatsAppButton from "@/components/WhatsAppButton";

const arabicKeywords = [
  "مكتبة طيف",
  "مكتبة إلكترونية",
  "مكتبة طيف للكتب",
  "كتب وروايات",
  "شراء الكتب عبر الإنترنت",
  "أفضل الكتب",
  "كتب ثقافية",
  "كتب تعليمية",
  "كتب عربية",
  "تصنيفات الكتب",
  "أحدث الكتب",
  "عالم القراءة",
];

const englishKeywords = [
  "Phantom Library",
  "Online Book Library",
  "Books and Novels",
  "Explore Books",
  "Digital Reading",
  "Book Collections",
  "New Books",
  "Book Categories",
];

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.GOOGLE_SITE_VERIFICATION ||
  "ugmCHmAbZBwR91-fOpkiwok0XbsmLEEiBVkTSZjChzQ";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: storeConfig.title,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
  keywords: [...arabicKeywords, ...englishKeywords],
  authors: [{ name: `${storeConfig.name} | ${storeConfig.nameLatin}`, url: storeConfig.siteUrl }],
  creator: `${storeConfig.name} | ${storeConfig.nameLatin}`,
  publisher: `${storeConfig.name} | ${storeConfig.nameLatin}`,
  applicationName: `${storeConfig.name} | ${storeConfig.nameLatin}`,
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    alternateLocale: ["en_US", "ar_SA", "ar_EG"],
    siteName: `${storeConfig.name} | ${storeConfig.nameLatin}`,
    title: `${storeConfig.title} — ${storeConfig.nameLatin}`,
    description: storeConfig.description,
    url: storeConfig.siteUrl,
    images: [
      {
        url: "/images/banners/hero.jpeg",
        width: 1600,
        height: 900,
        alt: `${storeConfig.name} (${storeConfig.nameLatin}) — ${storeConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${storeConfig.title} — ${storeConfig.nameLatin}`,
    description: storeConfig.description,
    images: ["/images/banners/hero.jpeg"],
  },
  icons: {
    icon: [{ url: "/images/logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/images/logo.jpeg" }],
  },
  verification: googleVerification ? { google: googleVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#24102f",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const websiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ShoppingCart />
          <CartToast />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
