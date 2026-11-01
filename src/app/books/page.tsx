import type { Metadata } from "next";
import { Suspense } from "react";
import { Library } from "lucide-react";
import { books } from "@/data/books";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "جميع الكتب",
  description:
    "تصفح كتالوج مكتبة طيف الكامل: روايات وتنمية بشرية وكتب دينية وتاريخ وفلسفة وعلوم وكتب أطفال ولغات. ابحث ورشّح ورتّب حسب ذوقك، واطلب عبر واتساب.",
  openGraph: {
    title: "جميع الكتب | مكتبة طيف",
    description: "كتالوج مكتبة طيف الكامل — ابحث ورشّح واطلب كتبك عبر واتساب.",
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
  return (
    <>
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
