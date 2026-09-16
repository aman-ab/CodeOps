import React from "react";
import Dish from "./Dish";
import Card from "./Card";
import {useState} from "react";
import OrderForm from "./OrderForm";

const menu =[
   {
      id:"1",
      name :"Doro wot",
       price :152,
       catagory:"main course",
      isspicy:true},
   
      {id:"2",
       name :"injera",
        price:152,catagory:"main course",isspicy:false},
   
      {id:"3",name :"shiro wot ", price :152,catagory:"main course",isspicy:true},

      {id:"4", name :"Doro wot", price :152,catagory:"main course",isspicy:false},
 
      {id:"5",name :"injera", price:152,catagory:"main course",isspicy:true},
  
      {id:"6", name :"shiro wot ", price :156,catagory:"side Dish",isspicy:true},
   
    
      {id:"7",name :"Doro wot", price :100, catagory:"main course",isspicy:false},
   
   
      {id:"8",name :"injera", price:140,catagory:"main course",isspicy:false},
  
      {id:"9",name :"shiro wot ", price :160,catagory:"main course",isspicy:true},
   
      {id:"10", name :"Doro wot", price :110,catagory:"main course",isspicy:false},
   
      {id:"11",name :"injera", price:152,catagory:"main course",isspicy:true},
   
      {id:"12", name :"Ambo ", price :152,catagory:"side Dish",isspicy:false

   }];
   


   let mainCat = menu.filter((item)=>item.catagory==="main course");
   let sideCat = menu.filter((item)=>item.catagory==="side Dish");
   let bivCat = menu.filter((item)=>item.catagory==="beaverage");
 
   function Main(){

const[total,setTotal] = useState(0);

function addorder (price){
  setTotal(total+price);
}
    return ( <div className="main-c">
  <p>hello react . this is my first react app</p>

   <p>total: {total}</p>
   <h2>Main courses</h2>
  <div className="card-container">
     
     {mainCat.map((item) => (
        <Dish key={item.id} 
        {...item} onAdd={addorder} 
        />
           ))}
          
     <h2>Side dish</h2>
     <div className="card-container">
   
     {sideCat.map((item) => (
        <Dish key={item.id} 
        {...item} onAdd={addorder} 
        />
           ))}
  </div>
  <h2> beaverage</h2>
   <div className="biv-container">
      {bivCat.length===0? 
      <p> there is no  amount of beaverage</p>
      :
      bivCat.map((item)=>(
      <Dish key={item.id}
       {...item} onAdd={addorder} />))}
    
    </div>
      <OrderForm></OrderForm>
      <Card>
      </Card>
    </div>
    </div>
);
   }
export default Main