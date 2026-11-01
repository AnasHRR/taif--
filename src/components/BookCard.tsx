import Link from "next/link";
import type { Book } from "@/data/books";
import { getCategoryBySlug } from "@/data/categories";
import { cx, discountPercent, formatPrice } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import AddToCartButton from "@/components/AddToCartButton";
import RatingStars from "@/components/RatingStars";

interface BookCardProps {
  book: Book;
  /** dark لوضع البطاقة فوق خلفية بنفسجية داكنة */
  theme?: "light" | "dark";
  className?: string;
}

export default function BookCard({ book, theme = "light", className }: BookCardProps) {
  const category = getCategoryBySlug(book.category);
  const discount = discountPercent(book.price, book.oldPrice);
  const dark = theme === "dark";

  return (
    <article className={cx("group flex flex-col", className)}>
      <Link
        href={`/books/${book.slug}`}
        className="relative block outline-none"
        aria-label={`تفاصيل كتاب ${book.title}`}
      >
        <BookCover
          book={book}
          size="sm"
          className={cx(
            "shadow-card transition-all duration-500 ease-out frame-corners",
            "group-hover:-translate-y-2 group-hover:rotate-[1.4deg] group-hover:shadow-luxe",
            !book.available && "opacity-75 saturate-[.65]",
          )}
        />

        {/* الشارات */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5">
          <div className="flex flex-col items-start gap-1.5">
            {book.isNew ? (
              <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-extrabold text-primary shadow-gold">
                جديد
              </span>
            ) : null}
            {!book.available ? (
              <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold text-cream backdrop-blur-sm">
                غير متوفر
              </span>
            ) : null}
          </div>
          {discount ? (
            <span className="rounded-full bg-rose-600/95 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-card">
              خصم {discount}%
            </span>
          ) : null}
        </div>
      </Link>

      <div className={cx("flex flex-1 flex-col pt-4", dark ? "text-cream" : "text-ink")}>
        {category ? (
          <Link
            href={`/categories/${category.slug}`}
            className={cx(
              "mb-1 w-fit text-[11px] font-bold tracking-wide transition-colors",
              dark ? "text-gold-light hover:text-gold" : "text-secondary hover:text-gold-deep",
            )}
          >
            {category.name}
          </Link>
        ) : null}

        <h3 className="font-display text-[15px] font-bold leading-6">
          <Link
            href={`/books/${book.slug}`}
            className={cx(
              "line-clamp-1 transition-colors",
              dark ? "text-cream group-hover:text-gold-light" : "text-ink group-hover:text-secondary",
            )}
          >
            {book.title}
          </Link>
        </h3>

        <p className={cx("line-clamp-1 text-xs", dark ? "text-cream/55" : "text-mist")}>{book.author}</p>

        <RatingStars rating={book.rating} className="mt-1.5" />

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed pt-3 dark:border-cream/15"
          style={{ borderColor: dark ? "rgb(250 248 243 / 0.15)" : "rgb(36 16 47 / 0.1)" }}
        >
          <div className="flex items-baseline gap-1.5">
            <span className={cx("font-display text-lg font-extrabold", dark ? "text-gold-light" : "text-primary")}>
              {formatPrice(book.price)}
            </span>
            {book.oldPrice ? (
              <del className={cx("text-xs", dark ? "text-cream/40" : "text-mist/70")}>
                {formatPrice(book.oldPrice)}
              </del>
            ) : null}
          </div>
          <AddToCartButton book={book} variant="icon" />
        </div>
      </div>
    </article>
  );
}
