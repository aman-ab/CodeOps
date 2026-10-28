// CSV is just text, and the escaping is the whole problem (RFC 4180 + one security rule).
//  1. A value containing a comma, a double quote, CR or LF is wrapped in quotes, and inner quotes are doubled:
//        Dawit, Sons & Co   ->  "Dawit, Sons & Co"
//        Hana "Honey" B     ->  "Hana ""Honey"" B"
//  2. CSV/formula injection: Excel and Sheets run a text cell that STARTS with = + - @ (or tab / CR) as a formula,
//     so a customer named =HYPERLINK(...) would execute on the staff member's computer. Such TEXT cells get a leading
//     apostrophe (the OWASP-recommended fix). Real numbers are not text, so -5 stays -5.
//     Side effect to know about: a customer genuinely called "+251 Cafe" shows as '+251 Cafe in the sheet.
//  3. Rows end with CRLF, as the RFC says. Missing values (null, undefined) are empty cells, not "null".
const DANGEROUS_START = /^[=+\-@\t\r]/;
const NEEDS_QUOTES = /[",\r\n]/;

export function cell(value) {
  if (typeof value === "number" || typeof value === "bigint") return String(value); // a number, not text: no injection risk
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  let s = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (DANGEROUS_START.test(s)) s = `'${s}`;
  return NEEDS_QUOTES.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export const row = (values) => values.map(cell).join(",") + "\r\n";

// columns: [{ header, value: (item) => any }]
export function toCsv(columns, items) {
  return row(columns.map((c) => c.header)) + items.map((item) => row(columns.map((c) => c.value(item)))).join("");
}

// For big exports: yields the CSV in pieces, so a route handler can stream it instead of building one huge string.
export function* csvChunks(columns, items, chunkSize = 200) {
  yield row(columns.map((c) => c.header));
  for (let i = 0; i < items.length; i += chunkSize) {
    yield items.slice(i, i + chunkSize).map((item) => row(columns.map((c) => c.value(item)))).join("");
  }
}

// Excel opens a UTF-8 CSV as Windows-1252 unless the file starts with a byte-order mark: without it "ሰላም" becomes "áˆ°áˆ‹áˆ".
export const BOM = "\uFEFF";
