"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// بارگذاری داینامیک نقشه فقط در سمت کلاینت
const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
      <Loader2 className="animate-spin text-[#1e3a5f]" size={32} />
    </div>
  ),
});

interface PropertyMapProps {
  lat: number;
  lng: number;
}

export default function PropertyMap({ lat, lng }: PropertyMapProps) {
  return (
    <MapPicker 
      initialLat={lat} 
      initialLng={lng} 
      onLocationSelect={() => {}} 
    />
  );
}