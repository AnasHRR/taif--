import { Sparkle } from "lucide-react";
import { cx } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** نسخة داكنة للأقسام ذات الخلفية البنفسجية */
  tone?: "light" | "dark";
  align?: "center" | "start";
}

/** عنوان قسم موحّد مع مذهّب زخرفي */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "center",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cx("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-start")}>
      {eyebrow ? (
        <span
          className={cx(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide",
            dark
              ? "border-gold/40 bg-gold/10 text-gold-light"
              : "border-secondary/20 bg-secondary/5 text-secondary",
          )}
        >
          <Sparkle className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cx(
          "mt-4 font-display text-3xl font-extrabold leading-snug sm:text-4xl",
          dark ? "text-cream" : "text-primary",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cx("mt-3 text-base leading-7", dark ? "text-cream/70" : "text-mist")}>
          {description}
        </p>
      ) : null}
      <div
        aria-hidden="true"
        className={cx("mt-5 flex items-center gap-2", align === "center" ? "justify-center" : "justify-start")}
      >
        <span className={cx("h-px w-10", dark ? "bg-gold/50" : "bg-gold/70")} />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className={cx("h-px w-16", dark ? "bg-gold/50" : "bg-gold/70")} />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className={cx("h-px w-10", dark ? "bg-gold/50" : "bg-gold/70")} />
      </div>
    </div>
  );
}
