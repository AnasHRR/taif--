import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgePercent } from "lucide-react";
import { getOfferBooks } from "@/data/books";
import { booksCountLabel } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import BooksBrowser from "@/components/BooksBrowser";

export const metadata: Metadata = {
  title: "العروض",
  description:
    "عروض وتخفيضات مكتبة طيف: كتب أصليات بأسعار مخفّضة لفترة محدودة. تصفّح العروض، رشّح حسب التصنيف أو السعر، واطلب عبر واتساب.",
  openGraph: {
    title: "العروض | مكتبة طيف",
    description: "عروض تليق بعشّاق الكتب — تخفيضات على مختارات من أجمل الإصدارات، والطلب عبر واتساب.",
  },
};

/** صفحة العروض: نفس متصفّح الكتب مع فلتر «العروض والتخفيضات» مبدئي */
export default function SpecialOffersPage() {
  return (
    <>
      <PageHero
        title="العروض"
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
