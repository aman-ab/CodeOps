// A small read-only table for chart data. Real table markup: caption, thead, th scope.
// SERVER component: no state, no handlers, ships no JavaScript.
// columns: [{ key, label, align?: "right", format?: (value, row) => string }]; the first column is the row header.
export default function DataTable({ caption, columns, rows, footer }) {
  const align = (c) => (c.align === "right" ? "text-right tabular-nums" : "text-left");
  return (
    // a labelled, keyboard-focusable scroll container: on a narrow phone the table scrolls sideways instead of shrinking
    <div className="overflow-x-auto" role="region" aria-label={`${caption} (scrollable)`} tabIndex={0}>
      <table className="w-full border-collapse text-sm">
        <caption className="mb-2 text-left font-semibold">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-stone-300">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={`px-3 py-2 ${align(c)}`}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-stone-200">
              {columns.map((c, j) => {
                const value = c.format ? c.format(row[c.key], row) : row[c.key];
                return j === 0 ? (
                  <th key={c.key} scope="row" className="px-3 py-2 text-left font-normal">{value}</th>
                ) : (
                  <td key={c.key} className={`px-3 py-2 ${align(c)}`}>{value}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="border-t-2 border-stone-300 font-semibold">
              {columns.map((c, j) => {
                const value = footer[c.key] ?? "";
                return j === 0 ? (
                  <th key={c.key} scope="row" className="px-3 py-2 text-left">{value}</th>
                ) : (
                  <td key={c.key} className={`px-3 py-2 ${align(c)}`}>{value}</td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
