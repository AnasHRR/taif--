import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";

/** لافتة الختام: دعوة أخيرة للطلب */
export default function CTABanner() {
  return (
    <section className="shell pb-24">
      <Reveal>
        <div className="stars-pattern relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-primary-deep via-primary to-secondary px-6 py-16 text-center text-cream shadow-luxe sm:px-12">
          <Stars count={20} />
          <div aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full bg-gold/15 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-16 size-72 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
              <Sparkles className="size-3.5" aria-hidden="true" />
              كتابك القادم على بُعد رسالة واحدة
            </span>
            <h2 className="mt-5 font-display text-3xl font-black leading-snug sm:text-4xl">
              جاهز لبدء رحلتك بين الصفحات؟
            </h2>
            <p className="mt-4 text-base leading-8 text-cream/75">
              اختر كتبك، أرسل طلبك عبر واتساب، ودع الباقي علينا.
              تأكيد التوفر وتفاصيل التوصيل تتم في المحادثة مباشرة.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/books"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-primary shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                تصفح المكتبة
                <ArrowLeft className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={getWhatsAppUrl(buildGreetingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light"
              >
                <MessageCircle className="size-4.5" aria-hidden="true" />
                اسألنا عن كتاب
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
