import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Languages as LanguagesIcon,
  MessageCircle,
  Tag,
} from "lucide-react";
import { books, getBookBySlug, getRelatedBooks } from "@/data/books";
import { getCategoryBySlug } from "@/data/categories";
import { storeConfig } from "@/config/store";
import { cx, discountPercent, formatPrice } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import BookGrid from "@/components/BookGrid";
import BookActions from "@/components/BookActions";
import RatingStars from "@/components/RatingStars";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "الكتاب غير موجود" };
  const category = getCategoryBySlug(book.category);

  return {
    title: `${book.title} — ${book.author}`,
    description: book.description,
    openGraph: {
      title: `${book.title} — ${book.author} | مكتبة طيف`,
      description: book.description,
      images: [{ url: "/images/banners/hero.jpeg", width: 1600, height: 900 }],
    },
    keywords: [book.title, book.author, category?.name ?? "", "مكتبة طيف", "شراء كتب"],
  };
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const category = getCategoryBySlug(book.category);
  const discount = discountPercent(book.price, book.oldPrice);
  const related = getRelatedBooks(book);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    inLanguage: "ar",
    numberOfPages: book.pages,
    datePublished: String(book.year),
    publisher: { "@type": "Organization", name: book.publisher },
    offers: {
      "@type": "Offer",
      price: book.price,
      priceCurrency: storeConfig.currency.code,
      availability: book.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const metaRows = [
    { icon: BookOpen, label: "عدد الصفحات", value: `${book.pages} صفحة` },
    { icon: Building2, label: "دار النشر", value: book.publisher },
    { icon: CalendarDays, label: "سنة النشر", value: String(book.year) },
    { icon: LanguagesIcon, label: "اللغة", value: book.language },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* مسار التنقل */}
      <div className="border-b border-primary/8 bg-white/60">
        <nav aria-label="مسار التنقل" className="shell py-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
            <li>
              <Link href="/" className="transition-colors hover:text-secondary">
                الرئيسية
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronLeft className="size-3 text-gold-deep" aria-hidden="true" />
              <Link href="/books" className="transition-colors hover:text-secondary">
                جميع الكتب
              </Link>
            </li>
            {category ? (
              <li className="flex items-center gap-1.5">
                <ChevronLeft className="size-3 text-gold-deep" aria-hidden="true" />
                <Link href={`/categories/${category.slug}`} className="transition-colors hover:text-secondary">
                  {category.name}
                </Link>
              </li>
            ) : null}
            <li className="flex items-center gap-1.5">
              <ChevronLeft className="size-3 text-gold-deep" aria-hidden="true" />
              <span aria-current="page" className="font-bold text-primary">
                {book.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <article className="shell py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[24rem_1fr] lg:gap-16">
          {/* الغلاف */}
          <Reveal className="mx-auto w-full max-w-xs lg:sticky lg:top-28 lg:max-w-none lg:self-start">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/25 via-transparent to-secondary/20 blur-2xl"
              />
              <BookCover book={book} size="lg" className="relative shadow-luxe frame-corners" />
              {book.isNew ? (
                <span className="absolute -top-3 right-4 rounded-full bg-gold px-4 py-1.5 font-display text-xs font-black text-primary shadow-gold">
                  وصل حديثاً
                </span>
              ) : null}
            </div>
          </Reveal>

          {/* التفاصيل */}
          <Reveal delay={130}>
            {category ? (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary/8 px-3.5 py-1.5 text-xs font-bold text-secondary transition-colors hover:bg-secondary hover:text-cream"
              >
                <Tag className="size-3.5" aria-hidden="true" />
                {category.name}
              </Link>
            ) : null}

            <h1 className="mt-4 font-display text-3xl font-black leading-snug text-primary sm:text-4xl sm:leading-normal">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-mist">
              بقلم <span className="font-bold text-ink">{book.author}</span>
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              <RatingStars rating={book.rating} starClassName="size-4" />
              <span className="font-display text-sm font-bold text-gold-deep">{book.rating.toFixed(1)}</span>
              <span className="text-xs text-mist">تقييم قرّاء طيف</span>
            </div>

            {/* السعر والتوفر */}
            <div className="mt-7 flex flex-wrap items-center gap-4 rounded-3xl border border-primary/8 bg-white p-5 shadow-card sm:gap-6">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-4xl font-black text-gradient-gold" dir="rtl">
                  {formatPrice(book.price)}
                </span>
                {book.oldPrice ? (
                  <del className="text-sm text-mist/80">{formatPrice(book.oldPrice)}</del>
                ) : null}
              </div>

              {discount ? (
                <span className="rounded-full bg-rose-600/10 px-3 py-1.5 text-xs font-extrabold text-rose-600">
                  وفّر {discount}%
                </span>
              ) : null}

              <span
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
                  book.available ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600",
                )}
              >
                {book.available ? (
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                ) : (
                  <AlertCircle className="size-3.5" aria-hidden="true" />
                )}
                {book.available ? "متوفر في المخزون" : "غير متوفر حالياً"}
              </span>
            </div>

            {/* الوصف */}
            <p className="mt-7 max-w-2xl text-base leading-9 text-ink/85">{book.description}</p>

            {/* بطاقة المواصفات */}
            <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-3">
              {metaRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-primary/8 bg-white px-4 py-3.5 shadow-card"
                >
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold text-mist">
                    <row.icon className="size-3.5 text-gold-deep" aria-hidden="true" />
                    {row.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm font-extrabold text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            {/* الإجراءات */}
            <div className="mt-8 max-w-2xl">
              <BookActions book={book} />
            </div>

            {/* ملاحظة الطلب */}
            <div className="mt-7 flex max-w-2xl items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <p className="text-xs leading-6 text-ink/75">
                <strong className="font-bold text-primary">الطلب يتم حصرياً عبر واتساب.</strong>{" "}
                أضف الكتاب إلى السلة وأتمم طلبك من صفحة السلة، أو اطلبه مباشرة من هنا — تأكيد التوفر
                وتفاصيل التوصيل والدفع تتم في المحادثة.
              </p>
            </div>
          </Reveal>
        </div>

        {/* كتب مشابهة */}
        {related.length > 0 ? (
          <section aria-label="كتب مشابهة" className="mt-24">
            <Reveal>
              <SectionHeading
                align="start"
                eyebrow="من نفس الرف"
                title="قد يعجبك أيضاً"
              />
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <BookGrid books={related} />
            </Reveal>
          </section>
        ) : null}
      </article>
    </>
  );
}
