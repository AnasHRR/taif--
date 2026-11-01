import { Star } from "lucide-react";
import { cx, filledStars } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

/** خمس نجوم ذهبية تعرض التقييم */
export default function RatingStars({ rating, className, starClassName = "size-3.5" }: RatingStarsProps) {
  const filled = filledStars(rating);
  return (
    <span
      className={cx("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`التقييم ${rating} من 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cx(
            starClassName,
            index < filled ? "fill-gold text-gold" : "fill-transparent text-gold/30",
          )}
        />
      ))}
    </span>
  );
}
