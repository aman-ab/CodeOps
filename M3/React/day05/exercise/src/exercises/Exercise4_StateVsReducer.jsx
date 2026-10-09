import { useReducer, useState } from "react";

// Exercise 4 — a dish customiser with three RELATED values: quantity, spicy, note.

// ---- Version A: three useState calls ----
function CustomiserState() {
  const [quantity, setQuantity] = useState(1);
  const [spicy, setSpicy] = useState(false);
  const [note, setNote] = useState("");

  // "reset" must remember all three setters — forget one and the form is wrong.
  function reset() {
    setQuantity(1);
    setSpicy(false);
    setNote("");
  }

  return (
    <div>
      <h3>A · useState ×3</h3>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
      <label>
        <input type="checkbox" checked={spicy} onChange={(e) => setSpicy(e.target.checked)} />
        spicy
      </label>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="note" />
      <button onClick={reset}>Reset</button>
      <p>
        {quantity} × {spicy ? "spicy" : "mild"} {note && `— "${note}"`}
      </p>
    </div>
  );
}

// ---- Version B: one reducer ----
const initialCustom = { quantity: 1, spicy: false, note: "" };

// Pure, so it could be moved to its own file and tested directly, like cartReducer.
function customReducer(state, action) {
  switch (action.type) {
    case "increase":
      return { ...state, quantity: state.quantity + 1 };
    case "decrease":
      return { ...state, quantity: Math.max(1, state.quantity - 1) };
    case "setSpicy":
      return { ...state, spicy: action.value };
    case "setNote":
      return { ...state, note: action.value };
    case "reset":
      return initialCustom; // one line, can't forget anything
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function CustomiserReducer() {
  const [state, dispatch] = useReducer(customReducer, initialCustom);
  return (
    <div>
      <h3>B · useReducer</h3>
      <button onClick={() => dispatch({ type: "increase" })}>+</button>
      <button onClick={() => dispatch({ type: "decrease" })}>−</button>
      <label>
        <input
          type="checkbox"
          checked={state.spicy}
          onChange={(e) => dispatch({ type: "setSpicy", value: e.target.checked })}
        />
        spicy
      </label>
      <input
        value={state.note}
        onChange={(e) => dispatch({ type: "setNote", value: e.target.value })}
        placeholder="note"
      />
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <p>
        {state.quantity} × {state.spicy ? "spicy" : "mild"} {state.note && `— "${state.note}"`}
      </p>
    </div>
  );
}

/*
  Comparison
  - Handlers in A calculate; handlers in B only describe what happened.
  - "reset" is three calls in A, one action in B.
  - All rules (quantity never below 1) live in one place in B.
  - A is shorter for this size; B pays off as more actions are added.
*/
export default function Exercise4_StateVsReducer() {
  return (
    <div>
      <h2>Exercise 4 · useState → useReducer</h2>
      <CustomiserState />
      <CustomiserReducer />
    </div>
  );
}
