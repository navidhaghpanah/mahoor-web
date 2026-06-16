"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// رفع باگ آیکون پیش‌فرض Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ onLocationSelect, initialLat = 35.6892, initialLng = 51.3890 }: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  // جلوگیری از رندر در سمت سرور
  if (!isMounted) {
    return (
      <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">در حال بارگذاری نقشه...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border-2 border-gray-200" key={`map-${initialLat}-${initialLng}`}>
      <MapContainer 
        center={position} 
        zoom={12} 
        style={{ height: "300px", width: "100%" }}
        className="z-0"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position} />
        <LocationMarker onLocationSelect={handleSelect} />
      </MapContainer>
    </div>
  );
}