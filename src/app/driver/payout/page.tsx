"use client";

export const dynamic = "force-static";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  Phone,
  Shield,
  Car,
  Star,
  Receipt,
  Wallet,
} from "lucide-react";

type Method = "zaad" | "dahabshiil";
type Step = "overview" | "select" | "phone" | "processing" | "success";

const METHODS = {
  zaad: {
    name: "Zaad",
    provider: "Telesom",
    color: "#00D166",
    bgColor: "rgba(0,209,102,0.08)",
    borderColor: "rgba(0,209,102,0.25)",
    textClass: "text-[#00D166]",
    badgeBg: "bg-[#00D166]/10",
    badgeBorder: "border-[#00D166]/20",
    iconBg: "bg-[#00D166]/10",
    iconBorder: "border-[#00D166]/20",
    hoverBorder: "hover:border-[#00D166]/40",
    hoverBg: "hover:bg-[#00D166]/5",
    chevronHover: "group-hover:text-[#00D166]",
    placeholder: "063-XXX-XXXX",
    hint: "Telesom mobile money · Somaliland",
    btnTextClass: "text-black",
  },
  dahabshiil: {
    name: "Dahabshiil",
    provider: "Dahabshiil",
    color: "#276EF1",
    bgColor: "rgba(39,110,241,0.08)",
    borderColor: "rgba(39,110,241,0.25)",
    textClass: "text-[#276EF1]",
    badgeBg: "bg-[#276EF1]/10",
    badgeBorder: "border-[#276EF1]/20",
    iconBg: "bg-[#276EF1]/10",
    iconBorder: "border-[#276EF1]/20",
    hoverBorder: "hover:border-[#276EF1]/40",
    hoverBg: "hover:bg-[#276EF1]/5",
    chevronHover: "group-hover:text-[#276EF1]",
    placeholder: "06X-XXX-XXXX",
    hint: "Dahabshiil mobile money",
    btnTextClass: "text-white",
  },
} as const;

const RECENT_TRIPS = [
  { id: "T-9812", from: "KG-5 Ave", to: "Masjid Ibrahim", fare: 2.50, commission: 0.50, earned: 2.00, time: "2h ago", rating: 5 },
  { id: "T-9811", from: "Jigjiga Yar", to: "Hargeisa Airport", fare: 4.50, commission: 0.90, earned: 3.60, time: "4h ago", rating: 5 },
  { id: "T-9810", from: "26 June Dist.", to: "Sha'ab Hospital", fare: 3.00, commission: 0.60, earned: 2.40, time: "6h ago", rating: 4 },
  { id: "T-9809", from: "Market Rd", to: "Berbera Rd", fare: 2.00, commission: 0.40, earned: 1.60, time: "8h ago", rating: 5 },
  { id: "T-9808", from: "Golaha Degmada", to: "KG-9 Ave", fare: 3.50, commission: 0.70, earned: 2.80, time: "Yesterday", rating: 4 },
];

