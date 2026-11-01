"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import type { Book } from "@/data/books";
import AddToCartButton from "@/components/AddToCartButton";
import { buildBookInquiryMessage, getWhatsAppUrl } from "@/lib/whatsapp";

interface BookActionsProps {
  book: Book;
}

/** إجراءات صفحة الكتاب: الكمية + إضافة للسلة + طلب مباشر عبر واتساب */
export default function BookActions({ book }: BookActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const inquiryUrl = getWhatsAppUrl(
    buildBookInquiryMessage(book.title, book.author, book.price, quantity),
  );

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      {/* منتقي الكمية */}
      <div className="flex items-center rounded-full border border-primary/15 bg-white shadow-card">
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.min(value + 1, 99))}
          className="grid size-12 place-items-center rounded-full text-primary transition-colors hover:bg-sand"
          aria-label="زيادة الكمية"
        >
          <Plus className="size-4.5" aria-hidden="true" />
        </button>
        <span className="min-w-10 text-center font-display text-lg font-extrabold text-primary" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.max(value - 1, 1))}
          disabled={quantity <= 1}
          className="grid size-12 place-items-center rounded-full text-primary transition-colors hover:bg-sand disabled:opacity-35"
          aria-label="إنقاص الكمية"
        >
          <Minus className="size-4.5" aria-hidden="true" />
        </button>
      </div>

      {book.available ? (
        <AddToCartButton book={book} variant="full" quantity={quantity} />
      ) : null}

      <a
        href={inquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#25d366]/50 px-7 py-3 text-sm font-extrabold text-[#128050] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25d366] hover:bg-[#25d366] hover:text-white hover:shadow-[0_14px_30px_-12px_rgb(37_211_102/0.6)]"
      >
        <MessageCircle className="size-4.5" aria-hidden="true" />
        {book.available ? "اطلب الآن عبر واتساب" : "استفسر عن التوفر عبر واتساب"}
      </a>
    </div>
  );
}
