import React from "react";
import Dish from "./Dish";
import {useState,useEffect} from "react";
import OrderForm from "./OrderForm";
import CategoryBar from "./CategoryBar";


   function Main(){

const[total,setTotal] = useState(0);
const[catagory,setCatagory] = useState("All");
const[menu ,setMenu]= useState([]);
const[error,setError]=useState(null);
const[loading,setLoading]=useState(true);

 useEffect(()=>{
    async function fetchData() {
      try{
      const response = await fetch("menu.json");
      const data = await response.json();
      console.log(data);
      setMenu(data.items);
      setLoading(false);
    } catch(error){
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }finally{setLoading(false);}
  }
  fetchData();
 }, []);
//   const shown = catagory ==="All"?menu:catagory==="main course"?mainCat:catagory==="side Dish"?sideCat:bivCat;

function addorder (price){
  setTotal(total+price);
}
    return ( <div className="main-c">
  

   <p>Total: {total}</p>
   <h2>Dishes</h2>
   <CategoryBar onSelectCategory={setCatagory} />
  <div className="card-container">
     
     {menu.map((item) => (
        <Dish key={item.id} 
        {...item} onAdd={addorder} 
        />
           ))}
     
  </div>

   <OrderForm></OrderForm>

   
    </div>
);
   }
export default Main