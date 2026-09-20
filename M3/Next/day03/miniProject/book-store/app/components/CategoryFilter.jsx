"use client"
import { useState } from "react";
export default function CategoryFilter({categories}){

const [filter, setFilter]= useState("all")
    return(
        <div>
        <h1> Category Filter</h1>
        {categories.map((cat)=><button key ={cat} onClick={()=>setFilter(cat)}> {cat} </button>)}
        
       </div>
    );
}