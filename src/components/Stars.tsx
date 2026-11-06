import { cx } from "@/lib/utils";

interface StarDot {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  tone: "gold" | "light";
}

/** مواضع نجوم ثابتة وحتمية لتجنّب اختلاف التصيير بين الخادم والمتصفح */
function buildStars(count: number): StarDot[] {
  return Array.from({ length: count }, (_, index) => ({
    left: (index * 37 + 11) % 100,
    top: (index * 53 + 7) % 100,
    size: 2 + ((index * 7) % 3),
    delay: ((index * 13) % 10) / 2.5,
    duration: 2.4 + ((index * 17) % 6) / 2,
    tone: index % 3 === 0 ? "gold" : "light",
  }));
}

interface StarsProps {
  count?: number;
  className?: string;
}

/** طبقة نجوم متلألئة تُستخدم فوق الخلفيات الداكنة */
export default function Stars({ count = 26, className }: StarsProps) {
  return (
    <div aria-hidden="true" className={cx("stars-layer pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {buildStars(count).map((star, index) => (
        <span
          key={index}
          className={cx(
            "absolute rounded-full animate-twinkle",
            star.tone === "gold" ? "bg-gold-light" : "bg-white/70",
          )}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
