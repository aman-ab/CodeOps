import { Profiler, useState } from "react";
import { create } from "zustand";
import SlowCard from "../shared/SlowCard";
import { LAB_DISHES } from "../shared/labDishes";
import { record, reset, summary } from "../shared/perfLog";

// Exercise 6 — fix ONE unnecessary re-render, then record again and compare with Exercise 5.
//
// THE FIX (step 3 of "the order to try things": select narrowly from a store). The count moved out of
// the parent into a store. The list only reads the `add` ACTION (it never changes), and a small
// <CartCount> subscribes to the count — so adding a dish re-renders <CartCount> and nothing else.
// No React.memo, no useCallback: the cheapest fix removed the cause.
const useLabCart = create((set) => ({
  count: 0,
  add: () => set((s) => ({ count: s.count + 1 })),
}));

function CartCount() {
  const count = useLabCart((s) => s.count);
  return (
    <p>
      Cart: <strong>{count}</strong> dishes
    </p>
  );
}

function List() {
  const add = useLabCart((s) => s.add); // an action: never changes, so the list never re-renders for it
  return (
    <ul>
      {LAB_DISHES.map((d) => (
        <SlowCard key={d.id} dish={d} onAdd={add} />
      ))}
    </ul>
  );
}

export default function Exercise6_Fix() {
  const [report, setReport] = useState(null);

  return (
    <div>
      <h2>Exercise 6 · fixed (AFTER)</h2>
      <Profiler id="after" onRender={(id, phase, actual) => record(id, phase, actual)}>
        <CartCount />
      </Profiler>
      <p>
        <button onClick={() => setReport(summary("after"))}>Show timings</button>{" "}
        <button
          onClick={() => {
            reset("after");
            setReport(null);
          }}
        >
          Reset timings
        </button>
      </p>
      {report && (
        <p role="status">
          {report.commits} commits · total {report.totalMs.toFixed(1)} ms · average {report.avgMs.toFixed(1)} ms per commit
        </p>
      )}
      <List />
      <p>
        Press "add" on three dishes, then “Show timings”. Compare with Exercise 5 (same three clicks), ideally in a
        production build. The count above is profiled alone, because that is the only thing that now re-renders.
        If your numbers show no real difference, say so — and remove the optimisation.
      </p>
    </div>
  );
}
