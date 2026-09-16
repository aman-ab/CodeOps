import React from "react";
import "../css/style.css";
import  Card from "./Card";
import { useState } from "react";
function Dish({name, price, catagory,isspicy,currency="ETB", onAdd}){
//    let count =0;
// function add(){
//     count =count + 1;
//     console.log(count);
//    }

    // const [count, setCount] = useState(0);
    // function add(){
    //     setCount(count +1);
    // }
  return(
<div className="card">
    <Card>
      <h2>{name}</h2>
      <p>{price}{currency}</p>
      <p>{catagory}</p>
      {/* <p>{isspicy ? "spicy":"Not spicy"}</p> */}
      <p>{isspicy && <em> spicy🌶️ </em> }</p>
      <button onClick={() => onAdd(price)}>ADD </button>
      {/* <p> Quantity:{count} </p> */}
    </Card>
</div>
 );
}
export default Dish;

