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

      // ✅ ADD TO CART
      addToCart: (product, quantity = 1) => {

        const cart = get().cart;

        // ✅ CHECK SAME PRODUCT + SIZE + COLOR
        const existing = cart.find(
          (item) =>
            item._id === product._id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
        );

        // ✅ IF EXISTS
        if (existing) {

          const updated = cart.map((item) =>
            item._id === product._id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          );

          set({ cart: updated });

        } else {

          //  NEW ITEM
          set({
            cart: [
              ...cart,
              {
                ...product,
                quantity,
              },
            ],
          });

        }

        set({ cartOpen: true });

      },

      // ✅ REMOVE ITEM
      removeItem: (id, size, color) => {

        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item._id === id &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        });

      },

      // ✅ UPDATE QTY
      updateQty: (id, size, color, qty) => {

        // REMOVE IF 0
        if (qty <= 0) {

          set({
            cart: get().cart.filter(
              (item) =>
                !(
                  item._id === id &&
                  item.selectedSize === size &&
                  item.selectedColor === color
                )
            ),
          });

          return;
        }

        // UPDATE
        const updated = get().cart.map((item) =>
          item._id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? {
                ...item,
                quantity: Math.max(1, qty),
              }
            : item
        );

        set({ cart: updated });

      },

      // ✅ CLEAR
      clearCart: () => set({ cart: [] }),

      // ✅ TOTAL PRICE
      totalPrice: () => {
        return get().cart.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0
        );
      },

      // ✅ TOTAL ITEMS
      totalItems: () => {
        return get().cart.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );
      },

    }),
    {
      name: "cart-storage",
    }
  )
);