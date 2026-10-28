"use client"; // EventSource and the map are browser-only
import { useOrderStream } from "./useOrderStream";
import ConnectionBadge from "./ConnectionBadge";
import StatusSteps from "./StatusSteps";
import DeliveryDetails from "./DeliveryDetails";
import MapPanel from "./MapPanel";
import OrderSummary from "./OrderSummary";

export default function LiveOrder({ id, initial }) {
  const { order, connection, pollError } = useOrderStream(id, initial);

  return (
    <div className="space-y-4">
      <ConnectionBadge connection={connection} status={order.status} />
      {pollError && <p className="text-sm text-red-700">Could not check for updates. Showing the last information we have.</p>}

      <StatusSteps status={order.status} />
      <DeliveryDetails order={order} />

      {order.status !== "cancelled" && (
        <div role="group" aria-label="Map of the delivery. The same information is in the text above." aria-describedby="delivery-details">
          <MapPanel courier={order.courier} delivery={order.delivery} status={order.status} />
        </div>
      )}

      <OrderSummary order={order} />
    </div>
  );
}
