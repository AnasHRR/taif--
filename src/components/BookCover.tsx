import { getCategoryBySlug } from "@/data/categories";
import type { Book } from "@/data/books";
import { cx } from "@/lib/utils";

type CoverBook = Pick<Book, "id" | "title" | "author" | "category">;

interface BookCoverProps {
  book: CoverBook;
  /** xs مصغّرة زخرفية — sm للبطاقات — lg لصفحة التفاصيل — hero للنسخ الطافية */
  size?: "xs" | "sm" | "lg" | "hero";
  className?: string;
}

const titleSizes = {
  xs: "text-[9px] leading-4",
  sm: "text-base leading-7 sm:text-lg",
  lg: "text-2xl leading-9 sm:text-3xl sm:leading-[2.75rem]",
  hero: "text-sm leading-6",
};

const authorSizes = {
  xs: "text-[7px]",
  sm: "text-[10px] sm:text-xs",
  lg: "text-sm sm:text-base",
  hero: "text-[8px]",
};

const categorySizes = {
  xs: "hidden",
  sm: "text-[8px] sm:text-[9px]",
  lg: "text-xs",
  hero: "text-[7px]",
};

const imprintSizes = {
  xs: "hidden",
  sm: "text-[8px]",
  lg: "text-xs",
  hero: "text-[7px]",
};

/**
 * غلاف كتاب فاخر مرسوم برمجياً: تدرّج لوني من هوية التصنيف،
 * إطار ذهبي مذهّب، نجمة زخرفية، وكعب يميني كما في الكتب العربية.
 */
export default function BookCover({ book, size = "sm", className }: BookCoverProps) {
  const category = getCategoryBySlug(book.category);
  const palette = category?.palette ?? { from: "#24102f", to: "#54266f" };
  const patternId = `cover-stars-${book.id}`;

  return (
    <div
      className={cx("relative aspect-[3/4] w-full select-none overflow-hidden rounded-lg", className)}
      style={{ backgroundImage: `linear-gradient(158deg, ${palette.from} 0%, ${palette.to} 100%)` }}
      role="img"
      aria-label={`غلاف كتاب ${book.title} للمؤلف ${book.author}`}
    >
      {/* نجم زخرفي متكرر */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.07]">
        <defs>
          <pattern id={patternId} width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M26 18l2.2 5.8 5.8 2.2-5.8 2.2L26 34l-2.2-5.8-5.8-2.2 5.8-2.2z" fill="#ffffff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* إضاءة عمق */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(130% 70% at 50% -10%, rgb(255 255 255 / 0.16), transparent 55%), radial-gradient(140% 60% at 50% 115%, rgb(0 0 0 / 0.35), transparent 60%)",
        }}
      />

      {/* كعب الكتاب على اليمين (اتجاه الكتب العربية) */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[8%] border-l border-white/15"
        style={{
          backgroundImage: "linear-gradient(to left, rgb(0 0 0 / 0.38), rgb(0 0 0 / 0.12) 55%, transparent)",
        }}
      />

      {/* الإطار الذهبي الداخلي */}
      <div aria-hidden="true" className="absolute inset-[7%] rounded-[5px] border border-gold/45" />
      <div aria-hidden="true" className="absolute inset-[9.5%] rounded-[3px] border border-gold/20" />

      {/* نجمة الإطار العلوية */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cx("absolute left-1/2 top-[4.2%] -translate-x-1/2 text-gold", size === "lg" ? "size-5" : "size-3.5")}
        fill="currentColor"
      >
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
      </svg>

      {/* المحتوى */}
      {size === "xs" ? (
        <div className="relative flex h-full items-center justify-center">
          <svg viewBox="0 0 24 24" className="size-5 text-gold/80" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </div>
      ) : (
      <div className="relative flex h-full flex-col items-center justify-between px-[13%] py-[13%] text-center">
        <span className={cx("font-bold tracking-[0.18em] text-gold-light/90", categorySizes[size])}>
          {category?.name ?? ""}
        </span>

        <div className="flex w-full flex-col items-center gap-[0.9em]">
          <h3 className={cx("font-display font-extrabold text-cream", titleSizes[size])}>
            {book.title}
          </h3>
          {/* فاصل زخرفي */}
          <div aria-hidden="true" className="flex w-full items-center justify-center gap-1.5">
            <span className="h-px w-[26%] bg-gradient-to-l from-gold/70 to-transparent" />
            <svg viewBox="0 0 10 10" className={size === "lg" ? "size-2.5 text-gold" : "size-1.5 text-gold"} fill="currentColor">
              <path d="M5 0l5 5-5 5-5-5z" />
            </svg>
            <span className="h-px w-[26%] bg-gradient-to-r from-gold/70 to-transparent" />
          </div>
          <p className={cx("font-medium text-gold-light", authorSizes[size])}>{book.author}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className={cx("tracking-[0.3em] text-cream/55", imprintSizes[size])}>مكتبة طيف</span>
          <div aria-hidden="true" className="flex items-center gap-1 text-gold/70">
            {Array.from({ length: 3 }, (_, index) => (
              <svg key={index} viewBox="0 0 10 10" className="size-1" fill="currentColor">
                <path d="M5 0l1.7 3.3L10 5 6.7 6.7 5 10 3.3 6.7 0 5l3.3-1.7z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
