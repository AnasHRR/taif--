"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { booksCountLabel, formatPrice } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import CheckoutForm from "@/components/CheckoutForm";

/** صفحة السلة الكاملة: العناصر + الخلاصة + نموذج إتمام الطلب عبر واتساب */
export default function CartPageClient() {
  const { items, count, total, hydrated, updateQuantity, removeItem, clearCart } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid gap-4" aria-busy="true" aria-label="جاري تحميل السلة">
        <div className="h-32 animate-pulse rounded-3xl bg-white shadow-card" />
        <div className="h-32 animate-pulse rounded-3xl bg-white shadow-card" />
        <div className="h-56 animate-pulse rounded-3xl bg-white shadow-card" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-dashed border-primary/20 bg-white/70 px-8 py-16 text-center shadow-card">
        <span className="grid size-20 place-items-center rounded-full bg-sand text-mist">
          <ShoppingBag className="size-9" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">سلتك فارغة حالياً</h2>
          <p className="mt-2 text-sm leading-7 text-mist">
            لم تضف أي كتاب بعد. تصفّح مكتبتنا واختر ما يفتح شهيتك للقراءة — الطلب بعدها رسالة
            واتساب واحدة فقط.
          </p>
        </div>
        <Link
          href="/library"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-cream shadow-card transition-colors hover:bg-secondary"
        >
          تصفح جميع الكتب
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_26rem]">
      {/* قائمة الكتب */}
      <section aria-label="محتويات السلة">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold text-primary">
            كتبك المختارة
            <span className="ms-2 rounded-full bg-gold/25 px-2.5 py-0.5 align-middle text-xs font-bold text-gold-deep">
              {booksCountLabel(count)}
            </span>
          </h2>
          <button
            type="button"
            onClick={() => {
              if (confirmClear) {
                clearCart();
                setConfirmClear(false);
              } else {
                setConfirmClear(true);
              }
            }}
            onBlur={() => setConfirmClear(false)}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            {confirmClear ? "اضغط مرة أخرى للتأكيد" : "إفراغ السلة"}
          </button>
        </div>

        <ul className="grid gap-4">
          {items.map(({ book, quantity }) => (
            <li
              key={book.id}
              className="flex gap-4 rounded-3xl border border-primary/8 bg-white p-4 shadow-card sm:items-center sm:gap-6 sm:p-5"
            >
              <Link href={`/library/${book.slug}`} className="block w-20 shrink-0 sm:w-24">
                <BookCover book={book} size="xs" className="rounded-lg shadow-card" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link
                    href={`/library/${book.slug}`}
                    className="line-clamp-1 font-display text-base font-extrabold text-ink transition-colors hover:text-secondary"
                  >
                    {book.title}
                  </Link>
                  <p className="line-clamp-1 text-xs text-mist">{book.author}</p>
                  <p className="mt-1.5 text-sm font-bold text-secondary">{formatPrice(book.price)} للنسخة</p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full border border-primary/15 bg-cream">
                    <button
                      type="button"
                      onClick={() => updateQuantity(book.id, quantity + 1)}
                      className="grid size-10 place-items-center rounded-full text-primary transition-colors hover:bg-sand"
                      aria-label={`زيادة كمية ${book.title}`}
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                    <span className="min-w-9 text-center font-display text-base font-extrabold" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(book.id, quantity - 1)}
                      disabled={quantity <= 1}
                      className="grid size-10 place-items-center rounded-full text-primary transition-colors hover:bg-sand disabled:opacity-35"
                      aria-label={`إنقاص كمية ${book.title}`}
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-display text-lg font-black text-primary">
                      {formatPrice(book.price * quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(book.id)}
                      className="grid size-9 place-items-center rounded-full text-mist transition-colors hover:bg-rose-50 hover:text-rose-600"
                      aria-label={`إزالة ${book.title} من السلة`}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* الخلاصة والنموذج */}
      <div className="grid gap-6 lg:sticky lg:top-28">
        <section aria-label="ملخص الطلب" className="rounded-3xl border border-primary/8 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-extrabold text-primary">ملخص الطلب</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-mist">المجموع الفرعي ({booksCountLabel(count)})</dt>
              <dd className="font-bold text-ink">{formatPrice(total)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-mist">
                <Truck className="size-4 text-gold-deep" aria-hidden="true" />
                التوصيل
              </dt>
              <dd className="font-bold text-gold-deep">يُحدَّد عند التواصل</dd>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-primary/15 pt-3">
              <dt className="font-display text-base font-extrabold text-primary">المجموع الإجمالي</dt>
              <dd className="font-display text-2xl font-black text-gradient-gold">{formatPrice(total)}</dd>
            </div>
          </dl>
        </section>

        <section
          aria-label="بيانات الطلب"
          className="rounded-3xl border border-primary/8 bg-white p-6 shadow-card"
        >
          <h2 className="font-display text-lg font-extrabold text-primary">بيانات التوصيل</h2>
          <p className="mt-1 text-xs leading-5 text-mist">
            املأ الحقول التالية وسنجهّز رسالتك تلقائياً لإرسالها عبر واتساب.
          </p>
          <div className="mt-4">
            <CheckoutForm />
          </div>
        </section>
      </div>
    </div>
  );
}
