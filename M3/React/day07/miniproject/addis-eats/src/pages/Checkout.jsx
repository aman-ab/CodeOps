import { Link, useNavigate } from "react-router-dom";
import { selectItems, selectTotal, useCartStore } from "../cart/cartStore";
import { useAuth } from "../auth/useAuth";
import { groupItems } from "../cart/groupItems";
import OrderForm from "../components/OrderForm";

// /checkout — still behind <RequireAuth>. Reads the items and the total, calls clear after ordering.
function Checkout() {
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const clear = useCartStore((s) => s.clear);
  const { user } = useAuth();
  const navigate = useNavigate();
  const lines = groupItems(items);

  function handleOrder(form) {
    clear();
    navigate("/menu", { replace: true, state: { orderPlaced: form.name } });
  }

  if (lines.length === 0) {
    return (
      <div className="main-c">
        <h2>Checkout</h2>
        <p>
          Your cart is empty. <Link to="/menu">Add something from the menu</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="main-c">
      <h2>Checkout</h2>
      {lines.map(({ dish, qty }) => (
        <p key={dish.id}>
          {dish.name} × {qty} — {dish.price * qty} ETB
        </p>
      ))}
      <p>Total: {total} ETB</p>

      <h2>Delivery details</h2>
      <OrderForm initialPhone={user.phone} onSubmit={handleOrder} />
    </div>
  );
}

export default Checkout;
