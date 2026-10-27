"use client";
import { useState } from "react";
export default function CategoryFilter({categories}){
    const [selectedCategory, setSelectedCategory ]=useState(
        "all"
    )
    return(
<div>
    <h2>Selected Category </h2>
    {categories.map(category=>(
    <button key={category} onClick={()=>setSelectedCategory(category)}>{category} </button>
    ))}
</div>
)
}