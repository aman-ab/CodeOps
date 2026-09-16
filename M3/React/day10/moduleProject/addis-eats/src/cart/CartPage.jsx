import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore, selectTotal } from "./cartStore";
import Modal from "../ui/Modal";

function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore(selectTotal);
  const [confirmingClear, setConfirmingClear] = useState(false);

  if (items.length === 0) {
    return (
      <div className="page">
        <h2>Your cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Your cart</h2>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>
              {item.name} x{item.qty}
            </span>
            <span>{item.price * item.qty} ETB</span>
            <button type="button" onClick={() => removeItem(item.id)}>
              Remove one
            </button>
          </li>
        ))}
      </ul>

      <p className="cart-total">
        <strong>Total: {total} ETB</strong>
      </p>

      <div className="cart-actions">
        <button type="button" onClick={() => setConfirmingClear(true)}>
          Remove all
        </button>
        <Link to="/checkout" className="button-link">
          Go to checkout
        </Link>
      </div>

      <Modal
        open={confirmingClear}
        title="Remove all items?"
        confirmLabel="Remove all"
        onCancel={() => setConfirmingClear(false)}
        onConfirm={() => {
          clear();
          setConfirmingClear(false);
        }}
      >
        <p>This removes every item from your cart. This can&apos;t be undone.</p>
      </Modal>
    </div>
  );
}

export default CartPage;
