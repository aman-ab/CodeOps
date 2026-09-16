import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import { useAuth } from "../auth/AuthContext";
import OrderForm from "./OrderForm";

function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleOrder(form) {
    clear(); // empty the cart now that the order has gone through
    navigate("/", { state: { justOrdered: true } });
    alert(`Order placed! Thanks ${form.name}, delivering to ${form.area}.`);
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <h2>Checkout</h2>
        <p>Your cart is empty, so there&apos;s nothing to check out yet.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Checkout</h2>
      <p>Signed in as {user?.name}.</p>
      <OrderForm initialValues={user} onSubmit={handleOrder} />
    </div>
  );
}

export default Checkout;
