import { create } from "zustand";
import { persist } from "zustand/middleware";

// Exercise 6 — the same store wrapped in the persist middleware.
export const usePersistedCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
      remove: (id) => set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "d32-ex6-cart", // localStorage key
      partialize: (s) => ({ items: s.items }), // save data only, never functions
    },
  ),
);
