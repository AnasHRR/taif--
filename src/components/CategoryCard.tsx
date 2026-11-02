import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Category } from "@/data/categories";
import { getCategoryIcon } from "@/lib/category-icons";
import { booksCountLabel } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  count: number;
  index?: number;
}

/** بطاقة تصنيف فاخرة بتدرّج مستوحى من لوحة التصنيف */
export default function CategoryCard({ category, count, index = 0 }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug);

  return (
    <Link
      href={`/explore/${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl p-6 shadow-card outline-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe frame-corners"
      style={{ backgroundImage: `linear-gradient(150deg, ${category.palette.from}, ${category.palette.to})` }}
      aria-label={`تصنيف ${category.name} — ${booksCountLabel(count)}`}
    >
      {/* نمط النجوم */}
      <span aria-hidden="true" className="stars-pattern absolute inset-0 opacity-70" />
      {/* توهّج */}
      <span
        aria-hidden="true"
        className="absolute -left-10 -top-10 size-32 rounded-full bg-gold/15 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-gold/25"
      />

      <div className="relative flex h-full min-h-28 flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-white/10 text-gold-light backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border border-white/15 text-cream/60 opacity-0 transition-all duration-500 group-hover:opacity-100"
          >
            <ArrowLeft className="size-4" />
          </span>
        </div>
        <div>
          <h3 className="font-display text-lg font-extrabold text-cream">{category.name}</h3>
          <p className="mt-1 line-clamp-1 text-xs leading-5 text-cream/65">{category.shortDescription}</p>
          <p className="mt-2 text-[11px] font-bold tracking-wide text-gold-light/90">
            {booksCountLabel(count)}
          </p>
        </div>
      </div>

      {/* رقم زخرفي خافت */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-2 font-display text-8xl font-black text-white/[0.06]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </Link>
  );
}
