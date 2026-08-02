"use client";

import { CartProvider } from "./CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartToast from "@/components/cart/CartToast";

export default function ClientCartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CartToast />
    </CartProvider>
  );
}
