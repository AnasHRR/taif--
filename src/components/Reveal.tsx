"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** تأخير الظهور بالمللي ثانية لعمل تتابع جميل */
  delay?: number;
}

/**
 * Single shared observer for all <Reveal /> instances on the page —
 * avoids creating dozens of observers on mobile and batches callbacks.
 */
let sharedObserver: IntersectionObserver | null = null;
const observedTargets = new WeakMap<Element, (visible: boolean) => void>();

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entriesObs) => {
      entriesObs.forEach((entry) => {
        if (entry.isIntersecting) {
          observedTargets.get(entry.target)?.(true);
          sharedObserver?.unobserve(entry.target);
          observedTargets.delete(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  return sharedObserver;
}

/** يكشف المحتوى بحركة ناعمة عند دخوله مجال الرؤية */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = getSharedObserver();
    observedTargets.set(element, setVisible);
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observedTargets.delete(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cx("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
