"use client";

import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cx } from "@/lib/utils";

/** إشعار صغير يظهر أسفل الشاشة عند إضافة كتاب إلى السلة */
export default function CartToast() {
  const { toast, openCart } = useCart();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[55] flex justify-center px-4"
    >
      <button
        type="button"
        onClick={openCart}
        className={cx(
          "pointer-events-auto flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-cream shadow-luxe ring-1 ring-gold/40 transition-all duration-500",
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-16 opacity-0",
        )}
      >
        <CheckCircle2 className="size-4.5 shrink-0 text-gold" aria-hidden="true" />
        {toast}
        <span className="ms-1 text-xs font-semibold text-gold-light underline underline-offset-4">
          عرض السلة
        </span>
      </button>
    </div>
  );
}
