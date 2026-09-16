import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { useMenu } from "../hooks/useMenu";

function Menu() {
  const { menu, loading, error } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();

  // The filter lives in the URL (?category=...) rather than local state --
  // it survives a refresh and the page is shareable/bookmarkable.
  const catagory = searchParams.get("category") || "All";

  function handleSelectCategory(next) {
    if (next === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: next });
    }
  }

  // Recomputed only when the menu or the category actually change.
  const shown = useMemo(
    () => (catagory === "All" ? menu : menu.filter((item) => item.catagory === catagory)),
    [menu, catagory]
  );

  if (loading) return <p className="page">Loading menu...</p>;
  if (error) return <p className="page">Something went wrong loading the menu. Please try again.</p>;

  return (
    <div className="page">
      <h2>Menu</h2>
      <CategoryBar selected={catagory} onSelectCategory={handleSelectCategory} />
      <DishList dishes={shown} />
    </div>
  );
}

export default Menu;
