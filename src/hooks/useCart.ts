"use client";

import { useCartContext } from "@/context/CartContext";

/**
 * الخطّاف الرئيسي للتعامل مع السلة من أي مكوّن عميل:
 * const { items, addItem, total, openCart } = useCart();
 */
export function useCart() {
  return useCartContext();
}
