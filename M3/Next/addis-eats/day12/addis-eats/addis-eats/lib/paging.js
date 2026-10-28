// Plain data + helpers, safe for both server and client (no dishes data imported here).
export const BROWSE_PAGE_SIZE = 4;

// One function builds every menu key, so the same request always has the same key (= one cache entry).
export function menuKey({ q = "", page = 1, pageSize = BROWSE_PAGE_SIZE } = {}) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  p.set("page", String(page));
  p.set("pageSize", String(pageSize));
  return `/api/menu?${p}`;
}
