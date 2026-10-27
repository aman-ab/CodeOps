// server-side data helper — lives in app/menu/ but creates NO route
const dishes = [
  { id: "kitfo", name: "Kitfo", price: 280, category: "Mains" },
  { id: "shiro", name: "Shiro", price: 150, category: "Vegan" },
  { id: "tibs", name: "Doro Tibs", price: 260, category: "Mains" },
  { id: "firfir", name: "Firfir", price: 120, category: "Breakfast" },
  { id: "key-wot", name: "Key Wot", price: 240, category: "Mains" },
  { id: "doro-wot", name: "Doro Wot", price: 300, category: "Mains" },
  { id: "misir", name: "Misir Wot", price: 140, category: "Vegan" },
  { id: "gomen", name: "Gomen", price: 130, category: "Vegan" },
  { id: "dulet", name: "Dulet", price: 220, category: "Mains" },
  { id: "ful", name: "Ful", price: 110, category: "Breakfast" },
  { id: "chechebsa", name: "Chechebsa", price: 125, category: "Breakfast" },
  { id: "sambusa", name: "Sambusa", price: 60, category: "Snacks" },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id);
}
