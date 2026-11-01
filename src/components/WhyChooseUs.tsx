import { BadgePercent, Headset, LibraryBig, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const features = [
  {
    icon: LibraryBig,
    title: "تشكيلة متنوعة من الكتب",
    description: "من الروايات إلى الفلسفة والعلوم وكتب الأطفال، مختارات مدروسة تناسب ذوق كل قارئ.",
  },
  {
    icon: BadgePercent,
    title: "أسعار مناسبة",
    description: "عروض وتخفيضات دائمة على أهم الإصدارات، لأن المعرفة يجب أن تكون في متناول الجميع.",
  },
  {
    icon: MessageCircle,
    title: "طلب سهل عبر واتساب",
    description: "أضف كتبك إلى السلة وأرسل طلبك في دقيقة واحدة — بلا حسابات، بلا تسجيل، بلا تعقيد.",
  },
  {
    icon: Headset,
    title: "تواصل مباشر مع المكتبة",
    description: "فريقنا يرد على استفساراتك ويساعدك في اختيار كتابك القادم، كأنك داخل المكتبة تماماً.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="لماذا مكتبة طيف؟"
            title="تجربة شراء الكتب كما يجب أن تكون"
            description="بساطة، ثقة، وذوق رفيع في الاختيار — هذا ما وعدنا به أنفسنا منذ اليوم الأول."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 110}>
              <article className="group h-full rounded-3xl border border-primary/8 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-luxe">
                <span className="grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-deep text-primary shadow-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <feature.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-primary">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-mist">{feature.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
