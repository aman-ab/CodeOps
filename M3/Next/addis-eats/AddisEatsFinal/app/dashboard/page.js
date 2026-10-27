import Link from "next/link";
import { redirect } from "next/navigation";
import { getDishes } from "../../lib/dishes";
import { getOrders } from "../../lib/orders";
import { getSession } from "../../lib/session";
import { formatETB } from "../../lib/format";
import DownloadCsvButton from "./DownloadCsvButton";
import OrdersChart from "./OrdersChart";
import OrderTable from "./OrdersTable";
import RevenueChart from "./RevenueChart";

export const metadata = { title: "Dashboard" };

function Stat({ label, value }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{value}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/dashboard");
  }

  if (user.role !== "staff") {
    return (
      <div className="page text-center">
        <p className="text-6xl" aria-hidden="true">🔒</p>
        <h1 className="page-title mt-4">Access denied</h1>
        <p className="page-subtitle mx-auto">Only staff members can view the dashboard.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    );
  }

  const [dishes, allOrders] = await Promise.all([getDishes(), getOrders()]);

  // Cancelled orders don't count as revenue.
  const orders = allOrders.filter((order) => order.status !== "cancelled");

  const categoryOf = new Map(dishes.map((dish) => [dish.id, dish.category]));

  const revenueByCategory = new Map();
  for (const order of orders) {
    for (const item of order.items) {
      const category = categoryOf.get(item.dishId) ?? "Other";
      revenueByCategory.set(category, (revenueByCategory.get(category) ?? 0) + item.price * item.quantity);
    }
  }

  const byCategory = ["Main Dish", "Side Dish", "Beverage"].map((category) => ({
    category,
    revenue: revenueByCategory.get(category) ?? 0,
  }));

  const ordersPerDate = new Map();
  for (const order of orders) {
    ordersPerDate.set(order.date, (ordersPerDate.get(order.date) ?? 0) + 1);
  }

  const byDate = [...ordersPerDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, orders: count }));

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const average = orders.length ? totalRevenue / orders.length : 0;

  return (
    <div className="page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Revenue and order activity at a glance.</p>
        </div>
        <DownloadCsvButton orders={allOrders} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total revenue" value={formatETB(totalRevenue)} />
        <Stat label="Orders" value={orders.length} />
        <Stat label="Average order" value={formatETB(average)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-5" aria-label="Revenue by category">
          <h2 className="font-sans text-base font-semibold">Revenue by category</h2>
          <div className="mt-4">
            <RevenueChart data={byCategory} />
          </div>
        </section>

        <section className="card p-5" aria-label="Orders per day">
          <h2 className="font-sans text-base font-semibold">Orders per day</h2>
          <div className="mt-4">
            <OrdersChart data={byDate} />
          </div>
        </section>
      </div>

      <section className="mt-6" aria-label="Orders table">
        <OrderTable orders={allOrders} />
      </section>
    </div>
  );
}
