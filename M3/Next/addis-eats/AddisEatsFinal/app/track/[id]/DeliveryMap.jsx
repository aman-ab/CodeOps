"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet's default marker images break when bundled, so we point to them explicitly.
const pin = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const STORE = [8.999, 38.7896];
const DELIVERY = [8.991, 38.7905];

export default function DeliveryMap() {
  return (
    <MapContainer center={STORE} zoom={14} scrollWheelZoom={false} style={{ height: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={STORE} icon={pin}>
        <Popup>Store: Bole</Popup>
      </Marker>

      <Marker position={DELIVERY} icon={pin}>
        <Popup>Delivery address: Mexico</Popup>
      </Marker>
    </MapContainer>
  );
}
