import { Profiler, memo, useCallback, useState } from "react";
import { useFetch } from "../hooks/useFetch";

// Exercise 7 — profile, add React.memo + useCallback, profile again.
// Type in the box. That state belongs to the parent and has nothing to do with the dishes.
//   • PlainList  re-renders (and every Row with it) on every keystroke.
//   • MemoList   skips rendering because `dishes` and `onAdd` keep the same reference.
// Check it in the React DevTools Profiler, or in the console via <Profiler>.

function Row({ dish, onAdd, label }) {
  console.log(`Row render: ${dish.name} (${label})`);
  return (
    <p>
      {dish.name} — {dish.price} ETB <button onClick={() => onAdd(dish)}>add</button>
    </p>
  );
}

function PlainList({ dishes, onAdd }) {
  return dishes.map((d) => <Row key={d.id} dish={d} onAdd={onAdd} label="plain" />);
}

const MemoList = memo(function MemoList({ dishes, onAdd }) {
  return dishes.map((d) => <Row key={d.id} dish={d} onAdd={onAdd} label="memo" />);
});

function logRender(id, phase, actualDuration) {
  console.log(`[Profiler] ${id} ${phase} ${actualDuration.toFixed(2)}ms`);
}

export default function Exercise7_Profile() {
  const { data, loading, error } = useFetch("menu.json");
  const [typing, setTyping] = useState("");
  const [added, setAdded] = useState(0);

  const plainAdd = () => setAdded((n) => n + 1); // new function every render
  const stableAdd = useCallback(() => setAdded((n) => n + 1), []); // same function forever

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Exercise 7 · profile before and after</h2>
      <input value={typing} onChange={(e) => setTyping(e.target.value)} placeholder="type here" />
      <p>Added so far: {added}</p>

      <h3>Before: no memo</h3>
      <Profiler id="plain" onRender={logRender}>
        <PlainList dishes={data.items} onAdd={plainAdd} />
      </Profiler>

      <h3>After: React.memo + useCallback</h3>
      <Profiler id="memo" onRender={logRender}>
        <MemoList dishes={data.items} onAdd={stableAdd} />
      </Profiler>

      {/* Try it: pass `plainAdd` to MemoList. useCallback is gone, so memo can never skip. */}
    </div>
  );
}
