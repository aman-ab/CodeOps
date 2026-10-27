"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const STORE = [8.999, 38.7896];

const DELIVERY = [8.991, 38.7905];

export default function DeliveryMap() {
  return (
    <MapContainer center={STORE} zoom={14} style={{ height: "420px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={STORE}>
        <Popup>Store — Bole</Popup>
      </Marker>

      <Marker position={DELIVERY}>
        <Popup>Delivery address — Bole</Popup>
      </Marker>
    </MapContainer>
  );
}
