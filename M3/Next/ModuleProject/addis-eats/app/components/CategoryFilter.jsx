"use client";
import { useState } from "react";
export default function CategoryFilter({categories}){
  const [selectedCategory , setSelectedCategory]= useState("All");
    return(
        <div>
            <p> Filter</p>
          {categories.map((cat)=>(<button key={cat}
           onClick={()=>setSelectedCategory(cat)}>
            {cat}
          </button>))}

        </div>
    );
}