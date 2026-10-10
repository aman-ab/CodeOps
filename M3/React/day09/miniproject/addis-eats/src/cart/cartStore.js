import { create } from "zustand";
import { persist } from "zustand/middleware";

// The whole cart in one module: state + actions, no provider, no reducer file,
// no action-type strings. Any component, event handler or test can import it.
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
      remove: (id) => set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart", // the localStorage key — the order survives a refresh
      partialize: (s) => ({ items: s.items }), // save the data only, never the functions
    },
  ),
);

// Selectors. Each returns ONE value (a primitive or an existing reference), so a
// component re-renders only when that value changes.
// Derived values are computed here, not stored: they can never be out of date.
export const selectItems = (s) => s.items;
export const selectCount = (s) => s.items.length;
export const selectTotal = (s) => s.items.reduce((sum, d) => sum + d.price, 0);
