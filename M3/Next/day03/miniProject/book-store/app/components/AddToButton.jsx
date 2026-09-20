"use client"
import { useState } from "react"
import { useCart } from "./CartProvider"
export default function AddToCart(book){
    const{addToCart, removeFromCart}=useCart()
    const [isAdded,setIsAdded]=useState(false)

    function handelAddToCart(){
       
        if(!isAdded){
          setIsAdded(true)
         addToCart({book})}
        else{
            setIsAdded(false)
        removeFromCart(book.id)}
       
    }
    return( 
        <div>
       <button onClick={handelAddToCart}>
        {isAdded? "Added to Cart":"Remove"}
       </button>
        </div>
    )
}