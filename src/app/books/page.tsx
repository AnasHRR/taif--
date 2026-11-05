import type { Metadata } from "next";
import { Suspense } from "react";
import { Library } from "lucide-react";
import { books } from "@/data/books";
import { storeConfig } from "@/config/store";
import { getBreadcrumbSchema } from "@/lib/schema";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "جميع الكتب",
  description:
    "تصفح جميع الكتب واكتشف مجموعة متنوعة من الكتب والروايات في مكتبة طيف.",
  alternates: {
    canonical: "/books",
  },
  openGraph: {
    title: "جميع الكتب | مكتبة طيف",
    description:
      "تصفح جميع الكتب واكتشف مجموعة متنوعة من الكتب والروايات في مكتبة طيف.",
    url: `${storeConfig.siteUrl}/books`,
    images: [
      {
        url: "/images/banners/hero.jpeg",
        width: 1600,
        height: 900,
        alt: "جميع الكتب | مكتبة طيف — Phantom Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "جميع الكتب | مكتبة طيف",
    description:
      "تصفح جميع الكتب واكتشف مجموعة متنوعة من الكتب والروايات في مكتبة طيف.",
    images: ["/images/banners/hero.jpeg"],
  },
};

function BrowserFallback() {
  return (
    <div aria-busy="true">
      <div className="h-40 animate-pulse rounded-3xl bg-white shadow-card" />
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="aspect-[3/4] animate-pulse rounded-lg bg-sand" />
        ))}
      </div>
    </div>
  );
}

export default function BooksPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "الرئيسية", url: "/" },
    { name: "جميع الكتب", url: "/books" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PageHero
        title="جميع الكتب"
        description={`رفوفنا بين يديك: ${booksCountLabel(books.length)} مختارة بعناية. ابحث، رشّح حسب التصنيف أو السعر، ورتّب النتائج كما يناسبك.`}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <Library className="size-3.5" aria-hidden="true" />
            الكتالوج الكامل
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "جميع الكتب" }]}
      />
      <div className="shell py-14 sm:py-16">
        <Suspense fallback={<BrowserFallback />}>
          <BooksBrowser />
        </Suspense>
      </div>
    </>
  );
}
