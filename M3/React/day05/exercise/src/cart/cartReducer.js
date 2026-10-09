// Pure reducer: (state, action) -> next state.
// No React, no fetching, no mutation. Total is NOT stored here — it is
// derived from `items` in CartProvider so it can never disagree with the cart.
export const initialCart = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.dish] };
    case "remove":
      return { ...state, items: state.items.filter((d) => d.id !== action.id) };
    case "clear":
      return { ...state, items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}
