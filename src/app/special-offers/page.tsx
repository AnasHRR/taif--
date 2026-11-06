import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgePercent } from "lucide-react";
import { getOfferBooks } from "@/data/books";
import { storeConfig } from "@/config/store";
import { getBreadcrumbSchema } from "@/lib/schema";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "عروض الكتب والتخفيضات",
  description:
    "اكتشف عروض وتخفيضات مكتبة طيف على مختارات مميزة من أفضل الكتب والروايات بأسعار خاصة.",
  alternates: {
    canonical: "/special-offers",
  },
  openGraph: {
    title: "عروض الكتب والتخفيضات | مكتبة طيف",
    description:
      "اكتشف عروض وتخفيضات مكتبة طيف على مختارات مميزة من أفضل الكتب والروايات بأسعار خاصة.",
    url: `${storeConfig.siteUrl}/special-offers`,
    images: [
      {
        url: "/images/banners/hero.webp",
        width: 1600,
        height: 900,
        alt: "عروض الكتب والتخفيضات | مكتبة طيف — Phantom Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "عروض الكتب والتخفيضات | مكتبة طيف",
    description:
      "اكتشف عروض وتخفيضات مكتبة طيف على مختارات مميزة من أفضل الكتب والروايات بأسعار خاصة.",
    images: ["/images/banners/hero.webp"],
  },
};

/** صفحة العروض: نفس متصفّح الكتب مع فلتر «العروض والتخفيضات» مبدئي */
export default function SpecialOffersPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "الرئيسية", url: "/" },
    { name: "عروض الكتب والتخفيضات", url: "/special-offers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PageHero
        title="عروض الكتب والتخفيضات"
        description={`${booksCountLabel(getOfferBooks().length)} حالياً بأسعار مخفّضة. ابحث، رشّح حسب التصنيف أو السعر، ورتّب النتائج كما يناسبك.`}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <BadgePercent className="size-3.5" aria-hidden="true" />
            تخفيضات حتى 25%
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "العروض" }]}
      />
      <div className="shell py-14 sm:py-16">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white shadow-card" />}>
          <BooksBrowser presetFilter="offers" />
        </Suspense>
      </div>
    </>
  );
}
