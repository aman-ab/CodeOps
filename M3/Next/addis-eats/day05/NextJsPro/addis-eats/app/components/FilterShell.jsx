"use client";
import { useState } from "react";


export default function FilterShell({children}){
    const [showDish, setShowDish]=useState(true);
    return(
        <div>
            <button onClick={()=>setShowDish(!showDish)}>
                {!showDish?"Show Dishes":"Hide Dishes"}</button>
        {showDish && children}
        </div>
    )
}