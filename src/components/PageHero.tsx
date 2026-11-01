import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import Stars from "@/components/Stars";

interface Crumb {
  href?: string;
  label: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: ReactNode;
  crumbs?: Crumb[];
}

/** ترويسة الصفحات الداخلية: خلفية كونية + مسار تنقّل */
export default function PageHero({ title, description, eyebrow, crumbs }: PageHeroProps) {
  return (
    <section className="stars-pattern relative overflow-hidden bg-primary py-14 text-cream sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary-deep/80 via-transparent to-primary-deep/60"
      />
      <Stars count={20} />
      <div aria-hidden="true" className="absolute -top-24 right-1/4 size-72 rounded-full bg-gold/12 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 left-1/6 size-72 rounded-full bg-secondary/40 blur-3xl" />

      <div className="shell relative text-center">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="مسار التنقل">
            <ol className="mb-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-cream/55">
              {crumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronLeft className="size-3 text-gold/70" aria-hidden="true" />
                  ) : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold-light">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-bold text-gold-light">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <div className="mb-4">{eyebrow}</div> : null}

        <h1 className="font-display text-3xl font-black leading-snug sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>

        {description ? (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cream/70 sm:text-base sm:leading-8">
            {description}
          </p>
        ) : null}

        <div aria-hidden="true" className="mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-gold/50" />
          <span className="size-1.5 rotate-45 bg-gold" />
          <span className="h-px w-20 bg-gold/50" />
          <span className="size-1.5 rotate-45 bg-gold" />
          <span className="h-px w-12 bg-gold/50" />
        </div>
      </div>
    </section>
  );
}
