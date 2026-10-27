"use client";

import { useCart } from "./useCart";
import QuantityStepper from "./QuantityStepper";

export default function AddToCartButton({ dish, large = false }) {
  const { ready, getQuantity, addToCart, setQuantity } = useCart();

  const quantity = ready ? getQuantity(dish.id) : 0;

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addToCart(dish)}
        className={`btn btn-primary ${large ? "" : "btn-sm"}`}
      >
        Add to cart
      </button>
    );
  }

  return (
    <QuantityStepper
      quantity={quantity}
      name={dish.name}
      onChange={(next) => setQuantity(dish.id, next)}
    />
  );
}
