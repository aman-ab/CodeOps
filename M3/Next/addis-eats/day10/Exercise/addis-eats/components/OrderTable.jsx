import Link from "next/link";
import CancelOrderForm from "../app/orders/CancelOrderForm";
import { etb, when } from "../lib/format";
import { tableHref, nextDir } from "../lib/tableQuery";

const STATUS = { placed: "Placed", preparing: "Preparing", on_the_way: "On the way", delivered: "Delivered", cancelled: "Cancelled" };

// Exercise 6: a sortable column header. The sort is a plain link to a URL (/orders?sort=total&dir=asc),
// so it works without JavaScript, can be shared, and the table stays a server component.
// aria-sort goes on the ACTIVE column only. The ▲/▼ arrow is drawn with CSS (after:content), not text,
// so it is not copied into a spreadsheet along with the table.
function SortHeader({ column, label, current, basePath, demo, hash, right }) {
  const active = current.sort === column;
  const arrow = !active ? "" : current.dir === "asc" ? "after:content-['_▲']" : "after:content-['_▼']";
  return (
    <th
      scope="col"
      aria-sort={active ? (current.dir === "asc" ? "ascending" : "descending") : undefined}
      className={`px-3 py-2 ${right ? "text-right" : "text-left"}`}
    >
      <Link
        href={tableHref(basePath, { sort: column, dir: nextDir(current, column), page: 1 }, { demo, hash })}
        className={`underline-offset-2 hover:underline ${arrow}`}
      >
        {label}
      </Link>
    </th>
  );
}

// SERVER component: a read-only table has no state and no handlers, so nothing is shipped to the browser
// (the Cancel button is the only client piece, and only on rows where it applies).
export default function OrderTable({ orders, caption, current, basePath, demo, hash, showCustomer = false, showActions = false }) {
  const head = "px-3 py-2";
  return (
    <div className="overflow-x-auto" role="region" aria-label={`${caption} (scrollable)`} tabIndex={0}>
      <table className="w-full border-collapse text-sm">
        <caption className="mb-2 text-left font-semibold">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-stone-300">
            <th scope="col" className={`${head} text-left`}>Order</th>
            {showCustomer && <th scope="col" className={`${head} text-left`}>Customer</th>}
            <SortHeader column="date" label="Placed" current={current} basePath={basePath} demo={demo} hash={hash} />
            <SortHeader column="area" label="Area" current={current} basePath={basePath} demo={demo} hash={hash} />
            <SortHeader column="total" label="Total" current={current} basePath={basePath} demo={demo} hash={hash} right />
            <th scope="col" className={`${head} text-left`}>Status</th>
            {showActions && <th scope="col" className={`${head} text-left`}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-stone-200">
              <th scope="row" className={`${head} text-left font-semibold`}>
                <Link className="underline" href={`/orders/${o.id}`}>{o.id}</Link>
              </th>
              {showCustomer && <td className={head}>{o.name}</td>}
              <td className={head}><time dateTime={o.createdAt}>{when.format(new Date(o.createdAt))}</time></td>
              <td className={head}>{o.area}</td>
              <td className={`${head} text-right tabular-nums`}>{etb.format(o.total)}</td>
              <td className={head}>{STATUS[o.status] ?? o.status}</td>
              {showActions && (
                <td className={head}>
                  {o.status === "placed" || o.status === "preparing" ? <CancelOrderForm orderId={o.id} /> : "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
