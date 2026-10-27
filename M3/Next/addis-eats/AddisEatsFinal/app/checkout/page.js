import { redirect } from "next/navigation";
import ChForm from "../components/ChForm";
import { getSession } from "../../lib/session";

export const metadata = {
  title: "Checkout",
  description: "Confirm your delivery details and place your order.",
};

export default async function CheckoutPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/checkout");
  }

  return (
    <div className="page">
      <h1 className="page-title">Checkout</h1>
      <p className="page-subtitle">Tell us where to deliver. You pay in cash when the food arrives.</p>

      <div className="mt-8">
        <ChForm defaultName={user.name} />
      </div>
    </div>
  );
}
