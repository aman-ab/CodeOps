

import {Suspense} from "react";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import FilterShell from "../components/FilterShell";
import {getDishes} from "../../lib/dishes";
import SearchBox from "./SearchBox";
import PaginatedDishes from "./PaginatedDishes";




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
            <h2>Search Box </h2>
            <SearchBox />
            <h2> Paginatd dishes </h2>
            <PaginatedDishes />
        </div>
    )
}