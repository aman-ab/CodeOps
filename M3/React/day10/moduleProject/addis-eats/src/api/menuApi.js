// One fetch helper per resource -- Menu and DishDetail both call this
// through the useMenu hook instead of each writing their own fetch call.
export async function fetchMenu() {
  const response = await fetch("/menu.json");
  if (!response.ok) {
    throw new Error(`Failed to load menu (status ${response.status})`);
  }
  const data = await response.json();
  return data.items;
}
