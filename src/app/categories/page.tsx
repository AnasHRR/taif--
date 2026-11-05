import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/data/categories";
import { getCategoryCounts } from "@/data/books";
import { storeConfig } from "@/config/store";
import { getBreadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import CategoryCard from "@/components/CategoryCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "تصنيفات الكتب",
  description:
    "اكتشف تصنيفات الكتب المختلفة واختر الكتب المناسبة لاهتماماتك.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "تصنيفات الكتب | مكتبة طيف",
    description:
      "اكتشف تصنيفات الكتب المختلفة واختر الكتب المناسبة لاهتماماتك.",
    url: `${storeConfig.siteUrl}/categories`,
    images: [
      {
        url: "/images/banners/hero.jpeg",
        width: 1600,
        height: 900,
        alt: "تصنيفات الكتب | مكتبة طيف — Phantom Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تصنيفات الكتب | مكتبة طيف",
    description:
      "اكتشف تصنيفات الكتب المختلفة واختر الكتب المناسبة لاهتماماتك.",
    images: ["/images/banners/hero.jpeg"],
  },
};

export default function CategoriesPage() {
  const counts = getCategoryCounts();
  const breadcrumbs = getBreadcrumbSchema([
    { name: "الرئيسية", url: "/" },
    { name: "تصنيفات الكتب", url: "/categories" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PageHero
        title="تصنيفات الكتب"
        description="ثمانية أجنحة مرتبة بعناية تحت سقف واحد. اختر التصنيف الأقرب إلى قلبك وابدأ رحلتك بين الرفوف."
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <LayoutGrid className="size-3.5" aria-hidden="true" />
            أجنحة المكتبة
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "التصنيفات" }]}
      />

      <div className="shell py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={(index % 4) * 90}>
              <CategoryCard category={category} count={counts[category.slug] ?? 0} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
