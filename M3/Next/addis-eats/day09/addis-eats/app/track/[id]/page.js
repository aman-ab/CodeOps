import { getOrderById } from "../../../lib/orders";
import MapPanel from "./MapPanel";

export default async function TrackOrderPage({ params }) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <main>
      <h1>Track Order {order.id}</h1>

      <p>Status: {order.status}</p>

      <MapPanel />

      <section>
        <h2>Delivery Information</h2>

        <p>Store location: Bole, Addis Ababa</p>

        <p>Delivery address: Mexico, Addis Ababa</p>
      </section>
    </main>
  );
}
