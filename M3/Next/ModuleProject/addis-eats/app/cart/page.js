"use client";
import { useCart } from "../components/CartProvider";
import DishCard from "../components/DishCard";
export default function Cart(){
    const { cart} = useCart();

    return(
        <div>
  <h1> Cart Page </h1>
  <p>Review the items in your cart</p>

  {cart.length === 0 ? "Your cart is empty" : "Items in your cart:"}
  <ul>
    {cart.map((dish) => (
      <DishCard key={dish.id} dish={dish} />
    ))}
  </ul>
        </div>
    );
}