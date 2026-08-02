"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  colorId?: string;
  colorName?: string;
  imagePath: string;
  quantity: number;
  series: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, colorId?: string) => void;
  updateQuantity: (id: string, colorId: string | undefined, newQuantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotalItems: number;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("azaro_cart");
    if (savedCart) {
      try {
        setCartState(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  const setCart = (updater: React.SetStateAction<CartItem[]>) => {
    setCartState((prev) => {
      const newCart = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("azaro_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.colorId === newItem.colorId
      );

      if (existingItemIndex >= 0) {
        // Increase quantity of existing item
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      }

      // Add new item
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, colorId?: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.colorId === colorId)));
  };

  const updateQuantity = (id: string, colorId: string | undefined, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id, colorId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.colorId === colorId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotalItems,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
