import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { getNewBooks } from "@/data/books";
import { storeConfig } from "@/config/store";
import { getBreadcrumbSchema } from "@/lib/schema";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "أحدث الكتب",
  description: "اكتشف أحدث الكتب والإصدارات الجديدة في مكتبة طيف.",
  alternates: {
    canonical: "/new-arrivals",
  },
  openGraph: {
    title: "أحدث الكتب | مكتبة طيف",
    description: "اكتشف أحدث الكتب والإصدارات الجديدة في مكتبة طيف.",
    url: `${storeConfig.siteUrl}/new-arrivals`,
    images: [
      {
        url: "/images/banners/hero.jpeg",
        width: 1600,
        height: 900,
        alt: "أحدث الكتب | مكتبة طيف — Phantom Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أحدث الكتب | مكتبة طيف",
    description: "اكتشف أحدث الكتب والإصدارات الجديدة في مكتبة طيف.",
    images: ["/images/banners/hero.jpeg"],
  },
};

/** صفحة الكتب الجديدة: نفس متصفّح الكتب مع فلتر «وصل حديثاً» مبدئي */
export default function NewArrivalsPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "الرئيسية", url: "/" },
    { name: "أحدث الكتب", url: "/new-arrivals" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PageHero
        title="أحدث الكتب"
        description={`رفّ الوافدين الجدد: ${booksCountLabel(getNewBooks().length)} مختارة بعناية. ابحث، رشّح حسب التصنيف أو السعر، ورتّب النتائج كما يناسبك.`}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <Sparkles className="size-3.5" aria-hidden="true" />
            وصل حديثاً
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "الكتب الجديدة" }]}
      />
      <div className="shell py-14 sm:py-16">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white shadow-card" />}>
          <BooksBrowser presetFilter="new" />
        </Suspense>
      </div>
    </>
  );
}
