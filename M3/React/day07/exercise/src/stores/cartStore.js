import { create } from "zustand";

// Exercise 4 — a cart store with items, addItem, remove and clear. No provider needed.
export const useCartStore = create((set) => ({
  items: [],
  addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
  remove: (id) => set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
  clear: () => set({ items: [] }),
}));
