import Link from "next/link";
export default function DishCard({dish}){
    return(
        <div>
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
    );
}