import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { getFeaturedBooks } from "@/data/books";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import Stars from "@/components/Stars";
import BookCover from "@/components/BookCover";

const floatingCoverStyles = [
  "left-[6%] top-[8%] w-40 xl:w-48 [--tilt:7deg] animate-float-slow",
  "right-[2%] top-[24%] w-48 xl:w-56 [--tilt:-6deg] animate-float-slower [animation-delay:0.8s]",
  "left-[28%] bottom-[4%] w-44 xl:w-52 [--tilt:4deg] animate-float-slow [animation-delay:1.6s]",
];

export default function Hero() {
  const featured = getFeaturedBooks(3);

  return (
    <section className="relative overflow-hidden bg-primary text-cream">
      {/* خلفية كونية — عنصر LCP: يُحمَل بأولوية عالية دون كسل،
          ويُقدَّم للموبايل بدرجة دقة منخفضة وجودة مضغوطة. */}
      <div className="absolute inset-0">
        <Image
          src="/images/banners/hero.jpeg"
          alt="مكتبة كونية بأقواس مغربية وكتب تطفو بين النجوم"
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1671px"
          className="object-cover object-[72%_50%] opacity-85 lg:object-center lg:opacity-100"
        />
        {/* تدرّج بنفسجي خفيف لضبط قراءة النص فوق الصورة دون إخفائها */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/55 to-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
      </div>
      <Stars count={30} />

      {/* توهّجات ذهبية */}
      <div aria-hidden="true" className="absolute -top-24 right-1/4 size-96 rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 left-1/5 size-96 rounded-full bg-secondary/40 blur-3xl" />

      <div className="shell relative grid items-center gap-14 py-20 sm:py-24 lg:min-h-[88vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        {/* النصوص */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            مكتبة عربية فاخرة — اطلب بضغطة واحدة عبر واتساب
          </span>

          <h1 className="mt-6 font-display text-4xl font-black leading-[1.25] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.3]">
            اكتشف عالماً من المعرفة
            <br />
            مع <span className="text-gradient-gold">مكتبة طيف</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-cream/80 sm:text-lg">
            بين صفحات الكتب تبدأ الحكايات، وتتوسع الآفاق، وتولد الأفكار.
            اختر كتابك القادم من مختاراتنا، وسيصلك أينما كنت.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link
              href="/library"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-primary shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              اكتشف الكتب
              <ArrowLeft className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href={getWhatsAppUrl(buildGreetingMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light"
            >
              <MessageCircle className="size-4.5" aria-hidden="true" />
              تواصل معنا عبر واتساب
            </a>
          </div>

          {/* إحصاءات */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/15 pt-7">
            {[
              { value: "+25", label: "كتاب مختار بعناية" },
              { value: "8", label: "تصنيفات متنوعة" },
              { value: "24/7", label: "طلب عبر واتساب" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-black text-gold-light sm:text-3xl" dir="ltr">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-5 text-cream/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* الكتب الطافية */}
        <div aria-hidden="true" className="relative hidden h-[30rem] lg:block xl:h-[32rem]">
          <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
          {featured.map((book, index) => (
            <div key={book.id} className={`absolute drop-shadow-[0_28px_40px_rgb(0_0_0/0.5)] ${floatingCoverStyles[index] ?? floatingCoverStyles[0]}`}>
              <BookCover book={book} size="sm" className="rounded-xl ring-1 ring-gold/30 frame-corners" />
            </div>
          ))}
        </div>
      </div>

      {/* مؤشر التمرير */}
      <a
        href="#categories"
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 text-cream/50 transition-colors hover:text-gold-light"
        aria-label="انتقل إلى قسم التصنيفات"
      >
        <span className="text-[11px] font-semibold tracking-widest">اكتشف المزيد</span>
        <ChevronDown className="size-4 animate-bounce-soft" aria-hidden="true" />
      </a>
    </section>
  );
}
