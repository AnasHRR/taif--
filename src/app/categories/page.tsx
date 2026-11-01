import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/data/categories";
import { getCategoryCounts } from "@/data/books";
import PageHero from "@/components/PageHero";
import CategoryCard from "@/components/CategoryCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "التصنيفات",
  description:
    "تصنيفات مكتبة طيف الثمانية: الروايات والقصص، التنمية البشرية، الكتب الدينية، التاريخ والحضارة، الفلسفة والفكر، العلوم والمعرفة، كتب الأطفال، واللغات.",
  openGraph: {
    title: "تصنيفات الكتب | مكتبة طيف",
    description: "تصفح أجنحة مكتبة طيف الثمانية واختر ركنك المفضل.",
  },
};

export default function CategoriesPage() {
  const counts = getCategoryCounts();

  return (
    <>
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
