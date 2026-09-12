import React from "react";
import "../css/style.css";
import  Card from "./Card";

function Dish({name, price, catagory,isspicy,currency="ETB"}){

  return(
<div className="card">
    
 <h2>{name}</h2>
      <p>{price}{currency}</p>
      <p>{catagory}</p>
      {/* <p>{isspicy ? "spicy":"Not spicy"}</p> */}
      <p>{isspicy && <em> spicy🌶️ </em> }</p>
    
  
     
</div>
 );
}
export default Dish;

