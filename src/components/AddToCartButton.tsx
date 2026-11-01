"use client";

import { ShoppingBasket, Ban } from "lucide-react";
import type { Book } from "@/data/books";
import { useCart } from "@/hooks/useCart";
import { cx } from "@/lib/utils";

interface AddToCartButtonProps {
  book: Book;
  /** icon: زر دائري صغير للبطاقات — full: زر كامل مع نص */
  variant?: "icon" | "full";
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ book, variant = "icon", quantity = 1, className }: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (!book.available) {
    return variant === "icon" ? (
      <span
        className={cx(
          "grid size-10 place-items-center rounded-full border border-ink/10 bg-sand text-mist",
          className,
        )}
        title="غير متوفر حالياً"
      >
        <Ban className="size-4" aria-hidden="true" />
      </span>
    ) : (
      <button
        type="button"
        disabled
        className={cx(
          "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-ink/10 bg-sand px-7 py-3.5 text-sm font-bold text-mist",
          className,
        )}
      >
        <Ban className="size-4" aria-hidden="true" />
        غير متوفر حالياً
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => addItem(book.id, quantity)}
        className={cx(
          "group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-cream shadow-card",
          "transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-luxe active:translate-y-0",
          className,
        )}
        aria-label={`أضف ${book.title} إلى السلة`}
      >
        <ShoppingBasket className="size-4.5 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
        أضف إلى السلة
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addItem(book.id, quantity)}
      className={cx(
        "grid size-10 place-items-center rounded-full bg-primary text-cream shadow-card",
        "transition-all duration-300 hover:scale-110 hover:bg-secondary active:scale-95",
        className,
      )}
      aria-label={`أضف ${book.title} إلى السلة`}
    >
      <ShoppingBasket className="size-4" aria-hidden="true" />
    </button>
  );
}
