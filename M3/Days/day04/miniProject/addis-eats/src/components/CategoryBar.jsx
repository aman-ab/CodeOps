import React from 'react'

function CategoryBar({ onSelectCategory }) {
    const categories = ["All", "main course", "side Dish", "beverage"];
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar