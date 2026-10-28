import { lerp } from "./geo";

// DEMO: nobody is carrying a GPS phone. The courier's position is SIMULATED from the order's age:
// at the kitchen while the order is placed/being prepared, then a straight line to the delivery point during
// "on the way" (real roads are not straight), then at the door. Swap trackingFor() for a real location feed later;
// the page, the stream and the map only ever see the shape it returns.
export const STAGE_SECONDS = { preparing: 20, on_the_way: 45, delivered: 90 }; // when each stage begins / ends

// Approximate centres of the four delivery areas (the order has an AREA, not a street address, so the delivery
// pin is the middle of the area). Latitude first.
export const AREA_CENTRES = {
  Bole: { lat: 8.995, lng: 38.7896 },
  Piassa: { lat: 9.0357, lng: 38.7498 },
  Kazanchis: { lat: 9.0153, lng: 38.7664 },
  Megenagna: { lat: 9.0198, lng: 38.8006 },
};
export const KITCHEN = { name: "Addis Eats kitchen, near Meskel Square", lat: 9.0106, lng: 38.7612 };

const round = (p) => ({ lat: Math.round(p.lat * 1e5) / 1e5, lng: Math.round(p.lng * 1e5) / 1e5 });
const clamp01 = (n) => Math.min(1, Math.max(0, n));

export function trackingFor(order, now = Date.now()) {
  const centre = AREA_CENTRES[order.area] ?? AREA_CENTRES.Bole;
  const ageSeconds = (now - Date.parse(order.createdAt)) / 1000;
  const travelled = order.status === "cancelled"
    ? 0
    : clamp01((ageSeconds - STAGE_SECONDS.on_the_way) / (STAGE_SECONDS.delivered - STAGE_SECONDS.on_the_way));

  return {
    delivery: { area: order.area, ...round(centre) },
    courier: round(lerp(KITCHEN, centre, travelled)),
    kitchen: { name: KITCHEN.name, ...round(KITCHEN) },
    arrivesAt: new Date(Date.parse(order.createdAt) + STAGE_SECONDS.delivered * 1000).toISOString(),
  };
}
