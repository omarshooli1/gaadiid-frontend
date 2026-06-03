"use client";

export const dynamic = "force-static";

import { useState } from "react";
import { Users, Car, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle, Star } from "lucide-react";

type DriverStatus = "approved" | "rejected" | null;

const INITIAL_PENDING = [
  { id: "d1", name: "Ahmed Hassan", phone: "063-411-234", vehicle: "Toyota Corolla 2018", city: "Hargeisa", submitted: "2h ago" },
  { id: "d2", name: "Faadumo Ali", phone: "063-522-891", vehicle: "Hyundai Accent 2019", city: "Hargeisa", submitted: "3h ago" },
  { id: "d3", name: "Cabdi Warsame", phone: "063-334-567", vehicle: "Kia Rio 2017", city: "Berbera", submitted: "5h ago" },
  { id: "d4", name: "Leyla Omar", phone: "063-771-002", vehicle: "Toyota Vitz 2016", city: "Burao", submitted: "7h ago" },
];

const RECENT_TRIPS = [
  { id: "T-9820", passenger: "Hodan M.", driver: "Mahad A.", route: "KG-5 → Airport", fare: "$4.50", status: "completed" },
  { id: "T-9819", passenger: "Safiya O.", driver: "Ibrahim Y.", route: "Jigjiga Yar → Market", fare: "$2.00", status: "completed" },
  { id: "T-9818", passenger: "Amina D.", driver: "Axmed H.", route: "Sha'ab → Hospital", fare: "$3.00", status: "cancelled" },
  { id: "T-9817", passenger: "Khadija F.", driver: "Osman C.", route: "Berbera Rd → School", fare: "$2.50", status: "completed" },
  { id: "T-9816", passenger: "Nasra I.", driver: "Yusuf M.", route: "Airport → City Ctr", fare: "$5.00", status: "completed" },
];

const STATS = [
  { label: "Total Drivers", value: "2,547", sub: "+12 this week", icon: Users, color: "#276EF1" },
  { label: "Active Today", value: "183", sub: "72% online rate", icon: Car, color: "#00D166" },
  { label: "Trips Today", value: "1,204", sub: "+23% vs yesterday", icon: TrendingUp, color: "#00D166" },
  { label: "Revenue Today", value: "$3,012", sub: "$602 platform cut", icon: DollarSign, color: "#F59E0B" },
];

export default function AdminDashboard() {
  const [decisions, setDecisions] = useState<Record<string, DriverStatus>>({});

  const decide = (id: string, status: DriverStatus) =>
    setDecisions((prev) => ({ ...prev, [id]: status }));

  const pending = INITIAL_PENDING.filter((d) => !decisions[d.id]);
  const pendingCount = pending.length;

  return (
    <div className="p-5 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-[#525252] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
          Gaadiid platform · Hargeisa, Somaliland
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#525252] text-xs uppercase tracking-wide" style={{ fontFamily: "Work Sans, sans-serif" }}>{label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </div>
            </div>
            <p className="text-white font-black text-2xl mb-1">{value}</p>
            <p className="text-[#525252] text-[11px]" style={{ fontFamily: "Work Sans, sans-serif" }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending approvals */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a2a]">
            <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-white font-semibold text-sm">Pending Approvals</span>
            {pendingCount > 0 && (
              <span className="ml-auto bg-[#F59E0B]/10 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full border border-[#F59E0B]/20 font-medium">
                {pendingCount}
              </span>
            )}
          </div>

          {pendingCount === 0 ? (
            <div className="px-5 py-10 text-center">
              <CheckCircle className="w-8 h-8 text-[#00D166] mx-auto mb-2" />
              <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>All caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#2a2a2a]">
              {pending.map((d) => (
                <div key={d.id} className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#276EF1]/10 border border-[#276EF1]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#276EF1] text-xs font-bold">{d.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{d.name}</p>
                    <p className="text-[#525252] text-xs truncate">{d.vehicle} · {d.city} · {d.submitted}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => decide(d.id, "approved")}
                      className="text-xs bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-[#00D166]/20 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => decide(d.id, "rejected")}
                      className="text-xs bg-[#181818] text-[#A3A3A3] border border-[#2a2a2a] px-3 py-1.5 rounded-lg font-semibold hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent trips */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a2a]">
            <Car className="w-4 h-4 text-[#00D166]" />
            <span className="text-white font-semibold text-sm">Recent Trips</span>
          </div>
          <div className="divide-y divide-[#2a2a2a]">
            {RECENT_TRIPS.map((t) => (
              <div key={t.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#525252] text-xs font-mono">{t.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${
                      t.status === "completed"
                        ? "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-white text-xs truncate">{t.route}</p>
                  <p className="text-[#525252] text-[10px] truncate">{t.passenger} · {t.driver}</p>
                </div>
                <span className="text-white font-bold text-sm shrink-0">{t.fare}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
