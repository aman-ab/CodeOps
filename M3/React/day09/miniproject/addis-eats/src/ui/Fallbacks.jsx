import { Link } from "react-router-dom";

// A fallback says WHAT failed, what still works, and offers an action.
// None of them shows the raw error message to the customer — that goes to the log.

const isChunkError = (error) =>
  /dynamically imported module|importing a module script|loading chunk|failed to fetch/i.test(
    String(error?.message),
  );

// Last resort. Outside the router's reach on purpose, so it uses a plain <a>:
// a full reload is exactly what we want here. The cart is saved in localStorage, so it survives.
export function AppCrashed() {
  return (
    <div className="main-c" role="alert">
      <h2>Addis-Eats hit a problem</h2>
      <p>Your cart is saved on this device. Reloading usually fixes it.</p>
      <button onClick={() => window.location.reload()}>Reload the page</button>{" "}
      <a href="/">Go to the home page</a>
    </div>
  );
}

// Around the routed page area: the header, nav and footer stay up.
export function PageUnavailable({ error, reset }) {
  const download = isChunkError(error);
  return (
    <div className="main-c" role="alert">
      <h2>{download ? "This page couldn't be downloaded" : "This page couldn't be shown"}</h2>
      <p>
        {download
          ? "Your connection may have dropped. Check your signal, then reload — your cart is safe."
          : "Something went wrong on this page. The rest of the app still works."}
      </p>
      {!download && <button onClick={reset}>Try again</button>}{" "}
      <button onClick={() => window.location.reload()}>Reload the page</button>{" "}
      <Link to="/menu">Back to the menu</Link>
    </div>
  );
}

export function MenuUnavailable({ reset }) {
  return (
    <div className="main-c" role="alert">
      <h2>The menu is unavailable right now</h2>
      <p>We couldn&apos;t show the dishes. Your cart and your order are not affected.</p>
      <button onClick={reset}>Try again</button> <Link to="/cart">Go to my cart</Link>
    </div>
  );
}

export function CartUnavailable({ reset }) {
  return (
    <div className="main-c" role="alert">
      <h2>Your order couldn&apos;t be shown</h2>
      <p>Your items are still saved. You can keep browsing, or go straight to checkout.</p>
      <button onClick={reset}>Try again</button> <Link to="/checkout">Go to checkout</Link>
    </div>
  );
}
