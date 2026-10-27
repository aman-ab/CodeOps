import Link from "next/link";
import OrderStatus from "./OrderStatus";
import { formatETB, formatWhen } from "../../lib/format";

// Shared by the server-rendered order page and the browser fallback copy.
export default function OrderDetails({ order, live = true }) {
  return (
    <div className="space-y-6">
      <OrderStatus id={order.id} initialOrder={order} live={live} />

      <section aria-label="Items" className="card p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Items</h2>

        <ul className="mt-4 divide-y divide-ink-100 text-sm">
          {order.items.map((item) => (
            <li key={item.dishId} className="flex justify-between gap-3 py-2.5">
              <span>
                <span className="font-medium">{item.quantity} × </span>
                {item.name}
              </span>
              <span className="whitespace-nowrap">{formatETB(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Subtotal</dt>
            <dd>{formatETB(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Delivery</dt>
            <dd>{formatETB(order.deliveryFee)}</dd>
          </div>
          <div className="flex justify-between pt-1 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-bold text-ink-900">{formatETB(order.total)}</dd>
          </div>
        </dl>
      </section>

      <section aria-label="Delivery details" className="card p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Delivery details</h2>

        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-500">Placed</dt>
            <dd className="font-medium">{formatWhen(order.createdAt ?? order.date)}</dd>
          </div>
          {order.customer?.name && (
            <div>
              <dt className="text-ink-500">Name</dt>
              <dd className="font-medium">{order.customer.name}</dd>
            </div>
          )}
          {order.customer?.phone && (
            <div>
              <dt className="text-ink-500">Phone</dt>
              <dd className="font-medium">{order.customer.phone}</dd>
            </div>
          )}
          {order.customer?.address && (
            <div>
              <dt className="text-ink-500">Address</dt>
              <dd className="font-medium">{order.customer.address}</dd>
            </div>
          )}
          {order.customer?.notes && (
            <div className="sm:col-span-2">
              <dt className="text-ink-500">Notes</dt>
              <dd className="font-medium">{order.customer.notes}</dd>
            </div>
          )}
          <div>
            <dt className="text-ink-500">Payment</dt>
            <dd className="font-medium">Cash on delivery</dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-wrap gap-3">
        {live && (
          <Link href={`/track/${order.id}`} className="btn btn-primary">
            Track delivery
          </Link>
        )}
        <Link href="/order" className="btn btn-secondary">
          All my orders
        </Link>
        <Link href="/dishes" className="btn btn-ghost">
          Order again
        </Link>
      </div>
    </div>
  );
}
