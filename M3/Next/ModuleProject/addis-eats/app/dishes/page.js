import {Suspense} from "react";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import FilterShell from "../components/FilterShell";
import {getDishes} from "../../lib/dishes";

 export default async  function Dishes(){

    const dishes = await getDishes();
    return (
        <div>
            <h1>Our Dishes</h1>
            <CategoryFilter categories={["All",
                ...new Set(dishes.map((dish)=>dish.catagory)),
            ]}/>
            <Suspense fallback={<DishSkeleton/>}>
                <FilterShell>
                <DishList dishes ={dishes}/>
                </FilterShell>
            </Suspense>
        </div>
    )
}