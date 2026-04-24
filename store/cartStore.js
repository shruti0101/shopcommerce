"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartOpen: false,

      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
addToCart: (product, quantity = 1) => {
  const cart = get().cart;

  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    const newQty = existing.quantity + quantity;

    if (newQty <= 0) {
      // ❌ remove if 0 or negative
      set({
        cart: cart.filter((item) => item._id !== product._id),
      });
      return;
    }

    const updated = cart.map((item) =>
      item._id === product._id
        ? { ...item, quantity: newQty }
        : item
    );

    set({ cart: updated });
  } else {
    if (quantity > 0) {
      set({
        cart: [...cart, { ...product, quantity }],
      });
    }
  }

  set({ cartOpen: true });
},

      removeItem: (id) => {
        set({
          cart: get().cart.filter((item) => item._id !== id),
        });
      },

    updateQty: (id, qty) => {
  if (qty <= 0) {
    set({
      cart: get().cart.filter((item) => item._id !== id),
    });
    return;
  }

  const updated = get().cart.map((item) =>
    item._id === id
      ? { ...item, quantity: Math.max(1, qty) } // 🔥 force minimum 1
      : item
  );

  set({ cart: updated });
},

      clearCart: () => set({ cart: [] }),

      totalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      totalItems: () => {
        return get().cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    { name: "cart-storage" }
  )
);