"use client";

export const dynamic = "force-static";

import { useState } from "react";
import { Save, CheckCircle, Sliders, DollarSign, Car, Shield, Bell } from "lucide-react";

interface Settings {
  commission: number;
  baseFare: number;
  perKm: number;
  minFare: number;
  surge: number;
  payoutSchedule: "instant" | "daily" | "weekly";
  zaadEnabled: boolean;
  dahabshiilEnabled: boolean;
  cashEnabled: boolean;
  driverNotifications: boolean;
  passengerNotifications: boolean;
}

const DEFAULT: Settings = {
  commission: 20,
  baseFare: 0.80,
  perKm: 0.35,
  minFare: 1.00,
  surge: 1.5,
  payoutSchedule: "instant",
  zaadEnabled: true,
  dahabshiilEnabled: true,
  cashEnabled: true,
  driverNotifications: true,
  passengerNotifications: true,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const exampleFare = (settings.baseFare + 3 * settings.perKm) * (settings.surge > 1 ? 1 : 1);
  const driverCut = exampleFare * (1 - settings.commission / 100);
  const platformCut = exampleFare * (settings.commission / 100);

  return (
    <div className="p-5 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">Settings</h1>
          <p className="text-[#525252] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Platform pricing and configuration
          </p>
        </div>
        <button
          onClick={save}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${
            saved
              ? "bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/30"
              : "bg-[#00D166] text-black hover:bg-[#00A350]"
          }`}
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Commission */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h2 className="text-white font-bold">Commission Rate</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#A3A3A3] text-sm">Platform commission</label>
              <span className="text-white font-black text-2xl">{settings.commission}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={settings.commission}
              onChange={(e) => update("commission", Number(e.target.value))}
              className="w-full accent-[#00D166] cursor-pointer"
            />
            <div className="flex justify-between text-[#525252] text-xs mt-1">
              <span>5%</span>
              <span>35%</span>
            </div>
          </div>

          <div className="bg-[#181818] rounded-xl p-4">
            <p className="text-[#525252] text-xs mb-3 uppercase tracking-wide">Example: 3 km trip</p>
            <div className="space-y-2">
              {[
                { label: "Passenger pays", value: `$${exampleFare.toFixed(2)}`, color: "text-white" },
                { label: `Driver receives (${100 - settings.commission}%)`, value: `$${driverCut.toFixed(2)}`, color: "text-[#00D166]" },
                { label: `Platform keeps (${settings.commission}%)`, value: `$${platformCut.toFixed(2)}`, color: "text-[#F59E0B]" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[#A3A3A3]">{label}</span>
                  <span className={`font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#276EF1]/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#276EF1]" />
            </div>
            <h2 className="text-white font-bold">Ride Pricing</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Base fare", key: "baseFare" as const, prefix: "$", step: 0.05, min: 0.5, max: 5 },
              { label: "Per km rate", key: "perKm" as const, prefix: "$", step: 0.05, min: 0.1, max: 2 },
              { label: "Minimum fare", key: "minFare" as const, prefix: "$", step: 0.25, min: 0.5, max: 5 },
              { label: "Surge multiplier", key: "surge" as const, prefix: "×", step: 0.1, min: 1, max: 3 },
            ].map(({ label, key, prefix, step, min, max }) => (
              <div key={key}>
                <label className="text-[#A3A3A3] text-xs mb-2 block">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252] text-sm">{prefix}</span>
                  <input
                    type="number"
                    step={step}
                    min={min}
                    max={max}
                    value={settings[key]}
                    onChange={(e) => update(key, Number(e.target.value))}
                    className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl pl-7 pr-3 py-2.5 text-white text-sm outline-none focus:border-[#525252] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#00D166]/10 flex items-center justify-center">
              <Car className="w-4 h-4 text-[#00D166]" />
            </div>
            <h2 className="text-white font-bold">Payment Methods</h2>
          </div>

          <div className="space-y-3">
            {[
              { key: "zaadEnabled" as const, label: "Zaad (Telesom)", badge: "Mobile Money", color: "#00D166" },
              { key: "dahabshiilEnabled" as const, label: "Dahabshiil", badge: "Mobile Money", color: "#276EF1" },
              { key: "cashEnabled" as const, label: "Cash", badge: "In-person", color: "#F59E0B" },
            ].map(({ key, label, badge, color }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${color}10`, borderColor: `${color}25` }}>
                    <span className="font-black text-sm" style={{ color }}>{label[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-[#525252] text-xs">{badge}</p>
                  </div>
                </div>
                <button
                  onClick={() => update(key, !settings[key])}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings[key] ? "bg-[#00D166]" : "bg-[#2a2a2a]"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payout schedule */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#00D166]/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#00D166]" />
            </div>
            <h2 className="text-white font-bold">Driver Payout Schedule</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["instant", "daily", "weekly"] as const).map((v) => (
              <button
                key={v}
                onClick={() => update("payoutSchedule", v)}
                className={`py-3 rounded-xl text-sm font-semibold capitalize cursor-pointer transition-all border ${
                  settings.payoutSchedule === v
                    ? "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/30"
                    : "bg-[#181818] text-[#A3A3A3] border-[#2a2a2a] hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <p className="text-[#525252] text-xs mt-3" style={{ fontFamily: "Work Sans, sans-serif" }}>
            {settings.payoutSchedule === "instant" && "Drivers receive earnings immediately after each trip."}
            {settings.payoutSchedule === "daily" && "Earnings are batched and paid out once per day at midnight."}
            {settings.payoutSchedule === "weekly" && "Earnings are batched and paid every Monday morning."}
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#276EF1]/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#276EF1]" />
            </div>
            <h2 className="text-white font-bold">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: "driverNotifications" as const, label: "Driver notifications", desc: "SMS/push alerts for trip requests, payouts" },
              { key: "passengerNotifications" as const, label: "Passenger notifications", desc: "SMS/push alerts for driver arrival, receipts" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-[#525252] text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => update(key, !settings[key])}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings[key] ? "bg-[#00D166]" : "bg-[#2a2a2a]"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating save on mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={save}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer shadow-lg transition-all ${
            saved
              ? "bg-[#00D166]/20 text-[#00D166] border border-[#00D166]/30"
              : "bg-[#00D166] text-black"
          }`}
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save"}
        </button>
      </div>
    </div>
  );
}
