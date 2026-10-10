// Collects <Profiler> timings so Exercise 5 and 6 can be compared on the page.
// Each commit that touches the profiled tree adds one entry.
const entries = { before: [], after: [] };

export function record(id, phase, actualDuration) {
  entries[id]?.push({ phase, ms: actualDuration });
}

export function reset(id) {
  entries[id].length = 0;
}

export function summary(id) {
  const updates = entries[id].filter((e) => e.phase === "update");
  const total = updates.reduce((sum, e) => sum + e.ms, 0);
  return {
    commits: updates.length,
    totalMs: total,
    avgMs: updates.length ? total / updates.length : 0,
  };
}
