import { createSlice } from "@reduxjs/toolkit";

// Exercise 7 — the same cart as a Redux Toolkit slice. NOT wired into the app:
// there is no configureStore, no <Provider>. It exists to be compared with
// stores/cartStore.js.
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    // Immer lets these look like mutation; it produces a new immutable state.
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
