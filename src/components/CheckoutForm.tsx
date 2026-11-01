"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { buildOrderMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { cx } from "@/lib/utils";

interface FormFields {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

const initialFields: FormFields = { name: "", phone: "", city: "", address: "", notes: "" };

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (fields.name.trim().length < 3) errors.name = "فضلاً أدخل الاسم الكامل (3 أحرف على الأقل).";
  const digits = fields.phone.replace(/[\s-]/g, "");
  if (!/^\+?\d{9,15}$/.test(digits)) errors.phone = "فضلاً أدخل رقم هاتف صحيح (مثال: 0612345678).";
  if (fields.city.trim().length < 2) errors.city = "فضلاً أدخل اسم المدينة.";
  return errors;
}

const inputClass = (hasError?: string) =>
  cx(
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-mist/60",
    hasError
      ? "border-rose-400 focus:ring-2 focus:ring-rose-300"
      : "border-primary/15 focus:border-gold focus:ring-2 focus:ring-gold/40",
  );

/** نموذج إتمام الطلب — يفتح واتساب برسالة منسقة، ولا يخزن أي بيانات */
export default function CheckoutForm() {
  const { items, total } = useCart();
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: keyof FormFields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildOrderMessage({
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      city: fields.city.trim(),
      address: fields.address,
      notes: fields.notes,
      lines: items.map((item) => ({
        title: item.book.title,
        quantity: item.quantity,
        price: item.book.price,
      })),
      total,
    });

    // الطلب يتم حصرياً عبر واتساب — لا تُخزَّن أي بيانات على الخادم
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-bold text-ink">
            الاسم الكامل <span className="text-rose-500">*</span>
          </label>
          <input
            id="checkout-name"
            type="text"
            value={fields.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder="مثال: أمين التازي"
            autoComplete="name"
            className={inputClass(errors.name)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <FieldError message={errors.name} /> : null}
        </div>

        <div>
          <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-bold text-ink">
            رقم الهاتف <span className="text-rose-500">*</span>
          </label>
          <input
            id="checkout-phone"
            type="tel"
            dir="ltr"
            value={fields.phone}
            onChange={(event) => setField("phone", event.target.value)}
            placeholder="06 XX XX XX XX"
            autoComplete="tel"
            className={cx(inputClass(errors.phone), "text-left")}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <FieldError message={errors.phone} /> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="checkout-city" className="mb-1.5 block text-sm font-bold text-ink">
            المدينة <span className="text-rose-500">*</span>
          </label>
          <input
            id="checkout-city"
            type="text"
            value={fields.city}
            onChange={(event) => setField("city", event.target.value)}
            placeholder="مثال: الرباط"
            autoComplete="address-level2"
            className={inputClass(errors.city)}
            aria-invalid={Boolean(errors.city)}
          />
          {errors.city ? <FieldError message={errors.city} /> : null}
        </div>

        <div>
          <label htmlFor="checkout-address" className="mb-1.5 block text-sm font-bold text-ink">
            العنوان <span className="font-medium text-mist">(اختياري)</span>
          </label>
          <input
            id="checkout-address"
            type="text"
            value={fields.address}
            onChange={(event) => setField("address", event.target.value)}
            placeholder="الحي، الشارع، رقم المنزل…"
            autoComplete="street-address"
            className={inputClass()}
          />
        </div>
      </div>

      <div>
        <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-bold text-ink">
          ملاحظات إضافية <span className="font-medium text-mist">(اختياري)</span>
        </label>
        <textarea
          id="checkout-notes"
          rows={3}
          value={fields.notes}
          onChange={(event) => setField("notes", event.target.value)}
          placeholder="وقت مناسب للتوصيل، تغليف هدية، استفسار عن إصدار…"
          className={cx(inputClass(), "resize-none")}
        />
      </div>

      <button
        type="submit"
        className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_36px_-14px_rgb(37_211_102/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
      >
        <Send className="size-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100" aria-hidden="true" />
        إرسال الطلب عبر واتساب
      </button>

      <p className="flex items-start gap-2 text-xs leading-5 text-mist">
        <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        سيفتح واتساب في نافذة جديدة ورسالتك جاهزة بالكامل — اضغط «إرسال» هناك لتأكيد طلبك النهائي.
        لا نخزّن طلبك أو بياناتك في أي مكان.
      </p>

      {submitted ? (
        <p className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold leading-5 text-emerald-700">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          تم فتح واتساب برسالة طلبك. أكمل الإرسال هناك لتأكيد الطلب — سلتك ما زالت محفوظة ويمكنك
          تعديلها وإعادة الإرسال متى شئت.
        </p>
      ) : null}
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-rose-600">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
