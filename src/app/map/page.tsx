"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const LiveMap = dynamic(() => import("@/components/LiveMap"), { ssr: false });

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <div className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00D166] animate-pulse" />
            <span className="text-[#00D166] text-sm font-medium">Live GPS · OpenStreetMap</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Book a <span className="gradient-text">Ride</span>
          </h1>
          <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Tap the map to set pickup and dropoff. Search any location in Somaliland.
          </p>
        </div>
        <LiveMap height="550px" mode="view" />
      </div>
    </div>
  );
}
