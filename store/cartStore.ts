import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size,
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { product, size, quantity: 1 }] });
        }
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.size === size),
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "nextwear-cart", // ключ в localStorage
    },
  ),
);
