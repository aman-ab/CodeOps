import CartView from "../components/CartView";

export const metadata = {
  title: "Your cart",
  description: "Review the dishes in your cart before checking out.",
};

export default function CartPage() {
  return (
    <div className="page">
      <h1 className="page-title">Your cart</h1>
      <p className="page-subtitle">Change quantities or remove dishes, then head to checkout.</p>

      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
