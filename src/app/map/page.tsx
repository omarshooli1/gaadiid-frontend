"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { MapPin, Navigation, Car } from "lucide-react";

// Load map only on client side (no SSR)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

// Somaliland city coordinates
const CITIES = {
  Hargeisa:  { lat: 9.5606,  lng: 44.0650 },
  Berbera:   { lat: 10.4396, lng: 45.0145 },
  Burao:     { lat: 9.5188,  lng: 45.5339 },
  Borama:    { lat: 9.9365,  lng: 43.1840 },
  Gabiley:   { lat: 9.9765,  lng: 43.4639 },
};

// Sample drivers near Hargeisa
const SAMPLE_DRIVERS = [
  { id: "1", lat: 9.5650, lng: 44.0700, name: "Axmed Xirsi",   rating: 4.92 },
  { id: "2", lat: 9.5580, lng: 44.0580, name: "Cabdi Warsame", rating: 4.85 },
  { id: "3", lat: 9.5700, lng: 44.0620, name: "Maxamed Cali",  rating: 4.78 },
  { id: "4", lat: 9.5540, lng: 44.0720, name: "Yuusuf Xasan",  rating: 4.96 },
];

export default function MapPage() {
  const [pickup, setPickup]   = useState(CITIES.Hargeisa);
  const [dropoff, setDropoff] = useState({ lat: 9.5750, lng: 44.0850 });
  const [city, setCity]       = useState("Hargeisa");

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 text-[#00D166]" />
            <span className="text-[#00D166] text-sm font-medium">Live Map — OpenStreetMap</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Gaadiid <span className="gradient-text">Live Map</span>
          </h1>
          <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Real-time driver locations across Somaliland — powered by OpenStreetMap (free, no API key)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            {/* City Selector */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00D166]" /> Select City
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CITIES).map(([name, coords]) => (
                  <button
                    key={name}
                    onClick={() => { setCity(name); setPickup(coords); }}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      city === name
                        ? "bg-[#00D166] text-black"
                        : "bg-[#181818] text-[#A3A3A3] hover:text-white border border-[#2a2a2a]"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Planner */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#276EF1]" /> Plan a Trip
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[#A3A3A3] text-xs mb-1 block">Pickup (lat)</label>
                  <input
                    type="number"
                    value={pickup.lat}
                    onChange={e => setPickup(p => ({ ...p, lat: parseFloat(e.target.value) }))}
                    className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00D166]"
                    step="0.001"
                  />
                </div>
                <div>
                  <label className="text-[#A3A3A3] text-xs mb-1 block">Pickup (lng)</label>
                  <input
                    type="number"
                    value={pickup.lng}
                    onChange={e => setPickup(p => ({ ...p, lng: parseFloat(e.target.value) }))}
                    className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00D166]"
                    step="0.001"
                  />
                </div>
                <div className="h-px bg-[#2a2a2a]" />
                <div>
                  <label className="text-[#A3A3A3] text-xs mb-1 block">Dropoff (lat)</label>
                  <input
                    type="number"
                    value={dropoff.lat}
                    onChange={e => setDropoff(p => ({ ...p, lat: parseFloat(e.target.value) }))}
                    className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00D166]"
                    step="0.001"
                  />
                </div>
                <div>
                  <label className="text-[#A3A3A3] text-xs mb-1 block">Dropoff (lng)</label>
                  <input
                    type="number"
                    value={dropoff.lng}
                    onChange={e => setDropoff(p => ({ ...p, lng: parseFloat(e.target.value) }))}
                    className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00D166]"
                    step="0.001"
                  />
                </div>
              </div>
            </div>

            {/* Online Drivers */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#00D166]" />
                Nearby Drivers
                <span className="ml-auto text-[#00D166] text-xs font-bold bg-[#00D166]/10 px-2 py-0.5 rounded-full">
                  {SAMPLE_DRIVERS.length} online
                </span>
              </h3>
              <div className="space-y-3">
                {SAMPLE_DRIVERS.map(d => (
                  <div key={d.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center">
                      <span className="text-[#00D166] text-xs font-bold">{d.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-xs font-semibold">{d.name}</p>
                      <p className="text-[#525252] text-xs">⭐ {d.rating}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#00D166] animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00D166] animate-pulse" />
                  <span className="text-white text-sm font-semibold">Live — {city}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#A3A3A3]">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#00D166]" /> Pickup
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#276EF1]" /> Dropoff
                  </span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-[#00D166]" /> Driver
                  </span>
                </div>
              </div>
              <Map
                pickupLat={pickup.lat}
                pickupLng={pickup.lng}
                dropoffLat={dropoff.lat}
                dropoffLng={dropoff.lng}
                drivers={city === "Hargeisa" ? SAMPLE_DRIVERS : []}
                height="520px"
                zoom={14}
              />
            </div>
            <p className="text-[#525252] text-xs mt-2 text-center">
              Map data © <a href="https://openstreetmap.org" className="text-[#00D166] hover:underline" target="_blank">OpenStreetMap</a> contributors — Free, open source, works in Somaliland
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
