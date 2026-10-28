"use client"; // only ever loaded by MapPanel, in the browser (ssr: false)
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // without this the tiles render scrambled

// Letters, not just colours: "C" courier, "D" delivery. Built with divIcon, so there are no image files for the
// bundler to lose (Leaflet's default marker images are the classic broken-pin bug in Next.js).
const pin = (letter, background) =>
  L.divIcon({
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
    html: `<div style="width:34px;height:34px;border-radius:50%;background:${background};color:#fff;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font:700 14px system-ui">${letter}</div>`,
  });
const COURIER_ICON = pin("C", "#b91c1c");
const DELIVERY_ICON = pin("D", "#166534");

// Fit the view to both pins when the map first appears and whenever the stage changes, but NOT on every tick:
// re-fitting every 3 seconds would snatch the map back while someone is panning it.
function FitBoth({ courier, delivery, stage }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds([[courier.lat, courier.lng], [delivery.lat, delivery.lng]]), { padding: [48, 48], maxZoom: 16 });
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// Leaflet takes [lat, lng]: latitude FIRST. (GeoJSON is [lng, lat]. Swapped, Bole lands in the Indian Ocean.)
export default function DeliveryMap({ courier, delivery, status }) {
  return (
    // an explicit height: a map with no height renders as nothing
    <MapContainer center={[delivery.lat, delivery.lng]} zoom={14} style={{ height: "320px", width: "100%" }} className="rounded">
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        // the attribution is a licence condition, not decoration. (The public tile server is fine for coursework
        // and NOT for production traffic: see the OpenStreetMap tile usage policy.)
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      <Marker position={[delivery.lat, delivery.lng]} icon={DELIVERY_ICON} alt="Delivery area">
        <Popup>Delivery: {delivery.area} (middle of the area)</Popup>
      </Marker>
      <Marker position={[courier.lat, courier.lng]} icon={COURIER_ICON} alt="Courier">
        <Popup>Courier</Popup>
      </Marker>
      <FitBoth courier={courier} delivery={delivery} stage={status} />
    </MapContainer>
  );
}
