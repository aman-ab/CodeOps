"use client"; // next/dynamic with ssr:false is only allowed in a client component
import dynamic from "next/dynamic";

// Leaflet touches `window` the moment it is imported, so it can only ever load in the browser.
// `ssr: false` is not an optimisation here: it is the only way the library can load at all.
// The placeholder is EXACTLY the map's height (h-80 = 320px), so the page does not jump when the map arrives.
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div role="status" aria-label="Loading map" className="h-80 w-full animate-pulse rounded bg-stone-200" />,
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}
