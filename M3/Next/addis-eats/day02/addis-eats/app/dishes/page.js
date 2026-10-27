import Link from "next/link"
import { dishes } from "../data/dishes"

export default async function Dishes(){
    await new Promise((resolve)=>setTimeout(resolve,2000));
    return (
        <div> 
            <h1>Our  dishes </h1>
            {dishes.map((dish)=>(
                <div key={dish.id}>
                    <h2>{dish.name}</h2>
                    <p>{dish.catagory}</p>
                    <p>{dish.price}</p>
                    <p>{dish.description}</p>
                    {dish.isspicy && (
                        <p>
                        <em>spicy 🌶️</em>
                        </p>
                    )}
                    <Link href={`/dishes/${dish.id}`}>View Details</Link>
                    </div>
            ))}
        </div>
    )
}