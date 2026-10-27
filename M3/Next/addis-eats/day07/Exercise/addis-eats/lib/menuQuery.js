import { getDishes } from "../app/menu/dishes";

const MAX_PAGE_SIZE = 20;

// Parse and check query-string input (it is user input). Returns { q, page, pageSize } or { errors }.
export function parseMenuParams(searchParams) {
  const q = (searchParams.get("q") ?? "").trim().slice(0, 40);
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "4");

  const errors = {};
  if (!Number.isInteger(page) || page < 1) errors.page = ["page must be a whole number, 1 or more"];
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > MAX_PAGE_SIZE)
    errors.pageSize = [`pageSize must be a whole number from 1 to ${MAX_PAGE_SIZE}`];

  return Object.keys(errors).length ? { errors } : { q, page, pageSize };
}

export async function queryMenu({ q, page, pageSize }) {
  const all = await getDishes();
  const needle = q.toLowerCase();
  const matches = needle
    ? all.filter((d) => d.name.toLowerCase().includes(needle) || d.category.toLowerCase().includes(needle))
    : all;

  const total = matches.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = matches.slice((page - 1) * pageSize, page * pageSize);
  return { items, q, page, pageSize, total, totalPages };
}
