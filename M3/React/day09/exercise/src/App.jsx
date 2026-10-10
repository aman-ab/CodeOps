import { useState } from "react";
import ErrorBoundary from "./shared/ErrorBoundary";
import Exercise1_Boundary from "./exercises/Exercise1_Boundary";
import Exercise2_ThrowInDish from "./exercises/Exercise2_ThrowInDish";
import Exercise3_TwoBoundaries from "./exercises/Exercise3_TwoBoundaries";
import Exercise4_LazyRoutes from "./exercises/Exercise4_LazyRoutes";
import Exercise5_Profile from "./exercises/Exercise5_Profile";
import Exercise6_Fix from "./exercises/Exercise6_Fix";
import Exercise7_Portal from "./exercises/Exercise7_Portal";

const EXERCISES = [
  ["1", Exercise1_Boundary],
  ["2", Exercise2_ThrowInDish],
  ["3", Exercise3_TwoBoundaries],
  ["4", Exercise4_LazyRoutes],
  ["5", Exercise5_Profile],
  ["6", Exercise6_Fix],
  ["7", Exercise7_Portal],
];

// One exercise at a time (the profiling labs would distort each other's timings).
// The tab bar sits OUTSIDE the boundary, so a crashed exercise never takes the tabs with it.
function App() {
  const [current, setCurrent] = useState("1");
  const Current = EXERCISES.find(([label]) => label === current)[1];

  return (
    <div>
      <h1>Day 34 · Boundaries, Lazy Loading, Performance &amp; Portals — Exercises</h1>
      <nav>
        {EXERCISES.map(([label]) => (
          <button
            key={label}
            onClick={() => setCurrent(label)}
            aria-pressed={label === current}
            style={{ fontWeight: label === current ? "bold" : "normal", marginRight: 6 }}
          >
            {label}
          </button>
        ))}
      </nav>
      <hr />
      <ErrorBoundary name="exercise" resetKeys={[current]} fallback={<p role="alert">⚠ This exercise crashed. Pick another tab.</p>}>
        <Current key={current} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
