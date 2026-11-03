import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/cairo";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "./globals.css";

import { storeConfig } from "@/config/store";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import CartToast from "@/components/CartToast";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    images: [{ url: "/images/banners/hero.webp", width: 1600, height: 900, alt: "مكتبة طيف — مكتبة كونية بين النجوم" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/images/logo.jpeg", type: "image/jpeg" }] },
};

export const viewport: Viewport = {
  themeColor: "#24102f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
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
