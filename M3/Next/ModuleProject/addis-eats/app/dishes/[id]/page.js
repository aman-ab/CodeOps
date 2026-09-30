import { dishes } from "@/app/data/dishes";
import { notFound } from "next/navigation";
export default async function SingleDish({params}){
    const {id}= await params;
    const dish = dishes.find((dish)=>dish.id=== parseInt(id));
    if(!dish){
       notFound();
    }
    return(
        <div>
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
        </div>
    );
}