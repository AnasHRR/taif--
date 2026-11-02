"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { booksCountLabel, cx, formatPrice } from "@/lib/utils";
import BookCover from "@/components/BookCover";

/** درج سلة المشتريات الجانبي — ينزلق من الطرف الأيسر (نهاية الاتجاه العربي) */
export default function ShoppingCart() {
  const { items, count, total, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  // قفل تمرير الصفحة وإغلاق بمفتاح Escape
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={cx("fixed inset-0 z-[60]", !isOpen && "pointer-events-none")}
      role="dialog"
      aria-modal="true"
      aria-label="سلة المشتريات"
      aria-hidden={!isOpen}
    >
      {/* الخلفية المعتمة */}
      <button
        type="button"
        aria-label="إغلاق السلة"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        className={cx(
          "absolute inset-0 bg-primary/60 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      {/* اللوحة */}
      <aside
        className={cx(
          "absolute inset-y-0 left-0 flex w-[min(26.25rem,94vw)] flex-col bg-cream shadow-luxe transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* رأس الدرج */}
        <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-primary">
            <ShoppingBag className="size-5 text-gold-deep" aria-hidden="true" />
            سلة المشتريات
            {count > 0 ? (
              <span className="rounded-full bg-gold/25 px-2.5 py-0.5 text-xs font-bold text-gold-deep">
                {booksCountLabel(count)}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="grid size-10 place-items-center rounded-full text-mist transition-colors hover:bg-sand hover:text-ink"
            aria-label="إغلاق سلة المشتريات"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* المحتوى */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-sand text-mist">
              <ShoppingBag className="size-9" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink">سلتك فارغة حالياً</p>
              <p className="mt-1 text-sm leading-6 text-mist">
                تصفّح مكتبتنا وأضف الكتب التي تعجبك، ثم أرسل طلبك بضغطة واحدة عبر واتساب.
              </p>
            </div>
            <Link
              href="/library"
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-cream shadow-card transition-all duration-300 hover:bg-secondary"
            >
              ابدأ التصفح
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map(({ book, quantity }) => (
                <li key={book.id} className="flex gap-3.5 rounded-2xl bg-white p-3 shadow-card">
                  <Link href={`/library/${book.slug}`} onClick={closeCart} className="block w-16 shrink-0">
                    <BookCover book={book} size="xs" className="rounded-md shadow-card" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/library/${book.slug}`}
                          onClick={closeCart}
                          className="line-clamp-1 font-display text-sm font-bold text-ink transition-colors hover:text-secondary"
                        >
                          {book.title}
                        </Link>
                        <p className="line-clamp-1 text-xs text-mist">{book.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(book.id)}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-mist transition-colors hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`إزالة ${book.title} من السلة`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-primary/12 bg-cream">
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity - 1)}
                          className="grid size-8 place-items-center rounded-e-none rounded-full text-ink/70 transition-colors hover:bg-sand disabled:opacity-40"
                          disabled={quantity <= 1}
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center font-display text-sm font-bold" aria-live="polite">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity + 1)}
                          className="grid size-8 place-items-center rounded-e-none rounded-full text-ink/70 transition-colors hover:bg-sand"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-display text-sm font-extrabold text-primary">
                        {formatPrice(book.price * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* الخلاصة */}
            <div className="border-t border-primary/10 bg-white px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink">المجموع الفرعي</span>
                <span className="font-display text-xl font-black text-primary">{formatPrice(total)}</span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-mist">
                تكلفة التوصيل وتأكيد التوفر تُحدَّدان عند إتمام الطلب عبر واتساب.
              </p>
              <div className="mt-4 grid gap-2.5">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-primary shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  إتمام الطلب عبر واتساب
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="rounded-full border border-primary/15 px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-sand"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
