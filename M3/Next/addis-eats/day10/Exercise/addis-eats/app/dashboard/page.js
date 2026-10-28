import { notFound, redirect } from "next/navigation";
import { buildMetadata } from "../../lib/seo";
import { getSession } from "../../lib/session";
import { isStaff } from "../../lib/authz";
import { listOrders, queryOrders } from "../../lib/orders";
import { lastNDays, rangeLabel } from "../../lib/dates";
import { ordersPerDay, revenueByArea } from "../../lib/stats";
import { ORDERS_PAGE_SIZE, parseTableParams, tableHref } from "../../lib/tableQuery";
import { applyDemo } from "../../lib/demo";
import { etb } from "../../lib/format";
import RevenueChart from "./RevenueChart";
import OrdersChart from "./OrdersChart";
import DataTable from "../../components/DataTable";
import OrderTable from "../../components/OrderTable";
import Pager from "../../components/Pager";
import EmptyState from "../../components/EmptyState";
import ExportCsvLink from "../../components/ExportCsvLink";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Staff dashboard: revenue by delivery area and orders per day for the last 14 days.",
  path: "/dashboard",
});

export default async function DashboardPage({ searchParams }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=%2Fdashboard");
  if (!isStaff(user)) notFound(); // every customer's order is in here: refused on the server, not hidden

  const sp = await searchParams;
  const demo = await applyDemo(sp);
  const current = parseTableParams(sp);

  // Exercise 1: aggregate on the server. Only `byArea` (4 rows) and `perDay` (14 rows) cross to the browser.
  const now = new Date();
  const days = lastNDays(14, now);
  const range = rangeLabel(days, now);
  const everything = demo === "empty" ? [] : listOrders();
  const byArea = revenueByArea(everything, days);
  const perDay = ordersPerDay(everything, days);
  const hasChartData = byArea.some((r) => r.revenue > 0);
  const totalRevenue = byArea.reduce((sum, r) => sum + r.revenue, 0);
  const totalOrders = byArea.reduce((sum, r) => sum + r.orders, 0);

  const { rows, total } = demo === "empty"
    ? { rows: [], total: 0 }
    : queryOrders({ ...current, pageSize: ORDERS_PAGE_SIZE });
  const pages = Math.max(1, Math.ceil(total / ORDERS_PAGE_SIZE));
  const href = (page) => tableHref("/dashboard", { ...current, page }, { demo, hash: "orders" });
  if (current.page > pages) redirect(href(pages));

  return (
    <main className="space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {!hasChartData ? (
        <EmptyState title="Nothing to chart yet" href="/menu" linkLabel="See the menu">
          There are no orders in the last 14 days ({range}). The charts appear as soon as the next order is placed.
        </EmptyState>
      ) : (
        <>
          <p>
            <strong>{etb.format(totalRevenue)}</strong> from <strong>{totalOrders}</strong> orders, {range}.
            Cancelled orders are not counted.
          </p>

          <section aria-labelledby="revenue-h" className="space-y-3">
            <h2 id="revenue-h" className="text-xl font-semibold">Revenue by delivery area, ETB</h2>
            <p className="text-sm text-stone-600">{range}. Each bar starts at zero and shows its value.</p>
            <RevenueChart data={byArea} />
            <DataTable
              caption={`Revenue by delivery area, ${range} (ETB)`}
              columns={[
                { key: "area", label: "Delivery area" },
                { key: "orders", label: "Orders", align: "right" },
                { key: "revenue", label: "Revenue (ETB)", align: "right", format: (v) => etb.format(v) },
              ]}
              rows={byArea}
              footer={{ area: "Total", orders: totalOrders, revenue: etb.format(totalRevenue) }}
            />
          </section>

          <section aria-labelledby="orders-h" className="space-y-3">
            <h2 id="orders-h" className="text-xl font-semibold">Orders per day, {range}</h2>
            <p className="text-sm text-stone-600">Number of orders placed each day (Addis Ababa time). Days with no orders are shown as zero.</p>
            <OrdersChart data={perDay} />
            <DataTable
              caption={`Orders per day, ${range}`}
              columns={[
                { key: "label", label: "Day" },
                { key: "orders", label: "Orders", align: "right" },
              ]}
              rows={perDay}
            />
          </section>
        </>
      )}

      <section id="orders" aria-labelledby="all-h" className="scroll-mt-4 space-y-3">
        <h2 id="all-h" className="text-xl font-semibold">All orders</h2>
        {total === 0 ? (
          <EmptyState title="No orders yet">Orders from every customer will be listed here, newest first.</EmptyState>
        ) : (
          <>
            <OrderTable
              orders={rows}
              caption={`All orders, sorted by ${current.sort} (${current.dir === "asc" ? "ascending" : "descending"}), page ${current.page} of ${pages}`}
              current={current}
              basePath="/dashboard"
              demo={demo}
              hash="orders"
              showCustomer
            />
            <Pager page={current.page} pages={pages} hrefFor={href} label="Order pages" />
            <p className="text-sm text-stone-600">{total} orders in total, {ORDERS_PAGE_SIZE} per page.</p>
            <ExportCsvLink href="/api/orders/export?scope=all">Export every order (CSV)</ExportCsvLink>
          </>
        )}
      </section>
    </main>
  );
}
