import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { groupItems } from "../cart/groupItems";
import OrderForm from "../components/OrderForm";

// /checkout — wrapped in <RequireAuth> in App.jsx, so `user` is always set here.
function Checkout() {
  const { items, total, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const lines = groupItems(items);

  // useNavigate: CODE decides to navigate, after an event (the form was valid).
  // replace: true -> the back button won't return to a finished checkout form.
  function handleOrder(form) {
    dispatch({ type: "clear" });
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
