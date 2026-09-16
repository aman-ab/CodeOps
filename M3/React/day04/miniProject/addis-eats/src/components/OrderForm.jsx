import { useState } from "react";


function OrderForm() {
    const[form, setForm]=useState({
      name: " ",
      phone: " ",
      area: "summit",
});
function handelform(e){
  const {name,value} =e.target;
  // setName(form.name=target.value);
  setForm({
    ...form,
    [e.target.name]:e.target.value,
  });
}
function handlesubmit(e){
  e.preventDefault();
  console.log(form);
  alert(`order submiited ${form.name}, ${form.area}`)
  if(!/^\d{10}$/.test(form.phone)){
    return console.log("invalid phone")
  }
}
  return (
    <div>
        <h1>Customer Information </h1>
        <form onSubmit={handlesubmit}> 

       
        <label htmlFor="name"> Name:</label>
        <input name= "name" value={form.name} onChange={handelform} />
        <p>your name is :{form.name}</p>
    
        <label htmlFor="phone"> Phone:</label>
        <input name ="phone" value={form.phone} onChange={handelform} />
        <p>your Phone is :{form.phone}</p> 
       
        <label htmlFor="name">area:</label>
        <select name="area" value={form.area} onChange={handelform} >
          <option> summit</option>
          <option> cmc</option>
          <option> bole</option>
          <option> 22</option>
        </select> 
        <button type="submit">submit</button>
        </form>    
    </div>
  )
}

export default OrderForm