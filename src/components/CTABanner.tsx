import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { getFeaturedBooks } from "@/data/books";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import BookCover from "@/components/BookCover";

/** شذرات ذهبية زخرفية موزّعة على اللافتة */
const particles = [
  { left: "7%", top: "18%", size: "size-1.5", delay: "0s" },
  { left: "24%", top: "76%", size: "size-1", delay: "0.9s" },
  { left: "48%", top: "10%", size: "size-1", delay: "1.6s" },
  { left: "61%", top: "86%", size: "size-1.5", delay: "0.4s" },
  { left: "79%", top: "20%", size: "size-1", delay: "2.1s" },
  { left: "92%", top: "60%", size: "size-1.5", delay: "1.2s" },
];

const floatingCoverStyles = [
  "left-[3%] top-[10%] w-32 xl:w-40 [--tilt:-9deg] animate-float-slow [animation-delay:0.6s]",
  "right-[3%] top-[18%] w-32 xl:w-40 [--tilt:8deg] animate-float-slower [animation-delay:1.3s]",
  "inset-x-0 bottom-[2%] flex justify-center [--tilt:0deg] animate-float-slow [&>div]:w-40 sm:[&>div]:w-48 xl:[&>div]:w-56",
];

/** لافتة الختام الفاخرة: دعوة أخيرة للانطلاق في رحلة القراءة */
export default function CTABanner() {
  const featured = getFeaturedBooks(3);

  return (
    <section className="shell pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-primary-deep via-primary to-secondary shadow-luxe ring-1 ring-gold/15">
          {/* نسيج نجوم خفيف — في طبقة منفصلة لتجنّب تعارض خلفية التدرّج */}
          <div className="stars-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* شريط ذهبي علوي متوهّج */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/70 to-transparent"
          />

          {/* إضاءة زخرفية */}
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-gold/15 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-28 left-1/4 size-80 rounded-full bg-secondary-soft/30 blur-3xl" />

          {/* شذرات ذهبية */}
          {particles.map((particle) => (
            <span
              key={`${particle.left}-${particle.top}`}
              aria-hidden="true"
              className={`pointer-events-none absolute animate-twinkle rounded-full bg-gold shadow-gold ${particle.size}`}
              style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
            />
          ))}
          <Stars count={16} className="opacity-60" />

          <div className="relative grid items-center gap-12 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:py-12">
            {/* النصوص */}
            <div className="text-center lg:text-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
                <Sparkles className="size-3.5" aria-hidden="true" />
                عالم من المعرفة ينتظرك
              </span>

              <h2 className="mt-5 font-display text-3xl font-black leading-snug text-cream sm:text-4xl lg:text-[2.8rem] lg:leading-[1.35]">
                اجعل القراءة جزءاً <span className="text-gradient-gold">من عالمك</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-cream/75 lg:mx-0">
                اكتشف مجموعة متنوعة من الكتب التي تلهم فكرك وترافق رحلتك نحو المعرفة.
              </p>

              <div className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center lg:justify-start">
                <Link
                  href="/books"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-7 py-3.5 text-sm font-extrabold text-primary shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  اكتشف جميع الكتب
                  <ArrowLeft
                    className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={getWhatsAppUrl(buildGreetingMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gold/50 bg-gold/5 px-7 py-3.5 text-sm font-bold text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/15 hover:text-gold"
                >
                  <MessageCircle className="size-4.5" aria-hidden="true" />
                  تواصل معنا عبر واتساب
                </a>
              </div>
            </div>

            {/* صور الكتب الطافية */}
            <div aria-hidden="true" className="relative h-60 w-full sm:h-80 lg:h-[24rem]">
              {/* هالة ذهبية وحلقات زخرفية */}
              <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 hidden size-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 lg:block" />
              <div className="absolute left-1/2 top-1/2 hidden size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 xl:block" />

              {featured.map((book, index) => (
                <div
                  key={book.id}
                  className={`absolute drop-shadow-[0_24px_36px_rgb(0_0_0/0.45)] ${floatingCoverStyles[index] ?? floatingCoverStyles[0]}`}
                >
                  <BookCover book={book} size="hero" className="rounded-xl ring-1 ring-gold/30 frame-corners" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
