import { getOrder, toPublicOrder } from "../../../../../lib/orders";
import { getSession } from "../../../../../lib/session";
import { canViewOrder } from "../../../../../lib/authz";
import { jsonError } from "../../../../../lib/http";
import { streams } from "../../../../../lib/streams";

export const dynamic = "force-dynamic"; // a stream is never prerendered or cached

const TICK_MS = 3000; // (a route.js may only export HTTP methods and route config, so this stays private)
const TERMINAL = ["delivered", "cancelled"];

// The SSE message format is strict: "data: " + the payload + TWO newlines. With one newline the browser waits
// forever for a message that never completes.
const message = (payload) => `data: ${JSON.stringify(payload)}\n\n`;

// GET /api/orders/ord_800/stream  (text/event-stream)
//   401 not signed in · 403 not yours · 404 no such order — all BEFORE a stream is opened, as plain JSON errors.
// Then: one message straight away (a snapshot), another every 3 s, and a deliberate close once the order is
// delivered or cancelled. The browser's EventSource reconnects by itself if the connection drops, and the
// first message after a reconnect is a fresh snapshot, so a phone that missed updates on 3G catches up.
export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return jsonError("Not signed in", 401);

  const { id } = await params;
  const existing = getOrder(id);
  if (!existing) return jsonError("No such order", 404);
  if (!canViewOrder(session, existing)) return jsonError("Not yours", 403);

  const encoder = new TextEncoder();
  let timer;
  let finished = false;
  let controllerRef;

  // The ONE place everything is torn down: timer, counter, stream. Safe to call twice.
  const finish = () => {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    streams.closed(id);
    try { controllerRef.close(); } catch {} // already closed or cancelled by the client
  };

  const push = () => {
    const order = getOrder(id);
    if (!order) return finish();
    controllerRef.enqueue(encoder.encode(message(toPublicOrder(order))));
    if (TERMINAL.includes(order.status)) finish(); // nothing left to say: close deliberately
  };

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
      streams.opened(id);
      controller.enqueue(encoder.encode("retry: 3000\n\n")); // how long the browser waits before reconnecting
      push();
      if (!finished) timer = setInterval(push, TICK_MS);
      request.signal.addEventListener("abort", finish, { once: true }); // the tab closed or navigated away
    },
    cancel() { finish(); },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no", // tell nginx-style proxies not to hold the messages back
    },
  });
}
