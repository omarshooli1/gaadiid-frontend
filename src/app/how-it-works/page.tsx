import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Smartphone, Car, CheckCircle, CreditCard, Star, MapPin, Bell, Navigation, Shield } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const passengerSteps = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Download & Sign Up",
      desc: "Get the Gaadiid app from the App Store or Google Play. Create your account with your phone number — no email needed.",
      detail: "Enter your name, phone number, and choose a password. We send a verification code to your phone.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Set Your Pickup",
      desc: "Open the app and allow location access. Your current position appears automatically on the map. Adjust the pin if needed.",
      detail: "You can also type your address or search for nearby landmarks like mosques, markets, or hospitals.",
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Choose Your Ride",
      desc: "Enter your destination. See the estimated fare and available ride options — Standard, Premium, or XL for groups.",
      detail: "Fare is calculated upfront. No surprises, no negotiating. Accept and we match you instantly.",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Track Your Driver",
      desc: "Watch your driver approach on live GPS. See their name, photo, car details, and rating before they arrive.",
      detail: "You get real-time notifications when the driver accepts, is nearby, and arrives.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Pay & Rate",
      desc: "Pay by cash, Zaad, EVC Plus, or saved card when you arrive. Then rate your driver to help maintain quality.",
      detail: "Your trip history is saved. You can re-book the same driver or request a receipt any time.",
    },
  ];

  const driverSteps = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Go Online",
      desc: "Open the Gaadiid Driver app and tap Go Online. Instantly start receiving ride requests in your area.",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Accept Trips",
      desc: "A notification shows the pickup location, distance, and estimated earnings. Accept or decline — you choose.",
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Navigate",
      desc: "Built-in navigation guides you to the passenger and then to the destination. Works in all Somaliland cities.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Complete & Earn",
      desc: "Arrive at the destination and complete the trip. Earnings add to your balance instantly.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Cash Out",
      desc: "Transfer earnings to Zaad, EVC Plus, or your bank account anytime — same day.",
    },
  ];

  const rideTypes = [
    { name: "Gaadiid Standard", desc: "Everyday rides. Affordable, clean, and reliable.", price: "From $1.50", icon: "🚗", capacity: "1–4 passengers" },
    { name: "Gaadiid Premium", desc: "Newer cars, higher-rated drivers, faster pick-up.", price: "From $3.00", icon: "🚙", capacity: "1–4 passengers" },
    { name: "Gaadiid XL", desc: "SUVs and vans for families or groups.", price: "From $4.50", icon: "🚐", capacity: "1–6 passengers" },
    { name: "Gaadiid Women", desc: "Female passengers matched with female drivers only.", price: "Same as Standard", icon: "👩", capacity: "1–4 passengers" },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#276EF1]/10 border border-[#276EF1]/20 rounded-full px-4 py-2 mb-8">
            <span className="text-[#276EF1] text-sm font-medium">Simple & Transparent</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            How <span className="gradient-text">Gaadiid</span> works
          </h1>
          <p className="text-[#A3A3A3] text-xl leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Everything you need to know about booking rides and driving with Gaadiid.
          </p>
        </div>
      </section>

      {/* PASSENGER FLOW */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#00D166]/10 border border-[#00D166]/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#00D166]" />
            </div>
            <h2 className="text-3xl font-black text-white">For Passengers</h2>
          </div>
          <div className="space-y-4">
            {passengerSteps.map((step, i) => (
              <div key={step.title} className="flex gap-6 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 items-start group hover:border-[#00D166]/30 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20" : "bg-[#276EF1]/10 text-[#276EF1] border border-[#276EF1]/20"}`}>
                    {step.icon}
                  </div>
                  {i < passengerSteps.length - 1 && (
                    <div className="w-px h-8 bg-[#2a2a2a]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-[#E5E5E5] text-sm leading-relaxed mb-2" style={{ fontFamily: "Work Sans, sans-serif" }}>{step.desc}</p>
                      <p className="text-[#A3A3A3] text-xs leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{step.detail}</p>
                    </div>
                    <span className="text-[#2a2a2a] font-black text-3xl shrink-0 group-hover:text-[#00D166]/20 transition-colors">0{i + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER FLOW */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#276EF1]/10 border border-[#276EF1]/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-[#276EF1]" />
            </div>
            <h2 className="text-3xl font-black text-white">For Drivers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {driverSteps.map((step, i) => (
              <div key={step.title} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 text-center hover:border-[#276EF1]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#276EF1]/10 border border-[#276EF1]/20 text-[#276EF1] flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-[#525252] text-xs font-mono mb-2">Step {i + 1}</div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-[#A3A3A3] text-xs leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIDE TYPES */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Ride <span className="gradient-text">options</span>
            </h2>
            <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>Choose the right ride for every occasion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rideTypes.map((r, i) => (
              <div key={r.name} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex gap-5 items-start card-hover cursor-pointer hover:border-[#00D166]/30 transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${i % 2 === 0 ? "bg-[#00D166]/10 border border-[#00D166]/20" : "bg-[#276EF1]/10 border border-[#276EF1]/20"}`}>
                  {r.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold">{r.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${i % 2 === 0 ? "text-[#00D166] bg-[#00D166]/10" : "text-[#276EF1] bg-[#276EF1]/10"}`}>{r.price}</span>
                  </div>
                  <p className="text-[#A3A3A3] text-sm mb-1" style={{ fontFamily: "Work Sans, sans-serif" }}>{r.desc}</p>
                  <p className="text-[#525252] text-xs">{r.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENTS */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Payment <span className="gradient-text">methods</span></h2>
            <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>We support all major payment methods in Somaliland.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Cash", desc: "Pay the driver directly" },
              { name: "Zaad", desc: "Telesom mobile money" },
              { name: "EVC Plus", desc: "Hormuud mobile money" },
              { name: "Card", desc: "Visa or Mastercard" },
            ].map((p, i) => (
              <div key={p.name} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 text-center hover:border-[#00D166]/40 transition-colors cursor-pointer">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${i % 2 === 0 ? "bg-[#00D166]/10 border border-[#00D166]/20" : "bg-[#276EF1]/10 border border-[#276EF1]/20"}`}>
                  <CreditCard className={`w-5 h-5 ${i % 2 === 0 ? "text-[#00D166]" : "text-[#276EF1]"}`} />
                </div>
                <p className="text-white font-bold text-sm mb-1">{p.name}</p>
                <p className="text-[#A3A3A3] text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to try?</h2>
          <p className="text-[#A3A3A3] text-lg mb-10" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Download the app and get your first ride. Simple as that.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/download" className="bg-[#00D166] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer">
              Download App
            </Link>
            <Link href="/driver" className="border border-[#2a2a2a] text-white font-semibold px-8 py-4 rounded-xl hover:border-[#00D166] transition-colors cursor-pointer">
              Become a Driver
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
