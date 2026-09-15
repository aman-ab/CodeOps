import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * The cart as a store rather than context -- it's read on the Menu,
 * DishDetail, Cart and Checkout screens, so it's a plain module any of
 * them can import directly, each reading only the slice it needs.
 */
export const useCartStore = create(
  persist(
    (set) => ({
      items: [], // { id, name, price, catagory, isspicy, qty }

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...dish, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
            .filter((item) => item.qty > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" }
  )
);

// Derived values, computed from items rather than stored separately so they
// can never go out of date. Exported so any component can select narrowly.
export const selectItemCount = (state) =>
  state.items.reduce((sum, item) => sum + item.qty, 0);

export const selectTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
