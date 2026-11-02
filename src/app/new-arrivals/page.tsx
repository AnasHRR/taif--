import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { getNewBooks } from "@/data/books";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "الكتب الجديدة",
  description:
    "أحدث الإصدارات التي وصلت إلى رفوف مكتبة طيف هذا الموسم. تصفّح الوافدين الجدد، رشّح حسب التصنيف أو السعر، واطلب كتبك عبر واتساب.",
  openGraph: {
    title: "الكتب الجديدة | مكتبة طيف",
    description: "وصل حديثاً إلى مكتبة طيف — أحدث الإصدارات مختارة بعناية، مع طلب سهل عبر واتساب.",
  },
};

/** صفحة الكتب الجديدة: نفس متصفّح الكتب مع فلتر «وصل حديثاً» مبدئي */
export default function NewArrivalsPage() {
  return (
    <>
      <PageHero
        title="الكتب الجديدة"
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
