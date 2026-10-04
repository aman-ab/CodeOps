import { getDishById,getReviewsByDishId } from "../../../lib/dishes";
import { notFound } from "next/navigation";
export default async function SingleDish({params}){
    const {id}= await params;
    // STREAMING DATA FEATCHING
    // const dish = await getDishById(id);
    // const reviews = await getReviewsByDishId(id);
    
    const [dish, reviews] = await Promise.all([
        getDishById(id),
        getReviewsByDishId(id)
    ])
    if(!dish){
       notFound();
    }
    return(
        <div>
            <h2>Dishes</h2>
         <h1>{dish.name}</h1>
         <p>{dish.catagory}</p>
         <p>{dish.price}</p>
         <p>{dish.description}</p>
         {dish.isspicy &&(
            <p>
                <em>
                    spicy
                </em>
            </p>
         )}
         <h3>Reviews</h3>
         <ul>
             {reviews.map((review) => (
                 <li key={review.id}>
                     <strong>{review.user}</strong>: {review.comment} <em>({review.rating} stars)</em>
                 </li>
             ))}
         </ul>
        </div>
    );
}