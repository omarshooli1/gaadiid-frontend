import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, DollarSign, Clock, Shield, Users, Smartphone, Star, TrendingUp, Car, Award } from "lucide-react";
import Link from "next/link";

export default function DriverPage() {
  const earnings = [
    { time: "Mon", amount: 45 },
    { time: "Tue", amount: 62 },
    { time: "Wed", amount: 38 },
    { time: "Thu", amount: 71 },
    { time: "Fri", amount: 89 },
    { time: "Sat", amount: 95 },
    { time: "Sun", amount: 55 },
  ];
  const maxEarn = Math.max(...earnings.map(e => e.amount));

  const requirements = [
    "Valid Somaliland driving license (minimum 2 years)",
    "Vehicle must be 2010 or newer",
    "Clean criminal record check",
    "Valid vehicle insurance",
    "Smartphone (Android or iPhone)",
    "Bank account or mobile money (Zaad/EVC)",
  ];

  const steps = [
    { num: "1", title: "Sign Up Online", desc: "Fill out your application in 5 minutes. Upload your documents securely." },
    { num: "2", title: "Background Check", desc: "We verify your license, insurance, and run a safety screening. Takes 1-3 days." },
    { num: "3", title: "Orientation", desc: "Attend a short online or in-person session to learn the app and Gaadiid standards." },
    { num: "4", title: "Start Earning", desc: "Go online, accept trips, and earn money. Withdraw anytime to Zaad or EVC." },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#00D166 1px, transparent 1px), linear-gradient(90deg, #00D166 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00D166] opacity-[0.05] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-8">
              <TrendingUp className="w-4 h-4 text-[#00D166]" />
              <span className="text-[#00D166] text-sm font-medium">Avg. driver earns $800–$1,200/month</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Earn more.<br />
              <span className="gradient-text">Drive free.</span>
            </h1>
            <p className="text-[#A3A3A3] text-xl leading-relaxed mb-10" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Be your own boss. Drive when you want, stop when you want. Join 2,500+ Gaadiid driver partners across Somaliland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#apply" className="bg-[#00D166] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer text-center text-lg">
                Apply to Drive
              </Link>
              <a href="tel:+252634000000" className="border border-[#2a2a2a] text-white font-semibold px-8 py-4 rounded-xl hover:border-[#00D166] transition-colors cursor-pointer text-center">
                Call Us
              </a>
              <Link href="/driver/payout" className="border border-[#00D166]/40 text-[#00D166] font-semibold px-8 py-4 rounded-xl hover:bg-[#00D166]/10 transition-colors cursor-pointer text-center">
                Cash Out
              </Link>
            </div>
          </div>

          {/* Earnings Chart Phone */}
          <div className="flex justify-center">
            <div className="w-72 bg-[#111111] rounded-[40px] border-4 border-[#2a2a2a] shadow-2xl overflow-hidden p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[#A3A3A3] text-xs">This week</p>
                  <p className="text-white text-2xl font-black">$455.00</p>
                </div>
                <div className="bg-[#00D166]/10 border border-[#00D166]/20 rounded-xl px-3 py-1">
                  <span className="text-[#00D166] text-xs font-bold">+18% vs last week</span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-32 mb-4">
                {earnings.map((e) => (
                  <div key={e.time} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#00D166] to-[#276EF1] opacity-80"
                      style={{ height: `${(e.amount / maxEarn) * 100}%` }}
                    />
                    <span className="text-[#525252] text-[10px]">{e.time}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#2a2a2a] mb-4" />

              <div className="space-y-3">
                {[
                  { label: "Trips completed", value: "47" },
                  { label: "Acceptance rate", value: "94%" },
                  { label: "Rating", value: "4.91 ★" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-[#A3A3A3] text-xs">{item.label}</span>
                    <span className="text-white text-xs font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 bg-[#00D166] text-black font-bold py-3 rounded-xl text-sm cursor-pointer hover:bg-[#00A350] transition-colors">
                Cash Out — $455.00
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why drive with <span className="gradient-text">Gaadiid?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <DollarSign className="w-7 h-7 text-[#00D166]" />, title: "Competitive Earnings", desc: "Keep 80% of every fare. Weekly bonuses for top drivers. Tips go straight to you — 100%." },
              { icon: <Clock className="w-7 h-7 text-[#276EF1]" />, title: "Total Flexibility", desc: "No shifts, no managers. Go online when you want and offline when you need a break." },
              { icon: <Shield className="w-7 h-7 text-[#00D166]" />, title: "Safety First", desc: "24/7 driver support. Insurance while on trip. Two-way rating system protects you." },
              { icon: <Smartphone className="w-7 h-7 text-[#276EF1]" />, title: "Simple App", desc: "Easy-to-use driver app in Somali and English. GPS navigation built in — never get lost." },
              { icon: <Award className="w-7 h-7 text-[#00D166]" />, title: "Driver Rewards", desc: "Reach Gold or Platinum tier for bonus incentives, priority support, and exclusive perks." },
              { icon: <Users className="w-7 h-7 text-[#276EF1]" />, title: "Community Support", desc: "Join WhatsApp groups, attend meetups, get help from fellow drivers in your city." },
            ].map((b) => (
              <div key={b.title} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 rounded-xl bg-[#181818] flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO BECOME A DRIVER */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Get started in <span className="gradient-text">4 steps</span>
            </h2>
          </div>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.num} className="flex gap-6 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 items-start card-hover">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg ${i % 2 === 0 ? "bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20" : "bg-[#276EF1]/10 text-[#276EF1] border border-[#276EF1]/20"}`}>
                  {s.num}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{s.desc}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-[#00D166] shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Requirements</h2>
            <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>Make sure you meet these before applying.</p>
          </div>
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00D166] shrink-0 mt-0.5" />
                  <span className="text-[#E5E5E5] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Apply <span className="gradient-text">today</span>
            </h2>
            <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>Takes less than 5 minutes. We will contact you within 24 hours.</p>
          </div>
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fname" className="text-[#A3A3A3] text-sm mb-2 block">First Name</label>
                <input id="fname" type="text" placeholder="Axmed" className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors" />
              </div>
              <div>
                <label htmlFor="lname" className="text-[#A3A3A3] text-sm mb-2 block">Last Name</label>
                <input id="lname" type="text" placeholder="Xirsi" className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="text-[#A3A3A3] text-sm mb-2 block">Phone Number</label>
              <input id="phone" type="tel" placeholder="+252 63 XXX XXXX" className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors" />
            </div>
            <div>
              <label htmlFor="city" className="text-[#A3A3A3] text-sm mb-2 block">City</label>
              <select id="city" className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors cursor-pointer">
                <option value="">Select your city</option>
                {["Hargeisa", "Berbera", "Burao", "Borama", "Gabiley", "Sheikh"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vehicle" className="text-[#A3A3A3] text-sm mb-2 block">Vehicle (Year + Model)</label>
              <input id="vehicle" type="text" placeholder="e.g. 2018 Toyota Corolla" className="w-full bg-[#181818] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00D166] transition-colors" />
            </div>
            <button className="w-full bg-[#00D166] text-black font-bold py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer text-lg mt-2">
              Submit Application
            </button>
            <p className="text-[#525252] text-xs text-center" style={{ fontFamily: "Work Sans, sans-serif" }}>
              By submitting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
