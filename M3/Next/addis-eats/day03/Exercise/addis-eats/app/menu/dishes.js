// server-side data helper — lives in app/menu/ but creates NO route
const dishes = [
  { id: "kitfo", name: "Kitfo", price: 280, category: "Mains" },
  { id: "shiro", name: "Shiro", price: 150, category: "Vegan" },
  { id: "tibs", name: "Doro Tibs", price: 260, category: "Mains" },
  { id: "firfir", name: "Firfir", price: 120, category: "Breakfast" },
];

export async function getDishes() {
  await new Promise((r) => setTimeout(r, 1500)); // simulated slow query — delete in real life
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id);
}
