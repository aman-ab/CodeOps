import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api/orders";
import NotFound from "./NotFound";

// /orders/:id — where a successful order lands (replace: true, so Back skips the form).
function OrderReceipt() {
  const { id } = useParams();
  const order = getOrder(id);

  if (!order) return <NotFound message={`No order called ${id} on this device.`} />;

  return (
    <div className="main-c">
      <h2>✅ Order {order.id} received</h2>
      <p>
        Thank you, {order.form.name}. We will deliver to {order.form.area} and call {order.form.phone}.
      </p>
      {order.form.notes && <p>Note: {order.form.notes}</p>}
      {order.items.map((dish, i) => (
        <p key={i}>
          {dish.name} — {dish.price} ETB
        </p>
      ))}
      <p>
        <strong>Total: {order.total} ETB</strong>
      </p>
      <Link to="/menu">Order something else</Link>
    </div>
  );
}

export default OrderReceipt;
