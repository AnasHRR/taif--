import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getBooksByCategory, getCategoryCounts } from "@/data/books";
import { storeConfig } from "@/config/store";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getCategoryIcon } from "@/lib/category-icons";
import { booksCountLabel, cx } from "@/lib/utils";
import Stars from "@/components/Stars";
import BookGrid from "@/components/BookGrid";
import Reveal from "@/components/Reveal";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "التصنيف غير موجود" };

  const description = `اكتشف كتب قسم ${category.name} في مكتبة طيف: ${category.description}`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | مكتبة طيف`,
      description,
      url: `${storeConfig.siteUrl}/categories/${category.slug}`,
      images: [
        {
          url: "/images/banners/hero.jpeg",
          width: 1600,
          height: 900,
          alt: `${category.name} | مكتبة طيف — Phantom Library`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | مكتبة طيف`,
      description,
      images: ["/images/banners/hero.jpeg"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryBooks = getBooksByCategory(slug);
  const counts = getCategoryCounts();
  const Icon = getCategoryIcon(slug);

  const breadcrumbs = getBreadcrumbSchema([
    { name: "الرئيسية", url: "/" },
    { name: "تصنيفات الكتب", url: "/categories" },
    { name: category.name, url: `/categories/${category.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* ترويسة التصنيف بألوانه الخاصة */}
      <section
        className="stars-pattern relative overflow-hidden py-16 text-cream sm:py-20"
        style={{ backgroundImage: `linear-gradient(155deg, ${category.palette.from}, ${category.palette.to})` }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-primary/35" />
        <Stars count={20} />
        <div aria-hidden="true" className="absolute -left-20 -top-20 size-72 rounded-full bg-gold/15 blur-3xl" />

        <div className="shell relative text-center">
          <nav aria-label="مسار التنقل" className="mb-6">
            <ol className="flex items-center justify-center gap-1.5 text-xs text-cream/60">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-light">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/explore" className="transition-colors hover:text-gold-light">
                  التصنيفات
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-bold text-gold-light">
                {category.name}
              </li>
            </ol>
          </nav>

          <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-gold/40 bg-white/10 text-gold-light backdrop-blur-sm">
            <Icon className="size-8" aria-hidden="true" />
          </span>

          <h1 className="mt-5 font-display text-3xl font-black sm:text-4xl">{category.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-cream/75 sm:text-base">
            {category.description}
          </p>
          <p className="mt-4 inline-flex rounded-full bg-gold/15 px-4 py-1.5 font-display text-xs font-bold text-gold-light ring-1 ring-gold/30">
            {booksCountLabel(categoryBooks.length)} في هذا الجناح
          </p>
        </div>
      </section>

      {/* كتب التصنيف */}
      <div className="shell py-14 sm:py-16">
        {categoryBooks.length > 0 ? (
          <Reveal>
            <BookGrid books={categoryBooks} />
          </Reveal>
        ) : (
          <p className="py-16 text-center text-mist">لا توجد كتب في هذا التصنيف حالياً.</p>
        )}

        {/* تصنيفات أخرى */}
        <div className="mt-16 border-t border-primary/10 pt-10 text-center">
          <h2 className="font-display text-lg font-extrabold text-primary">استكشف أجنحة أخرى</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {categories
              .filter((cat) => cat.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/explore/${cat.slug}`}
                  className={cx(
                    "rounded-full border border-primary/15 bg-white px-4.5 py-2 text-xs font-bold text-ink/75 shadow-card",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-primary hover:text-cream",
                  )}
                >
                  {cat.name}
                  <span className="ms-1.5 text-[10px] font-semibold text-gold-deep">
                    ({counts[cat.slug] ?? 0})
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
