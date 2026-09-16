import { useState } from "react";


function OrderForm() {
    const[name, setName]=useState("");
  return (
    <div>
        <h1>customer information </h1>
        <label> name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <p>your name is :{name}</p>    
    </div>
  )
}

export default OrderForm