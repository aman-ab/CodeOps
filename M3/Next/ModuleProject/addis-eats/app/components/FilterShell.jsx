"use client";
import { useState } from "react";
export default function  FilterShell ({children}){
    const [showBooks,setShowBooks]= useState(true);

    return(
        <div>
            <button onClick={()=>setShowBooks(!showBooks)}>
             {showBooks?"Hide":"Show"}
            </button>
            {showBooks&& children}
        </div>
    );
}