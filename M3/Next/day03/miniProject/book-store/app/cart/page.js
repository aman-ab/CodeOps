"use client"
import { useCart } from "../components/CartProvider"
export default function Cart(){
    const {cart}= useCart();
    return(
        <div>
            <h1>Your Cart Page</h1>
            {cart.length === 0 ?(
                <p>your cart is empty</p>
            ):(
                <ul>
                    {cart.map((book)=>{
                        <li key={book.id}>
                            <h2>{book.title}</h2>
                            <p>{book.description}</p>
                            <p> Price: ${book.price}</p>
                        </li>
                    })}
                 </ul>
            )

            }
            
        </div>
    );
}