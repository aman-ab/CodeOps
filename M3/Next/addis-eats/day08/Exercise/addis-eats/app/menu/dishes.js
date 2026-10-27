// `alt` describes what the REAL photo shows. The shipped images are placeholders: when you swap in
// your own photographs, check each alt still matches.
// server-side data helper — lives in app/menu/ but creates NO route
const dishes = [
  { id: "kitfo", name: "Kitfo", price: 280, category: "Mains", alt: "Kitfo: finely minced beef with spiced butter, served with injera" },
  { id: "shiro", name: "Shiro", price: 150, category: "Vegan", alt: "Shiro: a thick chickpea stew served on injera" },
  { id: "tibs", name: "Doro Tibs", price: 260, category: "Mains", alt: "Doro tibs: sautéed chicken pieces with onions and peppers" },
  { id: "firfir", name: "Firfir", price: 120, category: "Breakfast", alt: "Firfir: shredded injera stir-fried in a spiced sauce" },
  { id: "key-wot", name: "Key Wot", price: 240, category: "Mains", alt: "Key wot: a spicy red beef stew" },
  { id: "doro-wot", name: "Doro Wot", price: 300, category: "Mains", alt: "Doro wot: chicken stew with a boiled egg in red berbere sauce" },
  { id: "misir", name: "Misir Wot", price: 140, category: "Vegan", alt: "Misir wot: a spicy red lentil stew" },
  { id: "gomen", name: "Gomen", price: 130, category: "Vegan", alt: "Gomen: collard greens cooked with garlic and ginger" },
  { id: "dulet", name: "Dulet", price: 220, category: "Mains", alt: "Dulet: minced tripe, liver and beef fried with spices" },
  { id: "ful", name: "Ful", price: 110, category: "Breakfast", alt: "Ful: stewed fava beans topped with onion and tomato" },
  { id: "chechebsa", name: "Chechebsa", price: 125, category: "Breakfast", alt: "Chechebsa: flatbread pieces fried in spiced butter" },
  { id: "sambusa", name: "Sambusa", price: 60, category: "Snacks", alt: "Sambusa: crisp triangular pastries with a spiced filling" },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id);
}
