// src/components/MapComponent.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapComponent() {
  // Koordinat untuk Politeknik ATMI Surakarta
  const position = [-7.5595, 110.7675];

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <b>Politeknik ATMI Surakarta</b><br /> Lokasi kami.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;