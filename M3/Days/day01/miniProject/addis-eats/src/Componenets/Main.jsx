import React from 'react'
import Dish from './Dish';
import "../css/style.css";
const menu = [
  { id:"1",name: "Doro Wat", price: 240 },
  { id:"2",name: "Shero Wat", price: 240 },
  { id:"3",name: "Key Wat", price: 240 }
];

function Main() {
  return (
    <div>
        <p> Hello react it is my first time to using React</p>
      {menu.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </div>
  )
}


  

export default Main