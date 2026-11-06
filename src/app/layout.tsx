import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

import { storeConfig } from "@/config/store";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Non-critical overlays are code-split so the LCP-critical hero paints
 * before their JS is even requested on mobile.
 * NOTE: `ssr: false` is not allowed in Server Components — the split
 * still defers hydration JS without it; SSR markup is preserved.
 */
const ShoppingCart = dynamic(() => import("@/components/ShoppingCart"));
const CartToast = dynamic(() => import("@/components/CartToast"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

/**
 * Arabic fonts via next/font (instead of @fontsource CSS imports):
 * - display: swap prevents invisible text while the font loads (FCP).
 * - adjustFontFallback generates size-adjusted fallback metrics so the
 *   swap does not reflow Arabic headings (CLS).
 * - preload makes the browser fetch the critical Cairo face early (LCP).
 * Weights trimmed to what the design actually uses (400/500/700 body + Cairo Variable).
 */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: "variable",
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  fallback: ["Tajawal", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

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
    siteName: storeConfig.name,
    title: "مكتبة طيف | بين صفحات الكتب تبدأ الحكايات",
    description:
      "وجهتك العربية الفاخرة للكتب — مختارات مدروسة وأسعار مناسبة وطلب سهل عبر واتساب.",
    images: [{ url: "/images/banners/hero.jpeg", width: 1671, height: 941, alt: "مكتبة طيف — مكتبة كونية بين النجوم" }],
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
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const websiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    // suppressHydrationWarning: browser extensions (Grammarly, translators,
    // dark-mode add-ons) inject attributes onto <html>/<body> before React
    // hydrates. Ignoring those attribute diffs is the recommended fix for
    // extension-caused hydration errors; it does not silence real app diffs.
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${cairo.variable} ${tajawal.variable}`}>
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
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
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
