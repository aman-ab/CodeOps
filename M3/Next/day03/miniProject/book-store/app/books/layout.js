"use client";

//CLIENT SIDE REDNDERING
//BECAUSE THIS IS  A LAYOUT COMPONENET
//IT HAS RELATED TO STATE MANAGMENT AND 
//INTRACTIVITY
import { useState } from "react";
export default function BooksLayout({children}) {
   const [category, setCategory] = useState("All");
    return (
    <div className="book-layout">
      <aside>
        <h2>Books</h2>
        <ul>
            <li> All Books</li>
            <li> Fiction</li>
            <li> Non-Fiction</li>
            <li> Science Fiction</li>
            <li> Fantasy</li>
            </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}
