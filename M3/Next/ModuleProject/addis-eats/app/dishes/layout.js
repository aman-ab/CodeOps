export default function DishLayout({ children }) {
  return (
    <div>
      <aside>
        <h2>Dish Categories</h2>
        <ul>
          <li>All</li>
          <li>Main Dishes</li>
          <li>Side Dishes</li>
          <li>Bevarages</li>
        </ul>
          </aside>
          <main>
         {children}
          </main>
     
    </div>
  );
}
