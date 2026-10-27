import { DISHES } from "../app/menu/dishes";
import { AREAS } from "./areas";

// DEMO DATA so the dashboard has something to show. Only used when SEED_DEMO_DATA=true.
// Deterministic (seeded random numbers), so you get the same orders every run.
// Abebe (usr_1) owns about 40% of them; the rest belong to customers who cannot sign in.
// Almaz (usr_2) and Kebede (usr_3) have none: sign in as Almaz to see a brand-new customer's empty state.
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PEOPLE = [
  { userId: "usr_1", name: "Abebe", phone: "0911000001", weight: 0.4 },
  { userId: "usr_101", name: "Hana", phone: "0911555101", weight: 0.2 },
  { userId: "usr_102", name: "Dawit", phone: "0911555102", weight: 0.15 },
  { userId: "usr_103", name: "Selam", phone: "0911555103", weight: 0.15 },
  { userId: "usr_104", name: "Yonas", phone: "0911555104", weight: 0.1 },
];
const AREA_WEIGHTS = [0.35, 0.2, 0.25, 0.2]; // Bole, Piassa, Kazanchis, Megenagna (same order as AREAS)

const pick = (rand, items, weights) => {
  let r = rand(), i = 0;
  while (i < items.length - 1 && r >= weights[i]) r -= weights[i++];
  return items[i];
};

export function buildDemoOrders(now = new Date(), count = 72) {
  const rand = mulberry32(46);
  const orders = [];

  for (let i = 0; i < count; i++) {
    // sqrt skews towards recent days: the line trends upwards
    const daysAgo = Math.floor(14 * (1 - Math.sqrt(rand())));
    let createdAt = new Date(now.getTime() - daysAgo * 86_400_000);
    createdAt.setUTCHours(9 + Math.floor(rand() * 12) - 3, Math.floor(rand() * 60), 0, 0); // 09:00–20:59 Addis time
    if (createdAt > now) createdAt = new Date(now.getTime() - (1 + rand() * 3) * 3_600_000);

    const person = pick(rand, PEOPLE, PEOPLE.map((p) => p.weight));
    const area = pick(rand, AREAS, AREA_WEIGHTS);

    const pool = [...DISHES];
    const lines = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => {
      const dish = pool.splice(Math.floor(rand() * pool.length), 1)[0];
      return { id: dish.id, name: dish.name, price: dish.price, qty: 1 + Math.floor(rand() * 3) };
    });

    orders.push({
      userId: person.userId,
      name: person.name,
      phone: person.phone,
      area,
      items: lines,
      total: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      currency: "ETB",
      cancelled: rand() < 0.06,
      createdAt: createdAt.toISOString(),
    });
  }
  return orders;
}
