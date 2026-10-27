import DishCard from "../components/DishCard";

export default async function DishList({dish}) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <div>
            {dish.map((dish)=>(
               <DishCard key={dish.id} dish={dish} />   
            ))}

         </div>
        
    )
}