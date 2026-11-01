import type { Book } from "@/data/books";
import { cx } from "@/lib/utils";
import BookCard from "@/components/BookCard";

interface BookGridProps {
  books: Book[];
  theme?: "light" | "dark";
  className?: string;
}

/** شبكة بطاقات الكتب المتجاوبة */
export default function BookGrid({ books, theme = "light", className }: BookGridProps) {
  return (
    <div
      className={cx(
        "grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-7 lg:grid-cols-4",
        className,
      )}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} theme={theme} />
      ))}
    </div>
  );
}
