"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookSearch, CornerDownLeft } from "lucide-react";
import { books } from "@/data/books";
import { getCategoryBySlug } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import BookCover from "@/components/BookCover";

interface HeaderSearchProps {
  open: boolean;
  onClose: () => void;
}

/** نافذة بحث فورية تظهر من الترويسة مع نتائج مباشرة */
export default function HeaderSearch({ open, onClose }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return books
      .filter((book) => {
        const category = getCategoryBySlug(book.category)?.name ?? "";
        return (
          book.title.includes(q) ||
          book.author.includes(q) ||
          category.includes(q) ||
          book.slug.includes(q)
        );
      })
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  const goToAll = () => {
    onClose();
    router.push(`/library?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="البحث في الكتب">
      <button
        type="button"
        aria-label="إغلاق البحث"
        onClick={onClose}
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
      />
      <div className="shell relative pt-20 sm:pt-28">
        <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-cream shadow-luxe">
          <div className="p-4 sm:p-5">
            <SearchBar value={query} onChange={setQuery} onSubmit={goToAll} autoFocus />
          </div>

          <div className="max-h-[50vh] overflow-y-auto border-t border-primary/10 px-2 py-2">
            {query.trim().length >= 2 ? (
              results.length > 0 ? (
                <ul>
                  {results.map((book) => (
                    <li key={book.id}>
                      <Link
                        href={`/library/${book.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-sand"
                      >
                        <span className="w-9 shrink-0 overflow-hidden rounded">
                          <BookCover book={book} size="xs" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-sm font-bold text-ink">
                            {book.title}
                          </span>
                          <span className="block truncate text-xs text-mist">{book.author}</span>
                        </span>
                        <span className="shrink-0 font-display text-sm font-bold text-secondary">
                          {formatPrice(book.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <BookSearch className="size-8 text-mist" aria-hidden="true" />
                  <p className="text-sm text-mist">لا توجد نتائج مطابقة لبحثك</p>
                </div>
              )
            ) : (
              <p className="px-3 py-8 text-center text-sm text-mist">
                اكتب حرفين على الأقل لبدء البحث في مكتبتنا
              </p>
            )}
          </div>

          {query.trim().length >= 2 && results.length > 0 ? (
            <button
              type="button"
              onClick={goToAll}
              className="flex w-full items-center justify-center gap-2 border-t border-primary/10 bg-sand/60 px-5 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-gold/30"
            >
              عرض كل النتائج
              <CornerDownLeft className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
