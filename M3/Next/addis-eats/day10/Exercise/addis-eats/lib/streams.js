// Counts open server-sent-event connections, so "navigate away five times: how many are still open?" has an
// answer you can see (in development the server console logs every open and close).
const state = (globalThis.__addisStreams ??= { open: 0 });
const log = (what, id) => {
  if (process.env.NODE_ENV !== "production") console.log(`[sse] ${what} ${id} (${state.open} open)`);
};

export const streams = {
  opened(id) { state.open++; log("open ", id); },
  closed(id) { state.open--; log("close", id); },
  get count() { return state.open; },
};
