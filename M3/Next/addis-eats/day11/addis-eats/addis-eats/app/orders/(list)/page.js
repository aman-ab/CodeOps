import { redirect } from "next/navigation";
import { buildMetadata } from "../../../lib/seo";
import { getSession } from "../../../lib/session";
import { queryOrders } from "../../../lib/orders";
import { applyDemo } from "../../../lib/demo";
import { ORDERS_PAGE_SIZE, parseTableParams, tableHref } from "../../../lib/tableQuery";
import OrderTable from "../../../components/OrderTable";
import Pager from "../../../components/Pager";
import EmptyState from "../../../components/EmptyState";

export const metadata = buildMetadata({
  title: "Your orders",
  description: "Your Addis Eats orders: track a delivery or cancel one that has not left the kitchen.",
  path: "/orders",
});

export default async function OrdersPage({ searchParams }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=%2Forders");

  const sp = await searchParams;
  const demo = await applyDemo(sp); // ?demo=slow | error | empty (development only)
  const current = parseTableParams(sp); // { sort, dir, page } straight from the URL, validated

  // Scoped to the SESSION's id, sorted and cut to ONE page on the server.
  const { rows, total } = demo === "empty"
    ? { rows: [], total: 0 }
    : queryOrders({ userId: user.id, ...current, pageSize: ORDERS_PAGE_SIZE });

  const pages = Math.max(1, Math.ceil(total / ORDERS_PAGE_SIZE));
  const href = (page) => tableHref("/orders", { ...current, page }, { demo });
  if (current.page > pages) redirect(href(pages)); // ?page=99 -> the last real page, as a real URL

  // EMPTY: why it is empty, and what to do next
  if (total === 0) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-bold">Your orders</h1>
        <EmptyState title="No orders yet" href="/menu" linkLabel="Browse the menu">
          When you place an order it will appear here with its status, so you can track it or cancel it before it leaves the kitchen.
        </EmptyState>
      </main>
    );
  }

  const sortName = { date: "date", total: "total", area: "area" }[current.sort];
  const caption = `Your orders, sorted by ${sortName} (${current.dir === "asc" ? "ascending" : "descending"}), page ${current.page} of ${pages}`;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Your orders</h1>
      <OrderTable orders={rows} caption={caption} current={current} basePath="/orders" demo={demo} showActions />
      <Pager page={current.page} pages={pages} hrefFor={href} label="Orders pages" />
      <p className="text-sm text-stone-600">{total} {total === 1 ? "order" : "orders"} in total, {ORDERS_PAGE_SIZE} per page.</p>
    </main>
  );
}
