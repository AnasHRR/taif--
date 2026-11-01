"use client";

import { Search, X } from "lucide-react";
import { cx } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

/** حقل بحث موحّد بالهوية البصرية للمكتبة */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "ابحث عن كتاب أو مؤلف…",
  autoFocus,
  className,
}: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
      className={cx("relative", className)}
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute start-4 top-1/2 size-4.5 -translate-y-1/2 text-mist"
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="بحث في الكتب"
        className="w-full rounded-full border border-primary/15 bg-white py-3 pe-11 ps-11 text-sm text-ink shadow-card outline-none transition-all duration-300 placeholder:text-mist/70 focus:border-gold focus:ring-2 focus:ring-gold/40 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute end-3.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-mist transition-colors hover:bg-sand hover:text-ink"
          aria-label="مسح البحث"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
      <button type="submit" className="sr-only">
        بحث
      </button>
    </form>
  );
}
