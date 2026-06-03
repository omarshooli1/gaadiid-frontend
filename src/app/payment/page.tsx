"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CheckCircle,
  Phone,
  ArrowLeft,
  MapPin,
  Shield,
  Car,
  ChevronRight,
  Receipt,
  Star,
} from "lucide-react";

type Method = "zaad" | "dahabshiil";
type Step = "select" | "phone" | "processing" | "success";

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

function PaymentClient() {
  const params = useSearchParams();

  const trip = {
    from: params.get("from") ?? "KG-5 Ave, Hargeisa",
    to: params.get("to") ?? "Masjid Ibrahim, Hargeisa",
    fare: params.get("fare") ?? "2.50",
    type: params.get("type") ?? "Gaadiid Standard",
    distance: params.get("distance") ?? "3.2 km",
    duration: params.get("duration") ?? "12 min",
  };

  const [step, setStep] = useState<Step>("select");
  const [method, setMethod] = useState<Method | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [progress, setProgress] = useState(0);
  const [txRef, setTxRef] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const cfg = method ? METHODS[method] : null;

  useEffect(() => {
    if (step !== "processing") return;
    setTxRef(`GD-${Date.now().toString(36).toUpperCase()}`);
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
    setStep("select");
    setPhone("");
    setPhoneError("");
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-lg mx-auto">

        {/* Back button */}
        {step === "phone" && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors text-sm mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* Headers */}
        {step === "select" && (
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-5">
              <Shield className="w-3.5 h-3.5 text-[#00D166]" />
              <span className="text-[#00D166] text-sm font-medium">Secure Payment</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Pay for your <span className="gradient-text">ride</span>
            </h1>
            <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Choose your preferred mobile money service.
            </p>
          </div>
        )}

        {step === "phone" && cfg && (
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">
              Enter your{" "}
              <span className={cfg.textClass}>{cfg.name}</span> number
            </h1>
            <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>
              We'll send a payment request to your phone.
            </p>
          </div>
        )}

        {/* Trip summary card */}
        {(step === "select" || step === "phone") && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-4 h-4 text-[#00D166]" />
              <span className="text-white font-semibold text-sm">{trip.type}</span>
              <div className="ml-auto flex items-center gap-2 text-[#525252] text-xs font-mono">
                <span>{trip.distance}</span>
                <span>·</span>
                <span>{trip.duration}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#00D166]/15 border border-[#00D166]/40 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#00D166]" />
                </div>
                <div>
                  <p className="text-[#525252] text-[10px] uppercase tracking-wider mb-0.5">Pickup</p>
                  <p className="text-white text-sm font-medium leading-tight">{trip.from}</p>
                </div>
              </div>
              <div className="ml-2 w-px h-4 bg-[#2a2a2a]" />
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#276EF1]/15 border border-[#276EF1]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-2.5 h-2.5 text-[#276EF1]" />
                </div>
                <div>
                  <p className="text-[#525252] text-[10px] uppercase tracking-wider mb-0.5">Dropoff</p>
                  <p className="text-white text-sm font-medium leading-tight">{trip.to}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
              <span className="text-[#A3A3A3] text-sm">Total fare</span>
              <span className="text-white font-black text-2xl">${trip.fare}</span>
            </div>
          </div>
        )}

        {/* ── SELECT METHOD ── */}
        {step === "select" && (
          <div className="space-y-3">
            <p className="text-[#525252] text-xs uppercase tracking-widest font-mono mb-1">
              Mobile Money
            </p>

            {/* Zaad */}
            <button
              onClick={() => selectMethod("zaad")}
              className={`w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 ${METHODS.zaad.hoverBorder} ${METHODS.zaad.hoverBg} transition-all group text-left cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl ${METHODS.zaad.iconBg} border ${METHODS.zaad.iconBorder} flex items-center justify-center shrink-0 group-hover:opacity-80 transition-opacity`}>
                <span className="text-2xl font-black text-[#00D166]" style={{ fontFamily: "Outfit, sans-serif" }}>Z</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-bold">Zaad</p>
                  <span className={`text-xs ${METHODS.zaad.badgeBg} text-[#00D166] px-2 py-0.5 rounded-full border ${METHODS.zaad.badgeBorder} font-medium`}>
                    Telesom
                  </span>
                </div>
                <p className="text-[#A3A3A3] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Pay from your Zaad mobile wallet
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 text-[#525252] ${METHODS.zaad.chevronHover} transition-colors shrink-0`} />
            </button>

            {/* Dahabshiil */}
            <button
              onClick={() => selectMethod("dahabshiil")}
              className={`w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 ${METHODS.dahabshiil.hoverBorder} ${METHODS.dahabshiil.hoverBg} transition-all group text-left cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl ${METHODS.dahabshiil.iconBg} border ${METHODS.dahabshiil.iconBorder} flex items-center justify-center shrink-0 group-hover:opacity-80 transition-opacity`}>
                <span className="text-2xl font-black text-[#276EF1]" style={{ fontFamily: "Outfit, sans-serif" }}>D</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-bold">Dahabshiil</p>
                  <span className={`text-xs ${METHODS.dahabshiil.badgeBg} text-[#276EF1] px-2 py-0.5 rounded-full border ${METHODS.dahabshiil.badgeBorder} font-medium`}>
                    Mobile Money
                  </span>
                </div>
                <p className="text-[#A3A3A3] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Pay from your Dahabshiil account
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 text-[#525252] ${METHODS.dahabshiil.chevronHover} transition-colors shrink-0`} />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#2a2a2a]" />
              <span className="text-[#525252] text-xs">or</span>
              <div className="flex-1 h-px bg-[#2a2a2a]" />
            </div>

            {/* Cash */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 opacity-70">
              <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center shrink-0 text-2xl">
                💵
              </div>
              <div className="flex-1">
                <p className="text-[#A3A3A3] font-bold text-sm mb-0.5">Cash</p>
                <p className="text-[#525252] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Pay the driver directly on arrival
                </p>
              </div>
            </div>

            <p
              className="text-center text-[#525252] text-xs pt-2 flex items-center justify-center gap-1.5"
              style={{ fontFamily: "Work Sans, sans-serif" }}
            >
              <Shield className="w-3 h-3" />
              All transactions are encrypted and secure
            </p>
          </div>
        )}

        {/* ── PHONE ENTRY ── */}
        {step === "phone" && cfg && (
          <div>
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
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    setPhoneError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && submitPhone()}
                  placeholder={cfg.placeholder}
                  autoFocus
                  className="w-full bg-[#181818] border rounded-xl pl-[5.5rem] pr-4 py-4 text-white font-mono text-base placeholder-[#525252] outline-none transition-colors"
                  style={{
                    borderColor: phoneError
                      ? "rgba(239,68,68,0.5)"
                      : phone.length > 5
                      ? `${cfg.color}40`
                      : "#2a2a2a",
                    caretColor: cfg.color,
                  }}
                />
              </div>

              {phoneError && (
                <p className="text-red-400 text-xs mt-2 ml-1" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  {phoneError}
                </p>
              )}

              <p className="text-[#525252] text-xs mt-3 leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
                A payment request will be sent to this number. Approve it on your {cfg.name} app to complete the trip.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4 mb-5 flex items-center justify-between">
              <span className="text-[#A3A3A3] text-sm">Amount to pay</span>
              <span className="text-white font-black text-2xl">${trip.fare}</span>
            </div>

            <button
              onClick={submitPhone}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all cursor-pointer ${cfg.btnTextClass}`}
              style={{ backgroundColor: cfg.color }}
            >
              Send Payment Request
            </button>

            <p
              className="text-center text-[#525252] text-xs mt-4"
              style={{ fontFamily: "Work Sans, sans-serif" }}
            >
              By proceeding you agree to Gaadiid's{" "}
              <span className="text-[#A3A3A3] underline cursor-pointer">Terms of Service</span>
            </p>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {step === "processing" && cfg && (
          <div className="text-center py-8">
            <div className="relative inline-flex mb-8">
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed animate-spin"
                style={{ borderColor: `${cfg.color}40`, animationDuration: "3s" }}
              />
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: cfg.bgColor }}
              >
                <Phone className="w-8 h-8" style={{ color: cfg.color }} />
              </div>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Awaiting approval</h2>
            <p className="text-[#A3A3A3] text-sm mb-8 leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
              A payment request was sent to{" "}
              <span className="text-white font-medium">+252 {phone}</span>.
              <br />
              Please approve it on your {cfg.name} app.
            </p>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-[#525252]">Processing payment</span>
                <span className="text-[#A3A3A3] font-mono text-xs">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-75"
                  style={{ width: `${progress}%`, backgroundColor: cfg.color }}
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: cfg.color }}
                />
                <span className="text-[#525252] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  Waiting for {cfg.name} confirmation…
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && cfg && (
          <div className="text-center py-4">
            {/* Checkmark */}
            <div className="relative inline-flex mb-6">
              <div className="w-24 h-24 rounded-full bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#00D166]" />
              </div>
              <div className="absolute inset-0 rounded-full border border-[#00D166]/20 animate-ping-slow" />
            </div>

            <h2 className="text-3xl font-black text-white mb-2">Payment confirmed!</h2>
            <p className="text-[#A3A3A3] text-sm mb-8" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Your {cfg.name} payment of{" "}
              <span className="text-white font-bold">${trip.fare}</span> was successful.
            </p>

            {/* Receipt card */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 text-left mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-4 h-4 text-[#00D166]" />
                <span className="text-white font-semibold text-sm">Trip Receipt</span>
                <span className="ml-auto text-[#525252] font-mono text-xs tracking-wider">{txRef}</span>
              </div>

              <div className="space-y-3">
                {[
                  ["From", trip.from],
                  ["To", trip.to],
                  ["Ride type", trip.type],
                  ["Distance", trip.distance],
                  ["Duration", trip.duration],
                  ["Paid via", cfg.name],
                  ["Phone", `+252 ${phone}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#525252] shrink-0" style={{ fontFamily: "Work Sans, sans-serif" }}>{label}</span>
                    <span className="text-[#E5E5E5] text-right text-xs leading-normal font-mono">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
                <span className="text-[#A3A3A3] font-semibold text-sm">Total paid</span>
                <span className="text-white font-black text-2xl">${trip.fare}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
              <p className="text-white font-semibold text-sm mb-3">Rate your driver</p>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverStar(s)}
                    onMouseLeave={() => setHoverStar(0)}
                    className="transition-transform hover:scale-110 cursor-pointer"
                    aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
                  >
                    <Star
                      className="w-7 h-7 transition-colors"
                      fill={s <= (hoverStar || rating) ? "#F59E0B" : "transparent"}
                      stroke={s <= (hoverStar || rating) ? "#F59E0B" : "#525252"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[#525252] text-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>
                {rating > 0 ? ratingLabels[rating] : "Tap to rate your experience"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-[#A3A3A3] hover:text-white hover:border-[#525252] transition-all text-sm font-semibold text-center cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/map"
                className="flex-1 py-3 rounded-xl bg-[#00D166] text-black font-bold text-sm hover:bg-[#00A350] transition-all text-center cursor-pointer"
              >
                Book Another Ride
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <PaymentClient />
    </Suspense>
  );
}
