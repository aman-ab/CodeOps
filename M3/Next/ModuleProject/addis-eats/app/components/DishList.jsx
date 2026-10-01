import { dishes } from "../data/dishes";
import DishCard from "./DishCard";
export default async function DishList({dishes}) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <div>
            {dishes.map((dish)=>(
                <DishCard key={dish.id} dish={dish}/>
            ))}

         </div>
        
    )
}