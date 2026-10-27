import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import MapPanel from "./MapPanel";
import StatusBadge from "../../components/StatusBadge";
import { canViewOrder, getOrderById } from "../../../lib/orders";
import { getSession } from "../../../lib/session";

export const metadata = { title: "Track order" };

export default async function TrackOrderPage({ params }) {
  const { id } = await params;

  const user = await getSession();

  if (!user) {
    redirect(`/signin?next=/track/${id}`);
  }

  const order = await getOrderById(id);

  if (!order || !canViewOrder(user, order)) {
    notFound();
  }

  return (
    <div className="page max-w-4xl">
      <Link href={`/order/${order.id}`} className="text-sm font-semibold text-brand-700 hover:underline">
        ← Back to order
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title">Track order {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-8">
        <MapPanel />
      </div>

      <section className="card mt-6 p-5 sm:p-6" aria-label="Delivery information">
        <h2 className="text-xl font-semibold">Delivery information</h2>

        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-500">Store location</dt>
            <dd className="font-medium">Bole, Addis Ababa</dd>
          </div>
          <div>
            <dt className="text-ink-500">Delivery address</dt>
            <dd className="font-medium">{order.customer?.address ?? "Mexico, Addis Ababa"}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs text-ink-500">
          The map shows example locations. Live driver tracking is not available yet.
        </p>
      </section>
    </div>
  );
}
