 import React from 'react'
  import Dish from './Dish';
  const dishes = [
    {
      id: 1,
      name: "Chicken Rice",
      price: 250,
    },
    {
      id: 2,
      name: "Pasta",
      price: 180,
    },
    {
      id: 3,
      name: "Burger",
      price: 200,
    },
  ];
  
 
 function Header() {
    return (
        <div className="container">
      <div className="dish-container">
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </div>
    </div>
      
    )
  }
  export default Header;