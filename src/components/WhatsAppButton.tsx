import { MessageCircle } from "lucide-react";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";

/** زر واتساب عائم — القناة الوحيدة للتواصل والطلب */
export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(buildGreetingMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="group fixed bottom-5 left-5 z-40"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40 [animation-duration:2.6s]"
      />
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_34px_-10px_rgb(37_211_102/0.7)] transition-transform duration-300 group-hover:scale-110">
        <MessageCircle className="size-6" aria-hidden="true" />
      </span>
      <span className="pointer-events-none absolute bottom-1/2 right-full me-3 translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-bold text-cream opacity-0 shadow-luxe transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 rtl:group-hover:translate-x-1">
        نردّ عليك بسرعة عبر واتساب
      </span>
    </a>
  );
}
