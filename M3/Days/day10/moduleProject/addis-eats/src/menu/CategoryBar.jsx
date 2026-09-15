import  "../css/style.css";
const CATEGORIES = ["All", "Main Dish", "Side Dish", "Beverage"];

function CategoryBar({ selected, onSelectCategory }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={category === selected ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
