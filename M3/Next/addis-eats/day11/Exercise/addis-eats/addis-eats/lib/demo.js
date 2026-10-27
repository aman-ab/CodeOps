// Exercise 7 — "each state demonstrable on demand".
//   ?demo=slow   waits 2.5 s so loading.js shows
//   ?demo=error  throws so error.js shows
//   ?demo=empty  pretends there is no data
// Only active when ENABLE_STATE_DEMOS=true (on by default in .env, off in .env.production), so a
// stranger cannot make your live site throw errors by editing the address bar.
export async function applyDemo(sp) {
  if (process.env.ENABLE_STATE_DEMOS !== "true") return null;
  const demo = typeof sp.demo === "string" ? sp.demo : null;
  if (demo === "slow") await new Promise((r) => setTimeout(r, 2500));
  if (demo === "error") throw new Error("Demo error: this is the error state, forced with ?demo=error");
  return demo === "empty" ? "empty" : null;
}
