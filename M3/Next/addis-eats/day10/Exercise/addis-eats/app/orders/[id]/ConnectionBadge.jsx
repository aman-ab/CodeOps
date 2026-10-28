// A screen that quietly stops updating looks identical to one where nothing has happened:
// say which it is, in WORDS (the dot colour is only a hint).
const LABELS = {
  connecting: ["bg-stone-400", "Connecting…"],
  live: ["bg-green-600", "Live: updates arrive as they happen"],
  reconnecting: ["bg-amber-500", "Reconnecting… the information below may be a few seconds old"],
  closed: ["bg-amber-500", "Live updates are unavailable. Checking for changes every 5 seconds instead"],
};

export default function ConnectionBadge({ connection, status }) {
  const [dot, text] = connection === "ended"
    ? ["bg-stone-500", status === "cancelled" ? "Order cancelled. No more updates" : "Delivered. No more updates"]
    : LABELS[connection];
  return (
    <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-stone-700">
      <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />
      {text}
    </p>
  );
}
