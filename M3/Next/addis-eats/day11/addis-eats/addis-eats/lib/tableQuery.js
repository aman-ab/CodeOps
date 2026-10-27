// Sorting and paging state lives in the URL: shareable, survives a refresh, works without JavaScript.
// Plain functions, no imports: safe anywhere.
export const ORDER_SORTS = ["date", "total", "area"];
export const ORDERS_PAGE_SIZE = 10;
const DEFAULT_DIR = { date: "desc", total: "desc", area: "asc" }; // newest, biggest, A–Z first

// The URL is user input: anything unexpected falls back to a default instead of throwing.
export function parseTableParams(sp) {
  const sort = ORDER_SORTS.includes(sp.sort) ? sp.sort : "date";
  const dir = sp.dir === "asc" || sp.dir === "desc" ? sp.dir : DEFAULT_DIR[sort];
  const n = Number(typeof sp.page === "string" ? sp.page : 1);
  const page = Number.isInteger(n) && n >= 1 ? n : 1;
  return { sort, dir, page };
}

// Clean URLs: parameters that equal the defaults are left out, so the default view is just /orders.
export function tableHref(base, { sort = "date", dir, page = 1 }, { demo, hash } = {}) {
  const d = dir ?? DEFAULT_DIR[sort];
  const p = new URLSearchParams();
  if (sort !== "date") p.set("sort", sort);
  if (d !== DEFAULT_DIR[sort]) p.set("dir", d);
  if (page > 1) p.set("page", String(page));
  if (demo) p.set("demo", demo);
  const qs = p.toString();
  return `${base}${qs ? `?${qs}` : ""}${hash ? `#${hash}` : ""}`;
}

// What a click on a column header should do: flip the active column, or start a new one at its natural direction.
export function nextDir(current, column) {
  return current.sort === column ? (current.dir === "asc" ? "desc" : "asc") : DEFAULT_DIR[column];
}

// 1 … 4 5 [6] 7 8 … 20
export function pageWindow(page, pages, radius = 2) {
  const out = [];
  for (let n = 1; n <= pages; n++) {
    if (n === 1 || n === pages || Math.abs(n - page) <= radius) out.push(n);
    else if (out[out.length - 1] !== "…") out.push("…");
  }
  return out;
}