function formatPhone(val: string) {
  const d = val.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

function validatePhone(val: string, method: Method): string {
  const digits = val.replace(/\D/g, "");
  if (method === "zaad" && !digits.startsWith("063") && !digits.startsWith("63")) {
    return "Zaad numbers start with 063 (e.g. 063-XXX-XXXX)";
  }
  if (digits.length < 9) return "Phone number is too short";
  return "";
}

function PayoutClient() {
  const balance = 12.40;
  const todayEarnings = 9.60;
  const weekEarnings = 55.20;
  const totalTrips = 5;
  const rating = 4.8;

  const [step, setStep] = useState<Step>("overview");
  const [method, setMethod] = useState<Method | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [progress, setProgress] = useState(0);
  const [txRef, setTxRef] = useState("");

  const cfg = method ? METHODS[method] : null;

  useEffect(() => {
    if (step !== "processing") return;
    setTxRef(`PAY-${Date.now().toString(36).toUpperCase()}`);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("success"), 400);
          return 100;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [step]);

  const selectMethod = (m: Method) => {
    setMethod(m);
    setPhone("");
    setPhoneError("");
    setStep("phone");
  };

  const submitPhone = () => {
    if (!method) return;
    const err = validatePhone(phone, method);
    if (err) { setPhoneError(err); return; }
    setStep("processing");
  };

  const goBack = () => {
    if (step === "select") setStep("overview");
    else if (step === "phone") { setStep("select"); setPhone(""); setPhoneError(""); }
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-lg mx-auto">

        {/* Back button */}
        {(step === "select" || step === "phone") && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors text-sm mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* ── OVERVIEW ── */}
        {step === "overview" && (
          <>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-5">
                <Wallet className="w-3.5 h-3.5 text-[#00D166]" />
                <span className="text-[#00D166] text-sm font-medium">Driver Earnings</span>
              </div>
              <h1 className="text-3xl font-black text-white mb-2">
                Your <span className="gradient-text">balance</span>
              </h1>
              <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Cash out anytime to Zaad or Dahabshiil.
              </p>
            </div>

            {/* Balance card */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 mb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D166] opacity-[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <p className="text-[#525252] text-xs uppercase tracking-widest font-mono mb-2">Available balance</p>
              <p className="text-white font-black text-5xl mb-1">${balance.toFixed(2)}</p>
              <p className="text-[#A3A3A3] text-xs mb-6" style={{ fontFamily: "Work Sans, sans-serif" }}>
                After 20% platform commission
              </p>
              <button
                onClick={() => setStep("select")}
                className="w-full bg-[#00D166] text-black font-bold py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer text-base"
              >
                Cash Out Now
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Today", value: `$${todayEarnings.toFixed(2)}`, icon: <Clock className="w-3.5 h-3.5 text-[#276EF1]" /> },
                { label: "This Week", value: `$${weekEarnings.toFixed(2)}`, icon: <TrendingUp className="w-3.5 h-3.5 text-[#00D166]" /> },
                { label: "Rating", value: `${rating}★`, icon: <Star className="w-3.5 h-3.5 text-[#F59E0B]" /> },
              ].map((s) => (
                <div key={s.label} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">{s.icon}<span className="text-[#525252] text-[10px] uppercase tracking-wider">{s.label}</span></div>
                  <p className="text-white font-bold text-sm">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Recent trips */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a2a]">
                <Car className="w-4 h-4 text-[#00D166]" />
                <span className="text-white font-semibold text-sm">Recent Trips</span>
                <span className="ml-auto text-[#525252] text-xs font-mono">{totalTrips} trips</span>
              </div>
              <div className="divide-y divide-[#2a2a2a]">
                {RECENT_TRIPS.map((t) => (
                  <div key={t.id} className="px-5 py-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#525252] text-xs font-mono">{t.id}</span>
                        <span className="text-[#525252] text-[10px]">·</span>
                        <span className="text-[#525252] text-xs">{t.time}</span>
                        <div className="ml-auto flex items-center gap-0.5">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-[#F59E0B] stroke-[#F59E0B]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-white text-xs truncate">
                        {t.from} → {t.to}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-white font-bold text-sm">${t.earned.toFixed(2)}</p>
                      <p className="text-[#525252] text-[10px]">of ${t.fare.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-[#2a2a2a] flex items-center justify-between">
                <span className="text-[#525252] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Commission (20%): ${RECENT_TRIPS.reduce((a, t) => a + t.commission, 0).toFixed(2)}
                </span>
                <span className="text-white font-bold text-sm">
                  Net: ${RECENT_TRIPS.reduce((a, t) => a + t.earned, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* ── SELECT METHOD ── */}
        {step === "select" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2">
                Cash out <span className="gradient-text">${balance.toFixed(2)}</span>
              </h1>
              <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Choose where to receive your earnings.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[#525252] text-xs uppercase tracking-widest font-mono mb-1">Mobile Money</p>

              {/* Zaad */}
              <button
                onClick={() => selectMethod("zaad")}
                className={`w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 ${METHODS.zaad.hoverBorder} ${METHODS.zaad.hoverBg} transition-all group text-left cursor-pointer`}
              >
                <div className={`w-14 h-14 rounded-2xl ${METHODS.zaad.iconBg} border ${METHODS.zaad.iconBorder} flex items-center justify-center shrink-0`}>
                  <span className="text-2xl font-black text-[#00D166]" style={{ fontFamily: "Outfit, sans-serif" }}>Z</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">Zaad</p>
                    <span className={`text-xs ${METHODS.zaad.badgeBg} text-[#00D166] px-2 py-0.5 rounded-full border ${METHODS.zaad.badgeBorder} font-medium`}>Telesom</span>
                  </div>
                  <p className="text-[#A3A3A3] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>Instant transfer to Zaad wallet</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-[#525252] ${METHODS.zaad.chevronHover} transition-colors shrink-0`} />
              </button>

              {/* Dahabshiil */}
              <button
                onClick={() => selectMethod("dahabshiil")}
                className={`w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 ${METHODS.dahabshiil.hoverBorder} ${METHODS.dahabshiil.hoverBg} transition-all group text-left cursor-pointer`}
              >
                <div className={`w-14 h-14 rounded-2xl ${METHODS.dahabshiil.iconBg} border ${METHODS.dahabshiil.iconBorder} flex items-center justify-center shrink-0`}>
                  <span className="text-2xl font-black text-[#276EF1]" style={{ fontFamily: "Outfit, sans-serif" }}>D</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">Dahabshiil</p>
                    <span className={`text-xs ${METHODS.dahabshiil.badgeBg} text-[#276EF1] px-2 py-0.5 rounded-full border ${METHODS.dahabshiil.badgeBorder} font-medium`}>Mobile Money</span>
                  </div>
                  <p className="text-[#A3A3A3] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>Transfer to Dahabshiil account</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-[#525252] ${METHODS.dahabshiil.chevronHover} transition-colors shrink-0`} />
              </button>

              <p className="text-center text-[#525252] text-xs pt-2 flex items-center justify-center gap-1.5" style={{ fontFamily: "Work Sans, sans-serif" }}>
                <Shield className="w-3 h-3" />
                Transfers are instant and free
              </p>
            </div>
          </>
        )}

        {/* ── PHONE ENTRY ── */}
        {step === "phone" && cfg && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2">
                Enter your <span className={cfg.textClass}>{cfg.name}</span> number
              </h1>
              <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Your earnings will be sent to this number.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: cfg.bgColor, border: `1px solid ${cfg.borderColor}` }}
                >
                  <Phone className="w-4 h-4" style={{ color: cfg.color }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{cfg.name} Number</p>
                  <p className="text-[#525252] text-xs">{cfg.hint}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
                  <span className="text-[#A3A3A3] font-mono text-sm">+252</span>
                  <div className="w-px h-5 bg-[#333333]" />
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => { setPhone(formatPhone(e.target.value)); setPhoneError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && submitPhone()}
                  placeholder={cfg.placeholder}
                  autoFocus
                  className="w-full bg-[#181818] border rounded-xl pl-[5.5rem] pr-4 py-4 text-white font-mono text-base placeholder-[#525252] outline-none transition-colors"
                  style={{
                    borderColor: phoneError ? "rgba(239,68,68,0.5)" : phone.length > 5 ? `${cfg.color}40` : "#2a2a2a",
                    caretColor: cfg.color,
                  }}
                />
              </div>
              {phoneError && (
                <p className="text-red-400 text-xs mt-2 ml-1" style={{ fontFamily: "Work Sans, sans-serif" }}>{phoneError}</p>
              )}
              <p className="text-[#525252] text-xs mt-3 leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Gaadiid will send ${balance.toFixed(2)} to this number within seconds.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4 mb-5 flex items-center justify-between">
              <span className="text-[#A3A3A3] text-sm">Payout amount</span>
              <span className="text-white font-black text-2xl">${balance.toFixed(2)}</span>
            </div>

            <button
              onClick={submitPhone}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all cursor-pointer ${cfg.btnTextClass}`}
              style={{ backgroundColor: cfg.color }}
            >
              Confirm Payout
            </button>
          </>
        )}

        {/* ── PROCESSING ── */}
        {step === "processing" && cfg && (
          <div className="text-center py-8">
            <div className="relative inline-flex mb-8">
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed animate-spin"
                style={{ borderColor: `${cfg.color}40`, animationDuration: "3s" }}
              />
              <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ backgroundColor: cfg.bgColor }}>
                <Wallet className="w-8 h-8" style={{ color: cfg.color }} />
              </div>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Sending payout</h2>
            <p className="text-[#A3A3A3] text-sm mb-8 leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Transferring <span className="text-white font-medium">${balance.toFixed(2)}</span> to{" "}
              <span className="text-white font-medium">+252 {phone}</span>.
            </p>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-[#525252]">Processing</span>
                <span className="text-[#A3A3A3] font-mono text-xs">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-75"
                  style={{ width: `${progress}%`, backgroundColor: cfg.color }}
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                <span className="text-[#525252] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Sending to {cfg.name}…
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && cfg && (
          <div className="text-center py-4">
            <div className="relative inline-flex mb-6">
              <div className="w-24 h-24 rounded-full bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#00D166]" />
              </div>
              <div className="absolute inset-0 rounded-full border border-[#00D166]/20 animate-ping-slow" />
            </div>

            <h2 className="text-3xl font-black text-white mb-2">Payout sent!</h2>
            <p className="text-[#A3A3A3] text-sm mb-8" style={{ fontFamily: "Work Sans, sans-serif" }}>
              <span className="text-white font-bold">${balance.toFixed(2)}</span> has been sent to your {cfg.name} wallet.
            </p>

            {/* Receipt */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 text-left mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-4 h-4 text-[#00D166]" />
                <span className="text-white font-semibold text-sm">Payout Receipt</span>
                <span className="ml-auto text-[#525252] font-mono text-xs">{txRef}</span>
              </div>

              <div className="space-y-3">
                {[
                  ["Method", cfg.name],
                  ["Phone", `+252 ${phone}`],
                  ["Trips paid out", `${totalTrips} trips`],
                  ["Gross earnings", `$${RECENT_TRIPS.reduce((a, t) => a + t.fare, 0).toFixed(2)}`],
                  ["Commission (20%)", `-$${RECENT_TRIPS.reduce((a, t) => a + t.commission, 0).toFixed(2)}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#525252] shrink-0" style={{ fontFamily: "Work Sans, sans-serif" }}>{label}</span>
                    <span className="text-[#E5E5E5] text-right text-xs font-mono">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
                <span className="text-[#A3A3A3] font-semibold text-sm">Total paid out</span>
                <span className="text-white font-black text-2xl">${balance.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/driver"
                className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-[#A3A3A3] hover:text-white hover:border-[#525252] transition-all text-sm font-semibold text-center cursor-pointer"
              >
                Back to Driver
              </Link>
              <Link
                href="/map"
                className="flex-1 py-3 rounded-xl bg-[#00D166] text-black font-bold text-sm hover:bg-[#00A350] transition-all text-center cursor-pointer"
              >
                Go Online
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DriverPayoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <PayoutClient />
    </Suspense>
  );
}
