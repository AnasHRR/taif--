import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import PageHero from "@/components/PageHero";
import CartPageClient from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "سلة المشتريات",
  description:
    "راجع كتبك المختارة في سلة مكتبة طيف، عدّل الكميات، ثم أرسل طلبك كاملاً عبر واتساب برسالة منسقة تلقائياً.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHero
        title="سلة المشتريات"
        description="خطوة أخيرة تفصلك عن كتبك: راجع اختياراتك، املأ بياناتك، وسنجهّز رسالة الطلب لإرسالها عبر واتساب مباشرة."
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <ShoppingBag className="size-3.5" aria-hidden="true" />
            خطوة واحدة ويصلك طلبك
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "سلة المشتريات" }]}
      />
      <div className="shell py-14 sm:py-16">
        <CartPageClient />
      </div>
    </>
  );
}
