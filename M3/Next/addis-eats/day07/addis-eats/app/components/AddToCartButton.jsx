"use client";
import { useState } from "react";
import {useCart} from "./CartProvider";
export default function AddToCartButton({dish}){
const [isAdded, setIsAdded]=useState(false);
const {addToCart, removeFromCart} = useCart();

function handleAddToCart(){
    if(!isAdded){
        setIsAdded(true);
      addToCart(dish);
    }else{
         setIsAdded(false);
        removeFromCart(dish.id);
    }
}
    return(
        <button onClick={handleAddToCart}>{isAdded?"Remove":"AddToCart"}

        </button>
    )
}