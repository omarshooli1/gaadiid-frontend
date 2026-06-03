"use client";
import { useEffect, useRef, useState } from "react";

interface LiveMapProps {
  height?: string;
  onPickupSelect?: (lat: number, lng: number, address: string) => void;
  onDropoffSelect?: (lat: number, lng: number, address: string) => void;
  mode?: "pickup" | "dropoff" | "view";
}

const HARGEISA = { lat: 9.5606, lng: 44.0650 };

// Somaliland landmark suggestions for quick select
const LANDMARKS = [
  { name: "Hargeisa Airport", lat: 9.5189, lng: 44.0888 },
  { name: "Hargeisa City Centre", lat: 9.5606, lng: 44.0650 },
  { name: "Maansoor Hotel", lat: 9.5621, lng: 44.0651 },
  { name: "Berbera Port", lat: 10.4354, lng: 45.0149 },
  { name: "Burao Town Centre", lat: 9.5188, lng: 45.5339 },
  { name: "Borama University", lat: 9.9365, lng: 43.1840 },
  { name: "Gabiley Market", lat: 9.9765, lng: 43.4639 },
  { name: "Hargeisa Hospital", lat: 9.5573, lng: 44.0601 },
];

export default function LiveMap({
  height = "500px",
  onPickupSelect,
  onDropoffSelect,
  mode = "view",
}: LiveMapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userMarkerRef = useRef<any>(null);
  const pickupMarkerRef = useRef<any>(null);
  const dropoffMarkerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [pickup, setPickup] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [dropoff, setDropoff] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [selecting, setSelecting] = useState<"pickup" | "dropoff" | null>(null);
  const [locationError, setLocationError] = useState("");

  // Initialize map
  useEffect(() => {
    if (typeof window === "undefined" || mapRef.current) return;

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(containerRef.current, {
        center: [HARGEISA.lat, HARGEISA.lng],
        zoom: 14,
        zoomControl: false,
      });

      mapRef.current = map;

      // OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      // Custom zoom control position
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Click on map to set location
      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;
        const address = await reverseGeocode(lat, lng);

        if (selecting === "pickup" || mode === "pickup") {
          setPickup({ lat, lng, address });
          onPickupSelect?.(lat, lng, address);
          updateMarker(L, map, pickupMarkerRef, lat, lng, "#00D166", "Pickup");
        } else if (selecting === "dropoff" || mode === "dropoff") {
          setDropoff({ lat, lng, address });
          onDropoffSelect?.(lat, lng, address);
          updateMarker(L, map, dropoffMarkerRef, lat, lng, "#276EF1", "Dropoff");
        }
      });

      // Get user's live GPS location
      getUserLocation(L, map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Draw route when both pickup and dropoff are set
  useEffect(() => {
    if (!mapRef.current || !pickup || !dropoff) return;
    import("leaflet").then((L) => {
      if (routeLineRef.current) {
        mapRef.current.removeLayer(routeLineRef.current);
      }
      routeLineRef.current = L.polyline(
        [[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]],
        { color: "#00D166", weight: 4, opacity: 0.8, dashArray: "10, 8" }
      ).addTo(mapRef.current);

      mapRef.current.fitBounds(
        [[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]],
        { padding: [60, 60] }
      );
    });
  }, [pickup, dropoff]);

  function updateMarker(L: any, map: any, ref: any, lat: number, lng: number, color: string, label: string) {
    if (ref.current) map.removeLayer(ref.current);
    const icon = L.divIcon({
      html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    ref.current = L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<b>${label}</b>`).openPopup();
  }

  function getUserLocation(L: any, map: any) {
    if (!navigator.geolocation) {
      setLocationError("GPS not supported on this device");
      return;
    }

    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserLocation({ lat, lng });
        setLocationError("");

        // User location dot
        if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
        const icon = L.divIcon({
          html: `
            <div style="position:relative;width:20px;height:20px">
              <div style="position:absolute;inset:0;border-radius:50%;background:#276EF1;opacity:0.3;animation:ping 2s infinite"></div>
              <div style="position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#276EF1;border:2px solid white"></div>
            </div>`,
          className: "",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        userMarkerRef.current = L.marker([lat, lng], { icon })
          .addTo(map)
          .bindPopup("📍 You are here");

        // Center on user first time
        map.setView([lat, lng], 15);
      },
      (err) => {
        // Default to Hargeisa if GPS denied
        setLocationError("Using Hargeisa as default location");
        map.setView([HARGEISA.lat, HARGEISA.lng], 14);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
  }

  // Reverse geocode using Nominatim (free OSM geocoder)
  async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      return data.display_name?.split(",").slice(0, 3).join(", ") || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }

  // Search places using Nominatim — focused on Somaliland
  async function searchPlaces(query: string) {
    if (!query.trim()) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + " Somaliland")}&format=json&limit=5&countrycodes=so`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    }
    setSearching(false);
  }

  function flyToLocation(lat: number, lng: number, label: string) {
    if (!mapRef.current) return;
    mapRef.current.flyTo([lat, lng], 16, { duration: 1.5 });
    setSearchResults([]);
    setSearchQuery("");
  }

  function centerOnUser() {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 1 });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Search bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); searchPlaces(e.target.value); }}
              placeholder="Search in Somaliland (e.g. Hargeisa Airport, Berbera Port...)"
              className="w-full bg-[#111111] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors placeholder:text-[#525252]"
            />
            {searching && (
              <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-[#00D166] border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <button
            onClick={centerOnUser}
            className="bg-[#111111] border border-[#2a2a2a] hover:border-[#276EF1] text-[#276EF1] px-4 rounded-xl transition-colors cursor-pointer"
            title="Center on my location"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
          </button>
        </div>

        {/* Search results dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#181818] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
            {searchResults.map((r, i) => (
              <button
                key={i}
                onClick={() => flyToLocation(parseFloat(r.lat), parseFloat(r.lon), r.display_name)}
                className="w-full text-left px-4 py-3 hover:bg-[#222] transition-colors cursor-pointer border-b border-[#2a2a2a] last:border-0"
              >
                <p className="text-white text-sm truncate">{r.display_name.split(",").slice(0, 2).join(", ")}</p>
                <p className="text-[#525252] text-xs">{r.type}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mode selector */}
      {mode === "view" && (
        <div className="flex gap-2">
          <button
            onClick={() => setSelecting(selecting === "pickup" ? null : "pickup")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              selecting === "pickup"
                ? "bg-[#00D166] text-black"
                : "bg-[#111111] border border-[#2a2a2a] text-[#A3A3A3] hover:text-white"
            }`}
          >
            {selecting === "pickup" ? "🟢 Tap map to set pickup" : "Set Pickup"}
          </button>
          <button
            onClick={() => setSelecting(selecting === "dropoff" ? null : "dropoff")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              selecting === "dropoff"
                ? "bg-[#276EF1] text-white"
                : "bg-[#111111] border border-[#2a2a2a] text-[#A3A3A3] hover:text-white"
            }`}
          >
            {selecting === "dropoff" ? "🔵 Tap map to set dropoff" : "Set Dropoff"}
          </button>
        </div>
      )}

      {/* Selected locations */}
      {(pickup || dropoff) && (
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-3 space-y-2">
          {pickup && (
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00D166] shrink-0 mt-1" />
              <div>
                <p className="text-[#525252] text-xs">Pickup</p>
                <p className="text-white text-xs">{pickup.address}</p>
              </div>
            </div>
          )}
          {dropoff && (
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded-full bg-[#276EF1] shrink-0 mt-1" />
              <div>
                <p className="text-[#525252] text-xs">Dropoff</p>
                <p className="text-white text-xs">{dropoff.address}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick landmark buttons */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {LANDMARKS.slice(0, 5).map((l) => (
          <button
            key={l.name}
            onClick={() => flyToLocation(l.lat, l.lng, l.name)}
            className="shrink-0 bg-[#111111] border border-[#2a2a2a] text-[#A3A3A3] hover:text-white hover:border-[#00D166] text-xs px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* Location error */}
      {locationError && (
        <p className="text-[#525252] text-xs text-center">{locationError}</p>
      )}

      {/* The actual map */}
      <div
        ref={containerRef}
        style={{ height, width: "100%", borderRadius: "16px", overflow: "hidden" }}
        className="bg-[#1a2a1a]"
      />

      <p className="text-[#525252] text-xs text-center">
        Map © <a href="https://openstreetmap.org" target="_blank" className="text-[#00D166] hover:underline">OpenStreetMap</a> · Search by <a href="https://nominatim.org" target="_blank" className="text-[#00D166] hover:underline">Nominatim</a> · 100% free
      </p>
    </div>
  );
}
