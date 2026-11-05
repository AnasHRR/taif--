import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

import { storeConfig } from "@/config/store";
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

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: "مكتبة طيف | بين صفحات الكتب تبدأ الحكايات",
    template: "%s | مكتبة طيف",
  },
  description:
    "مكتبة طيف — وجهتك العربية الفاخرة للكتب: روايات، تنمية بشرية، كتب دينية، تاريخ وحضارة، فلسفة، علوم وكتب أطفال. اطلب كتبك بسهولة عبر واتساب مع توصيل لجميع المدن.",
  keywords: [
    "مكتبة طيف",
    "مكتبة عربية",
    "شراء كتب",
    "كتب عربية",
    "روايات",
    "تنمية بشرية",
    "طلب كتب واتساب",
    "مكتبة المغرب",
  ],
  applicationName: storeConfig.name,
  openGraph: {
    type: "website",
    locale: "ar_MA",
    siteName: storeConfig.name,
    title: "مكتبة طيف | بين صفحات الكتب تبدأ الحكايات",
    description:
      "وجهتك العربية الفاخرة للكتب — مختارات مدروسة وأسعار مناسبة وطلب سهل عبر واتساب.",
    images: [{ url: "/images/banners/hero.jpeg", width: 1671, height: 941, alt: "مكتبة طيف — مكتبة كونية بين النجوم" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/images/logo.jpeg", type: "image/jpeg" }] },
};

export const viewport: Viewport = {
  themeColor: "#24102f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
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
