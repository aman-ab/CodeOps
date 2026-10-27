import Link from "next/link"
import AddToCartButton from "./AddToCartButton"
import Image from "next/image"
export default function DishCard({dish}){
 return(
    <div id="dish-item">
        <Image src={dish.image} alt={dish.name} width={200} height={200}/>
         <h2>{dish.name}</h2>
                    <p>{dish.category}</p>
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