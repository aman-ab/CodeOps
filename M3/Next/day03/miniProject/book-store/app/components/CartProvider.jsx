" use client";
import {createContext, useContext, useState} from "react"

const CartContext= createContext(null);
export default function CartProvider({children}){
 const [cart, setCart]= useState([]);

  function addToCart({book}){
   setCart((prevCart)=>[...prevCart,book]);
  }

  function removeFromCart(){
    setCart((prevCart)=>prevCart.filter((book) => book.id !==bookId));
  }
  function clearCart(){
   setCart([]);
  }

    return(
       <CartContext.Provider
       value= {(cart, addToCart, removeFromCart, clearCart)}>
        {children}
       </CartContext.Provider>
    );
}
export function useCart(){
    return useContext(CartContext);
}