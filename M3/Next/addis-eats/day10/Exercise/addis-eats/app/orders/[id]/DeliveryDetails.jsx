import RelativeTime from "./RelativeTime";
import { distanceKm } from "../../../lib/geo";
import { km, when } from "../../../lib/format";

// The map as WORDS. Pins and tiles mean nothing to a screen reader, and plenty of people on a slow phone never
// see the map load: where the order is, where it is going and when it arrives must be readable without it.
export default function DeliveryDetails({ order }) {
  const away = km.format(distanceKm(order.courier, order.delivery));
  const finished = order.status === "delivered" || order.status === "cancelled";

  const courier = {
    placed: "Your order has been placed. The courier is at the kitchen.",
    preparing: "The kitchen is preparing your order. The courier is waiting at the kitchen.",
    on_the_way: `The courier is on the way, about ${away} km from you.`,
    delivered: "Your order has been delivered.",
    cancelled: "This order was cancelled, so no courier is assigned.",
  }[order.status];

  return (
    <dl id="delivery-details" className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt className="font-semibold">Delivering to</dt>
      <dd>{order.delivery.area}, Addis Ababa. The pin on the map marks the middle of the area, not your door.</dd>

      <dt className="font-semibold">Courier</dt>
      <dd>{courier}</dd>

      {!finished && (
        <>
          <dt className="font-semibold">Expected arrival</dt>
          <dd>{when.format(new Date(order.arrivesAt))} <RelativeTime iso={order.arrivesAt} prefix="· " /></dd>
        </>
      )}

      <dt className="font-semibold">Placed</dt>
      <dd>{when.format(new Date(order.createdAt))} <RelativeTime iso={order.createdAt} prefix="· " /></dd>
    </dl>
  );
}
