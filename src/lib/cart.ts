import type { Book } from "@/data/books";

/**
 * Minimal book shape kept in the cart.
 *
 * The full catalogue (long descriptions, metadata…) lives on the server.
 * Shipping it to the browser only to resolve cart items pulled ~20 KB of
 * unused JavaScript into the shared layout bundle, so the cart stores this
 * small snapshot instead.
 */
export type CartBook = Pick<
  Book,
  "id" | "slug" | "title" | "author" | "category" | "price" | "oldPrice"
>;

export function toCartBook(book: Book): CartBook {
  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author,
    category: book.category,
    price: book.price,
    oldPrice: book.oldPrice,
  };
}

export function isCartBook(value: unknown): value is CartBook {
  if (typeof value !== "object" || value === null) return false;
  const book = value as Record<string, unknown>;
  return (
    typeof book.id === "string" &&
    typeof book.slug === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.category === "string" &&
    typeof book.price === "number"
  );
}
