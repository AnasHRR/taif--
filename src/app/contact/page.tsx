import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { storeConfig } from "@/config/store";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع مكتبة طيف عبر واتساب أو الهاتف أو البريد الإلكتروني. نرد على استفساراتك عن الكتب والطلبات والتوصيل طوال أيام الأسبوع.",
  openGraph: {
    title: "اتصل بنا | مكتبة طيف",
    description: "قناة واحدة مباشرة وسريعة: راسلنا عبر واتساب وسنرد بأنفسنا.",
  },
};

const channels = [
  {
    icon: MessageCircle,
    title: "واتساب",
    value: storeConfig.phoneDisplay,
    hint: "الأسرع استجابة — راسلنا الآن",
    href: getWhatsAppUrl(buildGreetingMessage()),
    external: true,
  },
  {
    icon: Phone,
    title: "اتصال هاتفي",
    value: storeConfig.phoneDisplay,
    hint: storeConfig.workingHours,
    href: `tel:${storeConfig.phoneRaw}`,
    external: false,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: storeConfig.email,
    hint: "للاقتراحات والشراكات",
    href: `mailto:${storeConfig.email}`,
    external: false,
  },
];

const socials = [
  { href: storeConfig.social.instagram, label: "إنستغرام", icon: InstagramIcon },
  { href: storeConfig.social.facebook, label: "فيسبوك", icon: FacebookIcon },
  { href: storeConfig.social.x, label: "إكس", icon: XIcon },
  { href: storeConfig.social.youtube, label: "يوتيوب", icon: YoutubeIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="اتصل بنا"
        description="سؤال عن كتاب؟ استفسار عن طلب؟ اقتراح إصدار؟ يسعدنا حديثك دائماً — وقناتنا الأسرع هي واتساب."
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <Send className="size-3.5" aria-hidden="true" />
            نحن في الخدمة
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "اتصل بنا" }]}
      />

      <div className="shell py-14 sm:py-16">
        {/* قنوات التواصل */}
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((channel, index) => (
            <Reveal key={channel.title} delay={index * 100}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-3xl border border-primary/8 bg-white p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-luxe"
              >
                <span className="mx-auto grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-deep text-primary shadow-gold transition-transform duration-500 group-hover:scale-110">
                  <channel.icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-extrabold text-primary">{channel.title}</h2>
                <p className="mt-1.5 text-sm font-bold text-secondary" dir="ltr">
                  {channel.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-mist">{channel.hint}</p>
              </a>
            </Reveal>
          ))}
        </div>

        {/* النموذج + معلومات */}
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <section aria-label="نموذج التواصل" className="rounded-3xl border border-primary/8 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-primary">أرسل لنا رسالة</h2>
              <p className="mt-2 text-sm leading-6 text-mist">
                اكتب اسمك ورسالتك، وسنفتح واتساب برسالة جاهزة — أسرع من أي نموذج تقليدي.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid gap-6">
              {/* ساعات العمل والعنوان */}
              <section
                aria-label="معلومات المكتبة"
                className="stars-pattern relative overflow-hidden rounded-3xl bg-primary p-7 text-cream shadow-luxe sm:p-8"
              >
                <Stars count={14} />
                <div aria-hidden="true" className="absolute -left-16 -top-16 size-48 rounded-full bg-gold/15 blur-3xl" />
                <div className="relative">
                  <h2 className="font-display text-xl font-extrabold">معلومات المكتبة</h2>
                  <ul className="mt-5 space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                      <span className="leading-6 text-cream/85">
                        {storeConfig.address}
                        <br />
                        {storeConfig.city}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                      <span className="leading-6 text-cream/85">
                        {storeConfig.workingHours}
                        <br />
                        <span className="text-gold-light">{storeConfig.workingDays}</span>
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 border-t border-cream/15 pt-5">
                    <p className="text-xs font-bold text-cream/60">تابعنا على</p>
                    <div className="mt-3 flex items-center gap-2.5">
                      {socials.map(({ href, label, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid size-10 place-items-center rounded-full border border-cream/20 text-cream/75 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-primary"
                        >
                          <Icon className="size-4.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ملاحظة الطلب */}
              <div className="rounded-3xl border border-gold/30 bg-gold/10 p-6">
                <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-primary">
                  <MessageCircle className="size-5 text-gold-deep" aria-hidden="true" />
                  ملاحظة مهمة حول الطلبات
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-ink/75">
                  جميع الطلبات والتأكيدات النهائية تتم حصرياً عبر واتساب — التوفر، تكلفة التوصيل،
                  وطريقة الدفع تُتفق في المحادثة مباشرة. لا نملك نظام دفع إلكتروني حالياً، ونفضّل أن
                  نتحدث معك بأنفسنا.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
