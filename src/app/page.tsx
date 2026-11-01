import Link from "next/link";
import { ArrowLeft, BadgePercent, Sparkles } from "lucide-react";
import { getCategoryCounts, getFeaturedBooks, getNewBooks, getOfferBooks } from "@/data/books";
import { categories } from "@/data/categories";
import Hero from "@/components/Hero";
import QuoteMarquee from "@/components/QuoteMarquee";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import BookGrid from "@/components/BookGrid";
import BookCard from "@/components/BookCard";
import ScrollRow from "@/components/ScrollRow";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";

export default function HomePage() {
  const counts = getCategoryCounts();
  const featured = getFeaturedBooks();
  const newArrivals = getNewBooks();
  const offers = getOfferBooks();

  return (
    <>
      <Hero />
      <QuoteMarquee />

      {/* ─── التصنيفات ─────────────────────────────────────────── */}
      <section id="categories" className="scroll-mt-24 py-20 sm:py-24" aria-label="تصنيفات الكتب">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="أجنحة المكتبة"
              title="تصفّح حسب شغفك"
              description="ثمانية أجنحة تحت سقف واحد — لكل قارئ ركنه المفضل في مكتبة طيف."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 4) * 90}>
                <CategoryCard category={category} count={counts[category.slug] ?? 0} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── كتب مختارة ────────────────────────────────────────── */}
      <section className="bg-sand/60 py-20 sm:py-24" aria-label="كتب مختارة">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="اختيارات المكتبة"
              title="كتب مختارة بعناية لك"
              description="ثمانية إصدارات وضعناها في واجهة المكتبة لأنها تستحق أن تكون أول ما تقع عليه عيناك."
            />
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <BookGrid books={featured} />
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-14 text-center">
              <Link
                href="/books"
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-primary/20 bg-white px-8 py-3.5 text-sm font-extrabold text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-primary hover:text-cream"
              >
                تصفح جميع الكتب
                <ArrowLeft className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── وصل حديثاً ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24" aria-label="وصل حديثاً">
        <div className="shell">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="رف الوافدين الجدد"
              title="وصل حديثاً إلى طيف"
              description="أحدث الإصدارات التي انضمت إلى رفوفنا هذا الموسم."
            />
          </Reveal>
          <Reveal delay={140} className="mt-10">
            <ScrollRow label="الكتب التي وصلت حديثاً">
              {newArrivals.map((book) => (
                <div key={book.id} className="w-44 shrink-0 snap-start sm:w-56">
                  <BookCard book={book} />
                </div>
              ))}
            </ScrollRow>
          </Reveal>
        </div>
      </section>

      {/* ─── العروض الخاصة ─────────────────────────────────────── */}
      <section className="stars-pattern relative overflow-hidden bg-primary-deep py-20 sm:py-24" aria-label="العروض الخاصة">
        <Stars count={24} />
        <div aria-hidden="true" className="absolute -left-24 top-0 size-96 rounded-full bg-secondary/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-24 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="shell relative">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-display text-xs font-black text-primary shadow-gold">
                <BadgePercent className="size-4" aria-hidden="true" />
                تخفيضات حتى 25%
              </span>
              <SectionHeading
                tone="dark"
                title="عروض تليق بعشّاق الكتب"
                description="أسعار مخفّضة على مجموعة من أجمل الإصدارات — اقتنِ كلاسيكياتك المفضلة قبل نفاد الكمية."
              />
            </div>
          </Reveal>
          <Reveal delay={140} className="mt-14">
            <BookGrid books={offers} theme="dark" />
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-14 text-center">
              <Link
                href="/books?filter=offers"
                className="group inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-gold/10 px-8 py-3.5 text-sm font-extrabold text-gold-light backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-primary hover:shadow-gold"
              >
                <Sparkles className="size-4.5" aria-hidden="true" />
                شاهد كل العروض
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <CTABanner />
    </>
  );
}
