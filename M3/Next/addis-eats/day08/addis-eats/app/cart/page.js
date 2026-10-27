"use client";
import { useCart } from "../components/CartProvider";   
import DishCard from "../components/DishCard";
export default function Cart(){
   
   const {cart}= useCart();
    return(
        <div>
  <h2>    Cart Page </h2>
  {cart.length===0?(
    <p>Your cart is empty</p>
  ):(
    <ul>
        {cart.map((dish)=>
         <DishCard key={dish.id} dish={dish} />
        )}
    </ul>
  )}
        </div>
    );
}