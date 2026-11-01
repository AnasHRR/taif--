"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getBookById, type Book } from "@/data/books";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface StoredEntry {
  id: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  /** مجموع عدد النسخ في السلة */
  count: number;
  /** المجموع الإجمالي بالدرهم */
  total: number;
  hydrated: boolean;
  addItem: (bookId: string, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** نص إشعار «أُضيف إلى السلة» */
  toast: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "taif-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // تحميل السلة من التخزين المحلي — يعمل على المتصفح فقط
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (entry): entry is StoredEntry =>
              typeof entry === "object" &&
              entry !== null &&
              typeof (entry as StoredEntry).id === "string" &&
              typeof (entry as StoredEntry).quantity === "number" &&
              getBookById((entry as StoredEntry).id) !== undefined,
          );
          setEntries(valid);
        }
      }
    } catch {
      // تجاهل أي خطأ في القراءة
    }
    setHydrated(true);
  }, []);

  // حفظ تلقائي بعد كل تعديل
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // تجاهل أي خطأ في الكتابة
    }
  }, [entries, hydrated]);

  // إخفاء الإشعار تلقائياً
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const addItem = useCallback((bookId: string, quantity = 1) => {
    setEntries((previous) => {
      const index = previous.findIndex((entry) => entry.id === bookId);
      if (index >= 0) {
        const copy = [...previous];
        copy[index] = { ...copy[index], quantity: Math.min(copy[index].quantity + quantity, 99) };
        return copy;
      }
      return [...previous, { id: bookId, quantity }];
    });
    const book = getBookById(bookId);
    setToast(book ? `أُضيف «${book.title}» إلى السلة` : "أُضيف الكتاب إلى السلة");
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== bookId));
  }, []);

  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(bookId);
        return;
      }
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === bookId ? { ...entry, quantity: Math.min(quantity, 99) } : entry,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setEntries([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const items = useMemo<CartItem[]>(
    () =>
      entries.flatMap((entry) => {
        const book = getBookById(entry.id);
        return book ? [{ book, quantity: entry.quantity }] : [];
      }),
    [entries],
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      total,
      hydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      toast,
      dismissToast,
    }),
    [items, count, total, hydrated, addItem, removeItem, updateQuantity, clearCart, isOpen, openCart, closeCart, toast, dismissToast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return context;
}
