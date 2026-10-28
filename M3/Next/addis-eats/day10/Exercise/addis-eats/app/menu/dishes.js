import { cache } from "react";

// `alt` describes what the REAL photo shows. The shipped images are placeholders: when you swap in
// your own photographs, check each alt still matches.
// `summary` is written for a person: it feeds the page text, the meta description and the JSON-LD.
// server-side data helper — lives in app/menu/ but creates NO route
const dishes = [
  { id: "kitfo", name: "Kitfo", price: 280, category: "Mains", alt: "Kitfo: finely minced beef with spiced butter, served with injera", summary: "Finely minced beef warmed in spiced butter and mitmita, served with injera." },
  { id: "shiro", name: "Shiro", price: 150, category: "Vegan", alt: "Shiro: a thick chickpea stew served on injera", summary: "A thick, smooth chickpea stew with garlic and berbere, served on injera." },
  { id: "tibs", name: "Doro Tibs", price: 260, category: "Mains", alt: "Doro tibs: sautéed chicken pieces with onions and peppers", summary: "Tender chicken pieces sautéed with onion, pepper and rosemary." },
  { id: "firfir", name: "Firfir", price: 120, category: "Breakfast", alt: "Firfir: shredded injera stir-fried in a spiced sauce", summary: "Shredded injera tossed in a spiced berbere sauce, a classic Ethiopian breakfast." },
  { id: "key-wot", name: "Key Wot", price: 240, category: "Mains", alt: "Key wot: a spicy red beef stew", summary: "Beef slowly simmered in a spicy red berbere sauce." },
  { id: "doro-wot", name: "Doro Wot", price: 300, category: "Mains", alt: "Doro wot: chicken stew with a boiled egg in red berbere sauce", summary: "Chicken and a boiled egg in a rich, slow-cooked red berbere stew." },
  { id: "misir", name: "Misir Wot", price: 140, category: "Vegan", alt: "Misir wot: a spicy red lentil stew", summary: "Red lentils simmered with berbere, garlic and onion until thick and spicy." },
  { id: "gomen", name: "Gomen", price: 130, category: "Vegan", alt: "Gomen: collard greens cooked with garlic and ginger", summary: "Collard greens cooked down with garlic, ginger and a little oil." },
  { id: "dulet", name: "Dulet", price: 220, category: "Mains", alt: "Dulet: minced tripe, liver and beef fried with spices", summary: "Minced tripe, liver and beef fried in butter with chilli and spices." },
  { id: "ful", name: "Ful", price: 110, category: "Breakfast", alt: "Ful: stewed fava beans topped with onion and tomato", summary: "Stewed fava beans topped with chopped onion, tomato and green chilli." },
  { id: "chechebsa", name: "Chechebsa", price: 125, category: "Breakfast", alt: "Chechebsa: flatbread pieces fried in spiced butter", summary: "Pieces of flatbread fried in spiced butter and served with honey or berbere." },
  { id: "sambusa", name: "Sambusa", price: 60, category: "Snacks", alt: "Sambusa: crisp triangular pastries with a spiced filling", summary: "Crisp triangular pastry filled with spiced lentils or meat." },
];

export const DISHES = dishes; // synchronous access for the demo-data seed

export async function getDishes() {
  return dishes;
}

// React cache(): generateMetadata, the page and the OG image all ask for the same dish in one request,
// and a plain function (unlike fetch) is only deduplicated if we say so.
export const getDish = cache(async (id) => dishes.find((d) => d.id === id));
