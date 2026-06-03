"use client";

export const dynamic = "force-static";

import { useState } from "react";
import { Search, UserCheck, UserX, Ban, CheckCircle, Star, Car, Phone } from "lucide-react";

type Status = "active" | "pending" | "suspended";

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  city: string;
  trips: number;
  rating: number;
  earned: string;
  joined: string;
  status: Status;
}

const INITIAL_DRIVERS: Driver[] = [
  { id: "dr1", name: "Mahad Ali Hassan", phone: "063-411-234", vehicle: "Toyota Corolla 2018", city: "Hargeisa", trips: 412, rating: 4.9, earned: "$3,240", joined: "Jan 2024", status: "active" },
  { id: "dr2", name: "Ibrahim Yusuf", phone: "063-522-891", vehicle: "Hyundai Accent 2019", city: "Hargeisa", trips: 298, rating: 4.7, earned: "$2,100", joined: "Mar 2024", status: "active" },
  { id: "dr3", name: "Ahmed Hassan", phone: "063-334-567", vehicle: "Kia Rio 2017", city: "Berbera", trips: 0, rating: 0, earned: "$0", joined: "Today", status: "pending" },
  { id: "dr4", name: "Faadumo Ali", phone: "063-771-002", vehicle: "Toyota Vitz 2016", city: "Hargeisa", trips: 0, rating: 0, earned: "$0", joined: "Today", status: "pending" },
  { id: "dr5", name: "Axmed Hirsi", phone: "063-663-445", vehicle: "Honda Fit 2015", city: "Burao", trips: 156, rating: 4.5, earned: "$980", joined: "Jun 2024", status: "active" },
  { id: "dr6", name: "Osman Cabdi", phone: "063-889-321", vehicle: "Toyota Vios 2016", city: "Hargeisa", trips: 87, rating: 3.8, earned: "$610", joined: "Aug 2024", status: "suspended" },
  { id: "dr7", name: "Leyla Omar", phone: "063-200-774", vehicle: "Nissan Tiida 2017", city: "Hargeisa", trips: 0, rating: 0, earned: "$0", joined: "Yesterday", status: "pending" },
  { id: "dr8", name: "Yusuf Mohamed", phone: "063-541-890", vehicle: "Toyota Wish 2014", city: "Berbera", trips: 233, rating: 4.6, earned: "$1,560", joined: "Feb 2024", status: "active" },
];

const TABS: { label: string; value: Status | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
];

