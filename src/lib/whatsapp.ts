import { storeConfig } from "@/config/store";
import { formatPrice } from "@/lib/utils";

/** يبني رابط واتساب برسالة جاهزة (مع ترميز آمن للنص العربي) */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface OrderLine {
  title: string;
  quantity: number;
  /** سعر الوحدة */
  price: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  city: string;
  address?: string;
  notes?: string;
  lines: OrderLine[];
  total: number;
}

/** رسالة الطلب الكاملة بالصيغة العربية المتفق عليها */
export function buildOrderMessage(order: OrderDetails): string {
  const lines: string[] = [
    "مرحباً مكتبة طيف،",
    "",
    "أرغب في تقديم طلب جديد:",
    "",
    `الاسم: ${order.name}`,
    `رقم الهاتف: ${order.phone}`,
    `المدينة: ${order.city}`,
  ];

  if (order.address && order.address.trim().length > 0) {
    lines.push(`العنوان: ${order.address.trim()}`);
  }

  lines.push("", "تفاصيل الطلب:");

  order.lines.forEach((line) => {
    lines.push(`${line.title} × ${line.quantity} = ${formatPrice(line.price * line.quantity)}`);
  });

  lines.push("", `المجموع الإجمالي: ${formatPrice(order.total)}`);

  if (order.notes && order.notes.trim().length > 0) {
    lines.push("", `ملاحظات: ${order.notes.trim()}`);
  }

  lines.push("", "شكراً لكم.");

  return lines.join("\n");
}

/** رسالة استفسار/طلب سريع لكتاب واحد من صفحة التفاصيل */
export function buildBookInquiryMessage(title: string, author: string, price: number, quantity: number): string {
  return [
    "مرحباً مكتبة طيف،",
    "",
    "أرغب في طلب هذا الكتاب:",
    "",
    `الكتاب: ${title}`,
    `المؤلف: ${author}`,
    `الكمية: ${quantity}`,
    `المجموع: ${formatPrice(price * quantity)}`,
    "",
    "هل هو متوفر حالياً؟ شكراً لكم.",
  ].join("\n");
}

/** رسالة تواصل عامة من صفحة «اتصل بنا» */
export function buildContactMessage(name: string, message: string): string {
  return ["مرحباً مكتبة طيف،", "", `الاسم: ${name}`, "", "الرسالة:", message, "", "شكراً لكم."].join("\n");
}

/** رسالة الترحيب الافتراضية لزر الواتساب العائم */
export function buildGreetingMessage(): string {
  return "مرحباً مكتبة طيف، لدي استفسار حول كتبكم.";
}
