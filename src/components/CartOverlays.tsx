"use client";

import dynamic from "next/dynamic";

/**
 * Cart drawer + toast live behind client-side dynamic imports.
 *
 * `next/dynamic` only code-splits inside Client Components — when called from
 * the Server Component layout these overlays were bundled into the header
 * chunk and downloaded/hydrated before the hero could paint. This wrapper
 * keeps them out of the critical path.
 */
const ShoppingCart = dynamic(() => import("@/components/ShoppingCart"), { ssr: false });
const CartToast = dynamic(() => import("@/components/CartToast"), { ssr: false });

export default function CartOverlays() {
  return (
    <>
      <ShoppingCart />
      <CartToast />
    </>
  );
}
