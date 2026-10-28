import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const TERMINAL = ["delivered", "cancelled"];

// Imported only by client components. Every component that calls this with the same id
// shares ONE cache entry and ONE network request (deduplication, no configuration).
export function useOrder(id, initial) {
  return useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial, // Ex 4: the server already rendered it — no spinner on first paint
    // Ex 3: poll every 5 s, but stop once nothing can change any more
    refreshInterval: (latest) => (latest && TERMINAL.includes(latest.status) ? 0 : 5000),
  });
}
