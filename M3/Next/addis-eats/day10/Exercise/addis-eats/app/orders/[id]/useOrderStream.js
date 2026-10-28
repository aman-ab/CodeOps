import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const TERMINAL = ["delivered", "cancelled"];

// Imported only by client components.
// - SEEDED: starts from the order the server already rendered, so nobody watches a spinner for a value we had.
// - STREAMS: one EventSource, closed on unmount (otherwise every visit leaves a connection open) and closed
//   deliberately once the order is delivered or cancelled.
// - FALLS BACK: if the stream cannot work at all (EventSource gives up, readyState CLOSED), poll /api/orders/[id]
//   every 5 s (the Day 41 way) instead of showing a screen that quietly stopped updating.
export function useOrderStream(id, initial) {
  const [streamed, setStreamed] = useState(initial);
  const [connection, setConnection] = useState(TERMINAL.includes(initial.status) ? "ended" : "connecting");

  useEffect(() => {
    if (TERMINAL.includes(initial.status)) return; // already finished: no connection needed at all

    const es = new EventSource(`/api/orders/${id}/stream`);
    es.onopen = () => setConnection("live");
    es.onmessage = (e) => {
      let next;
      try { next = JSON.parse(e.data); } catch { return; } // JSON arrives as text; dates inside are ISO strings
      setStreamed(next);
      if (TERMINAL.includes(next.status)) {
        es.close(); // close BEFORE the server hangs up, or EventSource would politely reconnect forever
        setConnection("ended");
      }
    };
    es.onerror = () => {
      // CONNECTING = the browser is retrying by itself. CLOSED = it gave up (e.g. 401/403/404): fall back to polling.
      setConnection(es.readyState === EventSource.CLOSED ? "closed" : "reconnecting");
    };

    return () => es.close(); // Day 29: still essential
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const polling = connection === "closed"; // a null key means "not yet": no request at all
  const poll = useSWR(polling ? `/api/orders/${id}` : null, fetcher, {
    refreshInterval: (latest) => (latest && TERMINAL.includes(latest.status) ? 0 : 5000),
  });

  const order = polling && poll.data ? poll.data : streamed;
  const state = TERMINAL.includes(order.status) ? "ended" : connection;
  return { order, connection: state, pollError: polling ? poll.error : undefined };
}
