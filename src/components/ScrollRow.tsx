"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps {
  children: ReactNode;
  label: string;
}

/**
 * صف تمرير أفقي بناب (snap) مع زرّي تنقّل — مثالي لقسم «وصل حديثاً».
 * في الاتجاه RTL تكون القيم السالبة في scrollBy حركة «للأمام».
 */
export default function ScrollRow({ children, label }: ScrollRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "next" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-start gap-2">
        <button
          type="button"
          onClick={() => scroll("next")}
          className="grid size-10 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-card transition-all duration-300 hover:border-gold hover:bg-gold hover:text-primary"
          aria-label="الكتب التالية"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll("prev")}
          className="grid size-10 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-card transition-all duration-300 hover:border-gold hover:bg-gold hover:text-primary"
          aria-label="الكتب السابقة"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth rounded-lg pb-2"
      >
        {children}
      </div>
    </div>
  );
}
