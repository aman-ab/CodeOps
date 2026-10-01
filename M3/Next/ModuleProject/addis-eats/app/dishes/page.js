import {Suspense} from "react";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";
import { dishes } from "../data/dishes";
import CategoryFilter from "../components/CategoryFilter";


 export default  function Dishes(){
   
    return (
        <div>
            <h1>Our Dishes</h1>
            <CategoryFilter categories={["All",
                ...new Set(dishes.map((dish)=>dish.catagory)),
            ]}/>
            <Suspense fallback={<DishSkeleton/>}>
                <DishList dishes ={dishes}/>
            </Suspense>
        </div>
    )
}