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
import { isCartBook, type CartBook } from "@/lib/cart";

export interface CartItem {
  book: CartBook;
  quantity: number;
}

interface StoredEntry {
  book: CartBook;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  /** مجموع عدد النسخ في السلة */
  count: number;
  /** المجموع الإجمالي بالدرهم */
  total: number;
  hydrated: boolean;
  addItem: (book: CartBook, quantity?: number) => void;
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

const STORAGE_KEY = "taif-cart-v2";

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
              isCartBook((entry as StoredEntry).book) &&
              typeof (entry as StoredEntry).quantity === "number" &&
              (entry as StoredEntry).quantity > 0,
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

  const addItem = useCallback((book: CartBook, quantity = 1) => {
    setEntries((previous) => {
      const index = previous.findIndex((entry) => entry.book.id === book.id);
      if (index >= 0) {
        const copy = [...previous];
        copy[index] = { ...copy[index], quantity: Math.min(copy[index].quantity + quantity, 99) };
        return copy;
      }
      return [...previous, { book, quantity }];
    });
    setToast(`أُضيف «${book.title}» إلى السلة`);
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setEntries((previous) => previous.filter((entry) => entry.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(bookId);
        return;
      }
      setEntries((previous) =>
        previous.map((entry) =>
          entry.book.id === bookId ? { ...entry, quantity: Math.min(quantity, 99) } : entry,
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
    () => entries.map(({ book, quantity }) => ({ book, quantity })),
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
