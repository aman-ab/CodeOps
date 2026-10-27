import Link from "next/link"
import AddToCartButton from "./AddToCartButton"
export default function DishCard({dish}){
 return(
    <div id="dish-item">
         <h2>{dish.name}</h2>
                    <p>{dish.catagory}</p>
                    <p>{dish.price}</p>
                    <p>{dish.description}</p>
                    {dish.isspicy && (
                        <p>
                        <em>spicy 🌶️</em>
                        </p>
                    )}
                    <Link href={`/dishes/${dish.id}`}>View Details</Link> <br/>
                    <AddToCartButton dish={dish}/>
    </div>
 )
}