const STATUS_STYLE: Record<Status, string> = {
  active: "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20",
  pending: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  suspended: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [tab, setTab] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Driver | null>(null);

  const updateStatus = (id: string, status: Status) => {
    setDrivers((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const filtered = drivers.filter((d) => {
    const matchTab = tab === "all" || d.status === tab;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search);
    return matchTab && matchSearch;
  });

  const counts = {
    all: drivers.length,
    pending: drivers.filter((d) => d.status === "pending").length,
    active: drivers.filter((d) => d.status === "active").length,
    suspended: drivers.filter((d) => d.status === "suspended").length,
  };

  return (
    <div className="p-5 md:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Drivers</h1>
        <p className="text-[#525252] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
          Manage driver accounts and approvals
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
          <input
            type="text"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#525252] outline-none focus:border-[#525252] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                tab === value
                  ? "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20"
                  : "bg-[#111111] text-[#A3A3A3] border-[#2a2a2a] hover:text-white"
              }`}
            >
              {label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                tab === value ? "bg-[#00D166]/20 text-[#00D166]" : "bg-[#181818] text-[#525252]"
              }`}>
                {counts[value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 ${selected ? "lg:grid-cols-[1fr,340px]" : "grid-cols-1"}`}>
        {/* Table */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  {["Driver", "Vehicle", "Status", "Trips", "Rating", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[#525252] text-xs uppercase tracking-wide font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[#525252] text-sm">No drivers found</td>
                  </tr>
                ) : filtered.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(selected?.id === d.id ? null : d)}
                    className={`hover:bg-[#181818] cursor-pointer transition-colors ${selected?.id === d.id ? "bg-[#181818]" : ""}`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#276EF1]/10 border border-[#276EF1]/20 flex items-center justify-center shrink-0">
                          <span className="text-[#276EF1] text-xs font-bold">{d.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold whitespace-nowrap">{d.name}</p>
                          <p className="text-[#525252] text-xs">{d.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#A3A3A3] text-xs whitespace-nowrap">{d.vehicle}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${STATUS_STYLE[d.status]}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-white text-sm font-medium">{d.trips}</td>
                    <td className="px-4 py-3.5">
                      {d.rating > 0 ? (
                        <span className="flex items-center gap-1 text-white text-sm">
                          <Star className="w-3 h-3 fill-[#F59E0B] stroke-[#F59E0B]" />
                          {d.rating}
                        </span>
                      ) : (
                        <span className="text-[#525252] text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        {d.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(d.id, "active")}
                              className="text-[10px] bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20 px-2.5 py-1 rounded-lg font-semibold hover:bg-[#00D166]/20 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(d.id, "suspended")}
                              className="text-[10px] bg-[#181818] text-[#A3A3A3] border border-[#2a2a2a] px-2.5 py-1 rounded-lg font-semibold hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {d.status === "active" && (
                          <button
                            onClick={() => updateStatus(d.id, "suspended")}
                            className="text-[10px] bg-[#181818] text-[#A3A3A3] border border-[#2a2a2a] px-2.5 py-1 rounded-lg font-semibold hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            Suspend
                          </button>
                        )}
                        {d.status === "suspended" && (
                          <button
                            onClick={() => updateStatus(d.id, "active")}
                            className="text-[10px] bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20 px-2.5 py-1 rounded-lg font-semibold hover:bg-[#00D166]/20 transition-colors cursor-pointer"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 h-fit sticky top-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#276EF1]/10 border border-[#276EF1]/20 flex items-center justify-center">
                <span className="text-[#276EF1] font-bold">{selected.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate">{selected.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLE[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#525252] hover:text-white cursor-pointer text-lg leading-none">×</button>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: "Phone", value: selected.phone, icon: <Phone className="w-3.5 h-3.5" /> },
                { label: "Vehicle", value: selected.vehicle, icon: <Car className="w-3.5 h-3.5" /> },
                { label: "City", value: selected.city, icon: null },
                { label: "Joined", value: selected.joined, icon: null },
                { label: "Total trips", value: String(selected.trips), icon: null },
                { label: "Total earned", value: selected.earned, icon: null },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-[#525252] flex items-center gap-1.5">{icon}{label}</span>
                  <span className="text-white font-medium text-right max-w-[55%] truncate">{value}</span>
                </div>
              ))}
            </div>

            {selected.rating > 0 && (
              <div className="bg-[#181818] rounded-xl p-3 mb-5 flex items-center justify-between">
                <span className="text-[#525252] text-sm">Driver rating</span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(selected.rating) ? "fill-[#F59E0B] stroke-[#F59E0B]" : "stroke-[#525252]"}`} />
                  ))}
                  <span className="text-white text-sm font-bold ml-1">{selected.rating}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {selected.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(selected.id, "active")}
                    className="w-full py-2.5 rounded-xl bg-[#00D166] text-black font-bold text-sm cursor-pointer hover:bg-[#00A350] transition-colors flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Approve Driver
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, "suspended")}
                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 font-semibold text-sm cursor-pointer hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <UserX className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              {selected.status === "active" && (
                <button
                  onClick={() => updateStatus(selected.id, "suspended")}
                  className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 font-semibold text-sm cursor-pointer hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Ban className="w-4 h-4" />
                  Suspend Driver
                </button>
              )}
              {selected.status === "suspended" && (
                <button
                  onClick={() => updateStatus(selected.id, "active")}
                  className="w-full py-2.5 rounded-xl bg-[#00D166] text-black font-bold text-sm cursor-pointer hover:bg-[#00A350] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Reactivate Driver
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
