"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookX, Check, RotateCcw, SlidersHorizontal } from "lucide-react";
import { books, type Book } from "@/data/books";
import { categories } from "@/data/categories";
import { booksCountLabel, cx } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";

type SortKey = "recommended" | "newest" | "price-asc" | "price-desc" | "rating" | "title";
type QuickFilter = "" | "new" | "offers";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "الأكثر تميزاً" },
  { value: "newest", label: "وصل حديثاً" },
  { value: "price-asc", label: "السعر: من الأقل" },
  { value: "price-desc", label: "السعر: من الأعلى" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "title", label: "الاسم: أبجدياً" },
];

const priceFloor = Math.min(...books.map((book) => book.price));
const priceCeiling = Math.max(...books.map((book) => book.price));

function matchesQuery(book: Book, query: string): boolean {
  const category = categories.find((c) => c.slug === book.category)?.name ?? "";
  return (
    book.title.includes(query) ||
    book.author.includes(query) ||
    category.includes(query) ||
    book.slug.includes(query) ||
    book.publisher.includes(query)
  );
}

interface BooksBrowserProps {
  /**
   * فلتر سريع مبدئي يُستخدم عندما لا يحدّده باراميتر (filter) في الرابط —
   * لصفحات مثل /new-arrivals و /special-offers التي لا تمرّر فلترها عبر rewrites.
   */
  presetFilter?: QuickFilter;
}

/**
 * متصفّح الكتب الكامل: بحث، تصنيف، سعر، ترتيب، وتوفر.
 * يقرأ باراميترات الرابط (?q= &category= &filter=) كنقطة بداية،
 * ويستخدم presetFilter كفلتر مبدئي عندما لا يحدّده الرابط.
 */
export default function BooksBrowser({ presetFilter }: BooksBrowserProps = {}) {
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState(() => searchParams.get("category") ?? "all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(() => {
    const value = searchParams.get("filter");
    return value === "new" || value === "offers" ? value : (presetFilter ?? "");
  });
  const [sort, setSort] = useState<SortKey>("recommended");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // مزامنة مع رابط جديد (مثلاً من شريط البحث أو قائمة التصنيفات)؛ بدون باراميتر filter نعود للفلتر المبدئي
  useEffect(() => {
    const params = new URLSearchParams(paramsString);
    setQuery(params.get("q") ?? "");
    setCategory(params.get("category") ?? "all");
    const filter = params.get("filter");
    setQuickFilter(filter === "new" || filter === "offers" ? filter : (presetFilter ?? ""));
  }, [paramsString, presetFilter]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    const filtered = books.filter((book) => {
      if (quickFilter === "new" && !book.isNew) return false;
      if (quickFilter === "offers" && !(book.oldPrice && book.oldPrice > book.price)) return false;
      if (category !== "all" && book.category !== category) return false;
      if (onlyAvailable && !book.available) return false;
      if (min !== null && book.price < min) return false;
      if (max !== null && book.price > max) return false;
      if (trimmed.length > 0 && !matchesQuery(book, trimmed)) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "ar"));
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.year - a.year);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
    return sorted;
  }, [query, category, quickFilter, sort, minPrice, maxPrice, onlyAvailable]);

  const hasActiveFilters =
    query.trim() !== "" ||
    category !== "all" ||
    quickFilter !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    onlyAvailable;

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setQuickFilter("");
    setMinPrice("");
    setMaxPrice("");
    setOnlyAvailable(false);
  };

  const chipClass = (active: boolean) =>
    cx(
      "shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300",
      active
        ? "border-primary bg-primary text-cream shadow-card"
        : "border-primary/15 bg-white text-ink/70 hover:border-gold hover:text-primary",
    );

  return (
    <div>
      {/* لوحة الأدوات */}
      <div className="rounded-3xl border border-primary/8 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} className="flex-1" />
          <label className="relative block sm:w-52">
            <SlidersHorizontal
              aria-hidden="true"
              className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-mist"
            />
            <span className="sr-only">ترتيب النتائج</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="w-full appearance-none rounded-full border border-primary/15 bg-white py-3 pe-4 ps-11 text-sm font-semibold text-ink shadow-card outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/40"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* مرشحات التصنيف والفلاتر السريعة */}
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setCategory("all")} className={chipClass(category === "all")}>
            كل التصنيفات
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={chipClass(category === cat.slug)}
            >
              {cat.name}
            </button>
          ))}
          <span aria-hidden="true" className="mx-1 w-px shrink-0 bg-primary/10" />
          <button
            type="button"
            onClick={() => setQuickFilter(quickFilter === "new" ? "" : "new")}
            className={chipClass(quickFilter === "new")}
          >
            وصل حديثاً
          </button>
          <button
            type="button"
            onClick={() => setQuickFilter(quickFilter === "offers" ? "" : "offers")}
            className={chipClass(quickFilter === "offers")}
          >
            العروض والتخفيضات
          </button>
        </div>

        {/* السعر والتوفر */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-dashed border-primary/10 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs font-bold text-mist">السعر:</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceFloor}
              max={priceCeiling}
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder={`من ${priceFloor}`}
              aria-label="أدنى سعر"
              className="w-24 rounded-full border border-primary/15 bg-cream px-4 py-2 text-sm font-semibold outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/40"
            />
            <span className="text-mist">—</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceFloor}
              max={priceCeiling}
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder={`إلى ${priceCeiling}`}
              aria-label="أعلى سعر"
              className="w-24 rounded-full border border-primary/15 bg-cream px-4 py-2 text-sm font-semibold outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/40"
            />
            <span className="text-xs text-mist">درهم</span>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink/80">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(event) => setOnlyAvailable(event.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="grid size-5 place-items-center rounded-md border border-primary/25 bg-white transition-all duration-300 peer-checked:border-gold peer-checked:bg-gradient-to-br peer-checked:from-gold peer-checked:to-gold-deep [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
            >
              <Check className="size-3.5 text-primary transition-opacity" strokeWidth={3.5} />
            </span>
            المتوفر فقط
          </label>

          <p className="ms-auto text-xs font-bold text-secondary" aria-live="polite">
            {booksCountLabel(results.length)} من أصل {books.length}
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              إعادة تعيين
            </button>
          ) : null}
        </div>
      </div>

      {/* النتائج */}
      <div className="mt-10">
        {results.length > 0 ? (
          <BookGrid books={results} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-primary/20 bg-white/60 px-6 py-20 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-sand text-mist">
              <BookX className="size-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink">لا توجد كتب مطابقة لبحثك</p>
              <p className="mt-1 text-sm text-mist">جرّب كلمات مختلفة أو وسّع نطاق المرشحات.</p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              عرض جميع الكتب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
