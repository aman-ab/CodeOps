import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CrashIf from "../dev/CrashIf";
import Modal from "../ui/Modal";

// The dish name links to /menu/:id; "Quick view" opens a modal without leaving the menu.
//
// The modal's open/closed state lives HERE, in the card that owns it — not in Menu.
// Opening one modal therefore re-renders one card, not the whole menu (see PROFILE.md).
function Dish({ dish, onAdd, explode = false, currency = "ETB" }) {
  const { id, name, price, catagory, isspicy, description } = dish;
  const [quickView, setQuickView] = useState(false);
  const triggerRef = useRef(null); // focus goes back to this button when the modal closes

  return (
    <div className="card">
      <CrashIf when={explode} label="dish" />
      <Link to={`/menu/${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>
        {price}
        {currency}
      </p>
      <p>{catagory}</p>
      <p>{isspicy && <em> spicy🌶️ </em>}</p>
      <button onClick={() => onAdd(dish)}>ADD </button>{" "}
      <button ref={triggerRef} onClick={() => setQuickView(true)}>
        Quick view
      </button>

      {quickView && (
        <Modal title={name} onClose={() => setQuickView(false)} returnFocusRef={triggerRef}>
          <p>{description}</p>
          <p>
            {price} {currency} · {catagory}
            {isspicy && <em> · spicy🌶️</em>}
          </p>
          <button
            onClick={() => {
              onAdd(dish);
              setQuickView(false);
            }}
          >
            Add to cart
          </button>
        </Modal>
      )}
    </div>
  );
}

export default Dish;
