import { Profiler, useState } from "react";
import SlowCard from "../shared/SlowCard";
import { LAB_DISHES } from "../shared/labDishes";
import { record, reset, summary } from "../shared/perfLog";

// Exercise 5 — record a Profiler session while adding three dishes, and note the slowest component.
//
// HOW: build and preview (npm run build && npm run preview) so you profile a production build,
// throttle the CPU 4×, open React DevTools → Profiler → record, press "add" on three dishes, stop.
// The <Profiler> below also logs every commit, so you can compare without DevTools.
//
// WHAT YOU WILL SEE: the cart count lives in this parent, so every "add" re-renders ALL 150 cards
// — "Why did this render? → the parent rendered".
export default function Exercise5_Profile() {
  const [cartCount, setCartCount] = useState(0); // state too high: the list does not need it
  const [report, setReport] = useState(null);

  return (
    <div>
      <h2>Exercise 5 · profile (BEFORE)</h2>
      <p>
        Cart: <strong>{cartCount}</strong> dishes
      </p>
      <p>
        <button onClick={() => setReport(summary("before"))}>Show timings</button>{" "}
        <button
          onClick={() => {
            reset("before");
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

      <Profiler id="before" onRender={(id, phase, actual) => record(id, phase, actual)}>
        <ul>
          {LAB_DISHES.map((d) => (
            <SlowCard key={d.id} dish={d} onAdd={() => setCartCount((n) => n + 1)} />
          ))}
        </ul>
      </Profiler>
    </div>
  );
}
