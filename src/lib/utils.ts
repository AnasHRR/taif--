import { storeConfig } from "@/config/store";

/** دمج أسماء الفئات مع حذف القيم الفارغة */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** تنسيق السعر بالعملة المحلية: 85 درهم */
export function formatPrice(amount: number): string {
  return `${amount} ${storeConfig.currency.label}`;
}

/** نسبة الخصم بين السعر القديم والجديد */
export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/**
 * صيغة الجمع العربية الصحيحة لعدد الكتب:
 * كتاب واحد / كتابان / 3 كتب / 11 كتاباً
 */
export function booksCountLabel(count: number): string {
  if (count === 0) return "لا توجد كتب";
  if (count === 1) return "كتاب واحد";
  if (count === 2) return "كتابان";
  if (count <= 10) return `${count} كتب`;
  return `${count} كتاباً`;
}

/** أرقام النجوم المملوءة لتقييم معيّن */
export function filledStars(rating: number): number {
  return Math.max(0, Math.min(5, Math.round(rating)));
}
