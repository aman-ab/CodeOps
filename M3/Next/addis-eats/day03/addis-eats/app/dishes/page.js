

import {Suspense} from "react";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import FilterShell from "../components/FilterShell";
import {getDishes} from "../../lib/dishes";




 export default  async function Dishes(){
   const dishes = await  getDishes();
    return (
        <div>
            <h1>Our Dishes</h1>
             <CategoryFilter categories ={[
                "all",
              ...new Set(dishes.map((dish)=>dish.category))
             ]}/>
             <Suspense fallback={<DishSkeleton />}>
             <FilterShell>
             <DishList dish={dishes} />
             </FilterShell>
               
            </Suspense>
        </div>
    )
}