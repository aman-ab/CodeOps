// import { dishes } from "@/app/data/dishes";
import { getDishesById}from "@/lib/dishes";
import { getReviewsByDishId } from "@/lib/dishes";
export default async function SingleDish({params}){
    const {id}= await params;
    // const dish = await getDishesById(id);
    // const reviews = await getReviewsByDishId(id);

    const [dish, reviews] = await Promise.all([
         getDishesById(id), getReviewsByDishId(id) ]);
    return(
        <div>
            <h1>{dish.name}</h1>
            <p>{dish.category}</p>
            <p>{dish.price}</p>
            <p>{dish.description}</p>
            {dish.isspicy &&(
                <p>
                    <em>
                        spicy
                    </em>
                </p>
            )}
            <div>
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <h3>{review.reviewer}</h3>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}