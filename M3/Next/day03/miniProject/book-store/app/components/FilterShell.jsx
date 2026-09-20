"use client";
import { useState } from "react";

export default function FilterShell({children}){
    const [showBooks ,setShowBooks]=useState(false);

    return(
        <div>
            <button onClick={()=> setShowBooks(!showBooks)}>
                {showBooks? "Hide Book" : "Show Books"} </button>
              {showBooks && children}
        </div> 
    )
}