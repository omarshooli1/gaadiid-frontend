import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Phone, Star, Eye, Lock, Bell, CheckCircle, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SafetyPage() {
  const passengerSafety = [
    { icon: <Eye className="w-6 h-6 text-[#00D166]" />, title: "Driver Info Before You Ride", desc: "See your driver's name, photo, rating, vehicle details, and license plate before they arrive. Know who is picking you up." },
    { icon: <Shield className="w-6 h-6 text-[#276EF1]" />, title: "Background-Checked Drivers", desc: "Every driver passes a criminal record check and license verification before their first trip. Re-checked annually." },
    { icon: <Bell className="w-6 h-6 text-[#00D166]" />, title: "Share Your Trip", desc: "Send your real-time GPS location to family or friends directly from the app. They can track your journey live." },
    { icon: <Phone className="w-6 h-6 text-[#276EF1]" />, title: "Emergency SOS Button", desc: "One tap calls Somaliland emergency services and shares your exact location. Available at all times during a trip." },
    { icon: <Lock className="w-6 h-6 text-[#00D166]" />, title: "Anonymous Calls", desc: "Your personal phone number is never shared with drivers. All calls are routed through our anonymous system." },
    { icon: <Star className="w-6 h-6 text-[#276EF1]" />, title: "Two-Way Ratings", desc: "Rate every driver after your trip. Drivers with consistently low ratings are removed from the platform." },
  ];

  const driverSafety = [
    { icon: <Shield className="w-6 h-6 text-[#00D166]" />, title: "Passenger Verification", desc: "All passengers verify with a phone number. Suspicious activity is flagged immediately." },
    { icon: <Lock className="w-6 h-6 text-[#276EF1]" />, title: "Anonymous Calls", desc: "Your phone number is never shared with passengers. Use the in-app call feature for privacy." },
    { icon: <AlertCircle className="w-6 h-6 text-[#00D166]" />, title: "Trip Recording", desc: "Report any incident with full trip data attached. Our safety team responds within 2 hours." },
    { icon: <Phone className="w-6 h-6 text-[#276EF1]" />, title: "24/7 Driver Support", desc: "Dedicated driver safety support line available around the clock. We have your back." },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D166] opacity-[0.04] rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-[#00D166]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Safety is our
            <br />
            <span className="gradient-text">top priority</span>
          </h1>
          <p className="text-[#A3A3A3] text-xl leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Every feature, every policy, every decision at Gaadiid is built around keeping you safe — whether you are riding or driving.
          </p>
        </div>
      </section>

      {/* SAFETY STATS */}
      <section className="py-16 border-y border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "100%", label: "Drivers background-checked" },
            { value: "2hr", label: "Incident response time" },
            { value: "24/7", label: "Safety support line" },
            { value: "4.9★", label: "Average safety rating" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{s.value}</div>
              <div className="text-[#A3A3A3] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PASSENGER SAFETY */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#00D166]" />
            </div>
            <h2 className="text-3xl font-black text-white">Passenger Safety</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passengerSafety.map((s) => (
              <div key={s.title} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 rounded-xl bg-[#181818] flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER SAFETY */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#276EF1]/10 border border-[#276EF1]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#276EF1]" />
            </div>
            <h2 className="text-3xl font-black text-white">Driver Safety</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {driverSafety.map((s) => (
              <div key={s.title} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex gap-5 items-start card-hover">
                <div className="w-12 h-12 rounded-xl bg-[#181818] flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY GUIDELINES */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Community <span className="gradient-text">guidelines</span></h2>
            <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>These rules apply to everyone on the Gaadiid platform.</p>
          </div>
          <div className="space-y-3">
            {[
              "Treat every person with respect and dignity",
              "No discrimination based on religion, tribe, gender, or appearance",
              "Drivers must follow all traffic laws at all times",
              "No weapons or dangerous items are allowed in vehicles",
              "Physical or verbal abuse is an immediate and permanent ban",
              "Passengers must wear seatbelts when available",
              "Drivers must not use phones while driving",
              "Report any safety concerns immediately through the app",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#111111] border border-[#2a2a2a] rounded-xl px-5 py-4">
                <CheckCircle className="w-4 h-4 text-[#00D166] shrink-0 mt-0.5" />
                <span className="text-[#E5E5E5] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#0d1f0f] to-[#0a0d1a] border border-[#00D166]/20 rounded-3xl p-12">
            <Phone className="w-12 h-12 text-[#00D166] mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white mb-4">Need help right now?</h2>
            <p className="text-[#A3A3A3] mb-8" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Our safety team is available 24/7. Call us directly or use the in-app report feature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+252634000000" className="bg-[#00D166] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer">
                Call Safety Line
              </a>
              <Link href="/download" className="border border-[#2a2a2a] text-white font-semibold px-8 py-4 rounded-xl hover:border-[#00D166] transition-colors cursor-pointer">
                Report in App
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
