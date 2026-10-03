"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
export default function AddToCartButton({dish}){
    const{addToCart,removeFromCart}=useCart();

    const [isAdded, setIsAdded]= useState(false); 
function handleClick(){
    if(!isAdded){
        setIsAdded(true);
        addToCart({dish});
    }else{
        setIsAdded(false);
        removeFromCart(dish.id);
    }
}
    return(
        <div>
            <button onClick={handleClick}>
 {isAdded?"Remove":"Add to Cart"}
                </button>
        </div>
    );
}