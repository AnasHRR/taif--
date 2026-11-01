import Link from "next/link";
import { BookOpen, Home, Sparkles } from "lucide-react";
import Stars from "@/components/Stars";

export default function NotFound() {
  return (
    <section className="stars-pattern relative flex min-h-[70vh] items-center overflow-hidden bg-primary py-20 text-cream">
      <Stars count={26} />
      <div aria-hidden="true" className="absolute -top-24 right-1/3 size-96 rounded-full bg-secondary/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 left-1/4 size-80 rounded-full bg-gold/12 blur-3xl" />

      <div className="shell relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-light">
          <Sparkles className="size-3.5" aria-hidden="true" />
          صفحة غير موجودة
        </span>
        <p className="mt-6 font-display text-7xl font-black text-gradient-gold sm:text-8xl" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          يبدو أنك تاهت بين المجرات
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-cream/70">
          الصفحة التي تبحث عنها انتقلت إلى رفٍّ آخر — أو ربما لم تُكتب بعد. لنعُد بك إلى مكتبتنا.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-primary shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <Home className="size-4.5" aria-hidden="true" />
            العودة للرئيسية
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light"
          >
            <BookOpen className="size-4.5" aria-hidden="true" />
            تصفح الكتب
          </Link>
        </div>
      </div>
    </section>
  );
}
