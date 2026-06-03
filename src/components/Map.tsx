"use client";
import { useEffect, useRef } from "react";

interface Driver {
  id: string;
  lat: number;
  lng: number;
  name: string;
  rating: number;
}

interface MapProps {
  pickupLat?: number;
  pickupLng?: number;
  dropoffLat?: number;
  dropoffLng?: number;
  drivers?: Driver[];
  height?: string;
  zoom?: number;
}

// Hargeisa center coordinates
const HARGEISA = { lat: 9.5606, lng: 44.0650 };

export default function Map({
  pickupLat,
  pickupLng,
  dropoffLat,
  dropoffLng,
  drivers = [],
  height = "400px",
  zoom = 13,
}: MapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapRef.current) return; // already initialized

    // Dynamically import Leaflet (avoids SSR issues)
    import("leaflet").then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!containerRef.current) return;

      const centerLat = pickupLat || HARGEISA.lat;
      const centerLng = pickupLng || HARGEISA.lng;

      // Create map
      const map = L.map(containerRef.current, {
        center: [centerLat, centerLng],
        zoom,
        zoomControl: true,
      });

      mapRef.current = map;

      // OpenStreetMap tile layer (free, no API key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Pickup marker (green)
      if (pickupLat && pickupLng) {
        const pickupIcon = L.divIcon({
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#00D166;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
          className: "",
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([pickupLat, pickupLng], { icon: pickupIcon })
          .addTo(map)
          .bindPopup("<b>Pickup</b>");
      }

      // Dropoff marker (blue)
      if (dropoffLat && dropoffLng) {
        const dropoffIcon = L.divIcon({
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#276EF1;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
          className: "",
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([dropoffLat, dropoffLng], { icon: dropoffIcon })
          .addTo(map)
          .bindPopup("<b>Dropoff</b>");

        // Draw route line between pickup and dropoff
        if (pickupLat && pickupLng) {
          L.polyline(
            [[pickupLat, pickupLng], [dropoffLat, dropoffLng]],
            { color: "#00D166", weight: 4, opacity: 0.7, dashArray: "8, 6" }
          ).addTo(map);

          // Fit map to show both points
          map.fitBounds([[pickupLat, pickupLng], [dropoffLat, dropoffLng]], {
            padding: [40, 40],
          });
        }
      }

      // Driver markers (car icon)
      drivers.forEach((driver) => {
        const driverIcon = L.divIcon({
          html: `
            <div style="background:#111;border:2px solid #00D166;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,209,102,0.4)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#00D166">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>`,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
        L.marker([driver.lat, driver.lng], { icon: driverIcon })
          .addTo(map)
          .bindPopup(`<b>${driver.name}</b><br>⭐ ${driver.rating}`);
      });
    });

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%", borderRadius: "16px", overflow: "hidden" }}
      className="bg-[#1a2a1a]"
    />
  );
}
