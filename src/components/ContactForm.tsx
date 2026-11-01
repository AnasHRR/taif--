"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Send } from "lucide-react";
import { buildContactMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { cx } from "@/lib/utils";

interface ContactFields {
  name: string;
  message: string;
}

interface ContactErrors {
  name?: string;
  message?: string;
}

const inputClass = (hasError?: string) =>
  cx(
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-mist/60",
    hasError
      ? "border-rose-400 focus:ring-2 focus:ring-rose-300"
      : "border-primary/15 focus:border-gold focus:ring-2 focus:ring-gold/40",
  );

/** نموذج التواصل — يرسل الرسالة عبر واتساب مباشرة */
export default function ContactForm() {
  const [fields, setFields] = useState<ContactFields>({ name: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: ContactErrors = {};
    if (fields.name.trim().length < 3) nextErrors.name = "فضلاً أدخل اسمك الكامل.";
    if (fields.message.trim().length < 10) nextErrors.message = "اكتب رسالة من 10 أحرف على الأقل.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = getWhatsAppUrl(buildContactMessage(fields.name.trim(), fields.message.trim()));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-bold text-ink">
          الاسم الكامل <span className="text-rose-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={fields.name}
          onChange={(event) => {
            setFields((previous) => ({ ...previous, name: event.target.value }));
            setErrors((previous) => ({ ...previous, name: undefined }));
          }}
          placeholder="ما اسمك الكريم؟"
          autoComplete="name"
          className={inputClass(errors.name)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? (
          <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-rose-600">
            <AlertCircle className="size-3.5" aria-hidden="true" />
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-bold text-ink">
          رسالتك <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={fields.message}
          onChange={(event) => {
            setFields((previous) => ({ ...previous, message: event.target.value }));
            setErrors((previous) => ({ ...previous, message: undefined }));
          }}
          placeholder="اكتب استفسارك، أو اسم كتاب تبحث عنه، أو أي اقتراح…"
          className={cx(inputClass(errors.message), "resize-none")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-rose-600">
            <AlertCircle className="size-3.5" aria-hidden="true" />
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_36px_-14px_rgb(37_211_102/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
      >
        <Send className="size-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100" aria-hidden="true" />
        إرسال عبر واتساب
      </button>

      <p className="text-xs leading-5 text-mist">
        عند الإرسال سيُفتح تطبيق واتساب ورسالتك جاهزة — نرد عادة خلال ساعات العمل نفسها.
      </p>
    </form>
  );
}
