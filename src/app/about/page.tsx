import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookMarked, HeartHandshake, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { storeConfig } from "@/config/store";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على قصة مكتبة طيف: مكتبة عربية مستقلة وُلدت من إيمان بأن الكتاب يغيّر الحياة. مختارات مدروسة، أسعار مناسبة، وطلب سهل عبر واتساب.",
  openGraph: {
    title: "من نحن | مكتبة طيف",
    description: "قصة مكتبة طيف — مكتبة عربية مستقلة بهوية كونية فاخرة.",
  },
};

const values = [
  {
    icon: BookMarked,
    title: "مختارات بعناية",
    description: "لا نعرض كل شيء، بل أفضل شيء؛ كل كتاب على رفوفنا مرّ بقراءة وتقييم حقيقيين قبل اعتماده.",
  },
  {
    icon: ShieldCheck,
    title: "كتب أصلية 100%",
    description: "نتعامل مباشرة مع دور النشر والموزعين المعتمدين لضمان طبعات أصلية بجودة تليق بمكتبتك.",
  },
  {
    icon: Truck,
    title: "توصيل لجميع المدن",
    description: "أينما كنت في المغرب، يصلك كتابك مغلفاً بعناية حتى باب منزلك.",
  },
  {
    icon: HeartHandshake,
    title: "علاقة لا تنتهي بالبيع",
    description: "نسعد بمرافقتك في اختياراتك القادمة، ونقترح عليك ما يناسب ذوقك كلما رغبت.",
  },
];

const stats = [
  { value: "+25", label: "كتاب مختار بعناية" },
  { value: "8", label: "أجنحة متنوعة" },
  { value: "+900", label: "قارئ سعيد" },
  { value: "48h", label: "متوسط زمن التوصيل" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="من نحن"
        description="طيفٌ من نور تقرؤه — مكتبة عربية مستقلة تؤمن بأن الكتاب الجيد يستحق أن يصل إلى قارئه بأسهل طريق ممكن."
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
            <Sparkles className="size-3.5" aria-hidden="true" />
            حكايتنا
          </span>
        }
        crumbs={[{ href: "/", label: "الرئيسية" }, { label: "من نحن" }]}
      />

      {/* القصة */}
      <section className="shell grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-secondary/20 blur-2xl"
            />
            <Image
              src="/images/logo.jpeg"
              alt="ركن قراءة دافئ داخل مكتبة طيف بإضاءة ذهبية ورفوف خشبية"
              width={1024}
              height={768}
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-luxe"
            />
            <div className="absolute -bottom-6 right-6 rounded-3xl border border-gold/30 bg-primary px-6 py-4 text-cream shadow-luxe">
              <p className="font-display text-2xl font-black text-gold-light" dir="ltr">
                2025
              </p>
              <p className="mt-1 text-xs text-cream/70">عام افتتاح أول رفّ لنا</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <SectionHeading
            align="start"
            eyebrow="قصة طيف"
            title="وُلدنا من إيمان بسيط: الكتاب يغيّر الحياة"
          />
          <div className="mt-6 space-y-5 text-base leading-8 text-ink/80">
            <p>
              بدأت {storeConfig.name} برفّ صغير وحلم كبير: أن يجد القارئ العربي مكاناً يختار له
              بذوق، ويوصل إليه كتابه دون تعقيد. سمّيناها «طيفاً» لأن الكتاب الجيد يبقى طيفاً لطيفاً
              يلازمك بعد الصفحة الأخيرة بزمن طويل.
            </p>
            <p>
              اليوم نفخر بأننا وجهة عشاق الرواية والفكر والعلم وكتب الأطفال؛ ننتقي إصداراتنا من أعرق
              دور النشر العربية، ونقدّمها بأسعار عادلة، مع تجربة طلب بسيطة عبر واتساب — لأننا نؤمن أن
              التقنية يجب أن تخدم القراءة لا أن تعقّدها.
            </p>
            <p>
              مرحباً بك في مكتبتك. تصفّح، اسأل، واطلب — وأخبرنا دائماً: ما الكتاب الذي ترك فيك
              طيفه؟
            </p>
          </div>
          <Link
            href="/library"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-cream shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary"
          >
            تصفّح رفوفنا
            <ArrowLeft className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* الإحصاءات */}
      <section className="border-y border-gold/20 bg-gradient-to-l from-primary via-primary-deep to-primary py-12">
        <dl className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="text-center">
                <dd className="font-display text-3xl font-black text-gradient-gold sm:text-4xl" dir="ltr">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-xs font-semibold text-cream/65 sm:text-sm">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* القيم */}
      <section className="py-20 sm:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="قيمنا"
              title="ما الذي يجعل طيف مختلفة؟"
              description="أربعة مبادئ لا نساوم عليها مع كل طلب وكل قارئ."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 110}>
                <article className="group h-full rounded-3xl border border-primary/8 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-luxe">
                  <span className="grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-deep text-primary shadow-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <value.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-primary">{value.title}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-mist">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
