"use client";
import { useState } from "react";
export default function ChForm() {
 const [form , setForm] = useState({
     name: "",
     phone: "",
     dishId: "1",
     quantity: 1
 });   
 const [serverError, setServerError] = useState(null);  
 const [message, setMessage] = useState(null);  


 async function handleSubmit(e){   
     e.preventDefault();
     const response = await fetch("/api/dishes/orders", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            dishId: form.dishId,
            quantity: form.quantity 
         }),
     });
     const data = await response.json();
     
     if (response.status === 422) {
         const data = await response.json();    
        setServerError(data.error);
        return;
     }

     if (!response.ok) {
         setMessage("something went wrong");
         return;
     }
     const order = await response.json();
     setMessage(`order ${order.id} created successfully`);
 }
 return (
    
        <form onSubmit={handleSubmit}>
            <div> 
             <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {serverError.name && <p style={{ color: "red" }}>{serverError.name}</p>}
            </div>

            <div>
            <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />  
            
            {serverError.phone && <p style={{ color: "red" }}>{serverError.phone}</p>}
            </div>
           <div>
               <input
                   type="text"
                   placeholder="Dish ID"
                   value={form.dishId}
                   onChange={(e) => setForm({ ...form, dishId: e.target.value })}
               />
               {serverError.dishId && <p style={{ color: "red" }}>{serverError.dishId}</p>}
           </div>
           
           <div>
<input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            </div>
            
            <button type="submit">Submit</button>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </form>
       
 );
}