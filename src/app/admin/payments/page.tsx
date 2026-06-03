"use client";

export const dynamic = "force-static";

import { useState } from "react";
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";

type TxType = "all" | "passenger" | "payout";
type TxMethod = "all" | "zaad" | "dahabshiil" | "cash";

interface Transaction {
  id: string;
  type: "passenger" | "payout";
  name: string;
  route?: string;
  method: "zaad" | "dahabshiil" | "cash";
  gross: number;
  commission: number;
  net: number;
  time: string;
  status: "completed" | "pending" | "failed";
}

const TRANSACTIONS: Transaction[] = [
  { id: "TX-4820", type: "passenger", name: "Hodan Mohamed", route: "KG-5 → Airport", method: "zaad", gross: 4.50, commission: 0.90, net: 3.60, time: "10 min ago", status: "completed" },
  { id: "TX-4819", type: "payout", name: "Mahad Ali Hassan", method: "zaad", gross: 12.40, commission: 0, net: 12.40, time: "22 min ago", status: "completed" },
  { id: "TX-4818", type: "passenger", name: "Safiya Omar", route: "Jigjiga Yar → Market", method: "dahabshiil", gross: 2.00, commission: 0.40, net: 1.60, time: "1h ago", status: "completed" },
  { id: "TX-4817", type: "payout", name: "Ibrahim Yusuf", method: "dahabshiil", gross: 8.80, commission: 0, net: 8.80, time: "2h ago", status: "completed" },
  { id: "TX-4816", type: "passenger", name: "Amina Diriye", route: "Sha'ab → Hospital", method: "cash", gross: 3.00, commission: 0.60, net: 2.40, time: "3h ago", status: "completed" },
  { id: "TX-4815", type: "passenger", name: "Khadija Farah", route: "Berbera Rd → School", method: "zaad", gross: 2.50, commission: 0.50, net: 2.00, time: "4h ago", status: "completed" },
  { id: "TX-4814", type: "payout", name: "Axmed Hirsi", method: "zaad", gross: 6.20, commission: 0, net: 6.20, time: "5h ago", status: "pending" },
  { id: "TX-4813", type: "passenger", name: "Nasra Ibrahim", route: "Airport → City Ctr", method: "dahabshiil", gross: 5.00, commission: 1.00, net: 4.00, time: "6h ago", status: "completed" },
  { id: "TX-4812", type: "passenger", name: "Faadumo Ali", route: "Market → KG-9", method: "zaad", gross: 1.80, commission: 0.36, net: 1.44, time: "7h ago", status: "failed" },
  { id: "TX-4811", type: "payout", name: "Yusuf Mohamed", method: "dahabshiil", gross: 9.60, commission: 0, net: 9.60, time: "8h ago", status: "completed" },
];

const METHOD_BADGE: Record<string, string> = {
  zaad: "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20",
  dahabshiil: "bg-[#276EF1]/10 text-[#276EF1] border-[#276EF1]/20",
  cash: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
};

const STATUS_BADGE: Record<string, string> = {
  completed: "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20",
  pending: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminPayments() {
  const [typeFilter, setTypeFilter] = useState<TxType>("all");
  const [methodFilter, setMethodFilter] = useState<TxMethod>("all");

  const completed = TRANSACTIONS.filter((t) => t.status === "completed");
  const totalCollected = completed.filter((t) => t.type === "passenger").reduce((a, t) => a + t.gross, 0);
  const totalPayouts = completed.filter((t) => t.type === "payout").reduce((a, t) => a + t.net, 0);
  const platformRevenue = completed.filter((t) => t.type === "passenger").reduce((a, t) => a + t.commission, 0);

  const filtered = TRANSACTIONS.filter((t) => {
    const matchType = typeFilter === "all" || t.type === typeFilter;
    const matchMethod = methodFilter === "all" || t.method === methodFilter;
    return matchType && matchMethod;
  });

  return (
    <div className="p-5 md:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Payments</h1>
        <p className="text-[#525252] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
          Transaction history and financial overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#525252] text-xs uppercase tracking-wide">Total Collected</p>
            <div className="w-7 h-7 rounded-lg bg-[#00D166]/10 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-[#00D166]" />
            </div>
          </div>
          <p className="text-white font-black text-2xl mb-1">${totalCollected.toFixed(2)}</p>
          <span className="flex items-center gap-1 text-[#00D166] text-xs">
            <ArrowUpRight className="w-3 h-3" />From passengers
          </span>
        </div>

        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#525252] text-xs uppercase tracking-wide">Driver Payouts</p>
            <div className="w-7 h-7 rounded-lg bg-[#276EF1]/10 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-[#276EF1]" />
            </div>
          </div>
          <p className="text-white font-black text-2xl mb-1">${totalPayouts.toFixed(2)}</p>
          <span className="flex items-center gap-1 text-[#276EF1] text-xs">
            <ArrowDownRight className="w-3 h-3" />To drivers
          </span>
        </div>

        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#525252] text-xs uppercase tracking-wide">Platform Revenue</p>
            <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>
          </div>
          <p className="text-white font-black text-2xl mb-1">${platformRevenue.toFixed(2)}</p>
          <span className="text-[#F59E0B] text-xs">20% commission</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex gap-2">
          {(["all", "passenger", "payout"] as TxType[]).map((v) => (
            <button
              key={v}
              onClick={() => setTypeFilter(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                typeFilter === v
                  ? "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20"
                  : "bg-[#111111] text-[#A3A3A3] border-[#2a2a2a] hover:text-white"
              }`}
            >
              {v === "all" ? "All types" : v === "passenger" ? "Passenger payments" : "Driver payouts"}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Filter className="w-3.5 h-3.5 text-[#525252]" />
          {(["all", "zaad", "dahabshiil", "cash"] as TxMethod[]).map((v) => (
            <button
              key={v}
              onClick={() => setMethodFilter(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border capitalize ${
                methodFilter === v
                  ? "bg-[#276EF1]/10 text-[#276EF1] border-[#276EF1]/20"
                  : "bg-[#111111] text-[#A3A3A3] border-[#2a2a2a] hover:text-white"
              }`}
            >
              {v === "all" ? "All methods" : v}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {["Transaction", "Type", "Method", "Gross", "Commission", "Net", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[#525252] text-xs uppercase tracking-wide font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#181818] transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-white text-sm font-medium whitespace-nowrap">{tx.name}</p>
                    <p className="text-[#525252] text-xs font-mono">{tx.id}</p>
                    {tx.route && <p className="text-[#525252] text-[10px] truncate max-w-[140px]">{tx.route}</p>}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium border whitespace-nowrap ${
                      tx.type === "passenger"
                        ? "bg-[#276EF1]/10 text-[#276EF1] border-[#276EF1]/20"
                        : "bg-[#00D166]/10 text-[#00D166] border-[#00D166]/20"
                    }`}>
                      {tx.type === "passenger" ? "Payment" : "Payout"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium border capitalize ${METHOD_BADGE[tx.method]}`}>
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">${tx.gross.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-[#F59E0B] text-sm font-medium">
                    {tx.commission > 0 ? `-$${tx.commission.toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3.5 text-white text-sm font-bold">${tx.net.toFixed(2)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium border ${STATUS_BADGE[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#525252] text-xs whitespace-nowrap">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
