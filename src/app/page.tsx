import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin, Clock, Shield, Star, ChevronRight, Users, Car,
  Smartphone, CreditCard, Navigation, Bell, CheckCircle, ArrowRight,
  Phone, Zap, Award, TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const cities = ["Hargeisa", "Berbera", "Burao", "Borama", "Gabiley", "Sheikh"];
  const stats = [
    { value: "50K+", label: "Happy Riders" },
    { value: "2.5K+", label: "Active Drivers" },
    { value: "6", label: "Cities Covered" },
    { value: "4.8★", label: "App Rating" },
  ];
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#00D166]" />,
      title: "Book in 30 Seconds",
      desc: "Open the app, set your destination, and get matched with the nearest driver instantly.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#276EF1]" />,
      title: "Ride with Safety",
      desc: "Every driver is background-checked. Share your trip with family. SOS button always available.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#00D166]" />,
      title: "Pay Your Way",
      desc: "Cash, Zaad, EVC Plus, or card. Transparent pricing with no hidden fees.",
    },
    {
      icon: <Navigation className="w-6 h-6 text-[#276EF1]" />,
      title: "Live GPS Tracking",
      desc: "Track your driver in real time. Know exactly when they will arrive.",
    },
    {
      icon: <Star className="w-6 h-6 text-[#00D166]" />,
      title: "Rate Every Trip",
      desc: "After each ride, rate your experience. We maintain quality through community feedback.",
    },
    {
      icon: <Bell className="w-6 h-6 text-[#276EF1]" />,
      title: "Scheduled Rides",
      desc: "Plan ahead by scheduling rides up to 7 days in advance. Never miss a flight or meeting.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient pt-24">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#00D166 1px, transparent 1px), linear-gradient(90deg, #00D166 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D166] opacity-[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#276EF1] opacity-[0.06] rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00D166] animate-pulse" />
              <span className="text-[#00D166] text-sm font-medium">Now available in 6 Somaliland cities</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Your Ride,
              <br />
              <span className="gradient-text">Your Way.</span>
            </h1>

            <p className="text-[#A3A3A3] text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ fontFamily: "Work Sans, sans-serif" }}>
              The smartest way to move around Somaliland. Affordable, safe, and always on time. Book a ride in under 30 seconds.
            </p>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4 mb-8 max-w-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#00D166]" />
                <input type="text" placeholder="Your current location"
                  className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-[#525252]" readOnly />
              </div>
              <div className="h-px bg-[#2a2a2a] mb-3" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#276EF1]" />
                <input type="text" placeholder="Where to?"
                  className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-[#525252]" readOnly />
                <Link href="/download" className="bg-[#00D166] text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer whitespace-nowrap">
                  Book Ride
                </Link>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#" className="flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 hover:border-[#00D166] transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-[#A3A3A3] text-xs">Download on</div>
                  <div className="text-white text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 hover:border-[#00D166] transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 shrink-0">
                  <path d="M3.18 23.76c.33.19.7.24 1.07.14l12.2-7.04-2.62-2.62-10.65 9.52zM.52 1.44C.2 1.8 0 2.35 0 3.06v17.88c0 .71.2 1.26.53 1.62l.09.08 10.02-10.02v-.24L.61 1.36l-.09.08zM20.8 10.53l-2.85-1.65-2.93 2.93 2.93 2.93 2.87-1.66c.82-.47.82-1.24-.02-1.55zM4.25.1L16.45 7.14l-2.62 2.62L3.18.24C3.52.14 3.92.19 4.25.1z"/>
                </svg>
                <div>
                  <div className="text-[#A3A3A3] text-xs">Get it on</div>
                  <div className="text-white text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="w-72 h-[580px] bg-[#111111] rounded-[44px] border-4 border-[#2a2a2a] shadow-2xl overflow-hidden relative">
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                  <span className="text-white text-xs font-semibold">9:41</span>
                  <div className="w-24 h-5 bg-[#0a0a0a] rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-white rounded-sm opacity-80" />
                  </div>
                </div>
                <div className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[#A3A3A3] text-xs">Good morning,</p>
                    <p className="text-white text-base font-bold">Cabdi Raxmaan</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#00D166]/20 border border-[#00D166]/30 flex items-center justify-center">
                    <span className="text-[#00D166] text-sm font-bold">CR</span>
                  </div>
                </div>
                <div className="mx-4 rounded-2xl overflow-hidden relative" style={{ height: 220 }}>
                  <div className="absolute inset-0 bg-[#1a2a1a]" />
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 220">
                    <line x1="0" y1="110" x2="300" y2="110" stroke="#00D166" strokeWidth="3"/>
                    <line x1="150" y1="0" x2="150" y2="220" stroke="#00D166" strokeWidth="2"/>
                    <line x1="80" y1="0" x2="220" y2="220" stroke="#276EF1" strokeWidth="1.5" strokeDasharray="8,4"/>
                    <line x1="0" y1="60" x2="300" y2="160" stroke="#444" strokeWidth="1"/>
                    <rect x="60" y="80" width="40" height="30" fill="#1e2e1e" rx="4"/>
                    <rect x="180" y="55" width="50" height="35" fill="#1e2e1e" rx="4"/>
                    <rect x="120" y="130" width="35" height="25" fill="#1e2e1e" rx="4"/>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#00D166] animate-ping-slow" />
                      <div className="w-10 h-10 rounded-full bg-[#00D166] border-4 border-white flex items-center justify-center relative z-10">
                        <Car className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-6">
                    <div className="w-5 h-5 rounded-full bg-[#276EF1] border-2 border-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#080808]/90 rounded-lg px-3 py-1.5">
                    <p className="text-[#00D166] text-xs font-bold">4 min away</p>
                  </div>
                </div>
                <div className="mx-4 mt-3 bg-[#1a1a1a] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#276EF1]/20 border border-[#276EF1]/30 flex items-center justify-center">
                      <span className="text-[#276EF1] text-sm font-bold">AH</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Axmed Xirsi</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-[#A3A3A3] text-xs">4.92 · Toyota Corolla</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#00D166] flex items-center justify-center cursor-pointer">
                      <Phone className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-[#A3A3A3] text-xs">Plate</p>
                      <p className="text-white text-xs font-bold">SL-4821</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#A3A3A3] text-xs">ETA</p>
                      <p className="text-[#00D166] text-xs font-bold">4 min</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#A3A3A3] text-xs">Fare</p>
                      <p className="text-white text-xs font-bold">~$3.50</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-16 top-20 bg-[#111111] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00D166]" />
                  <span className="text-white text-xs font-semibold">Driver verified</span>
                </div>
              </div>
              <div className="absolute -right-16 bottom-32 bg-[#111111] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#276EF1]" />
                  <span className="text-white text-xs font-semibold">Avg. 5 min wait</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{s.value}</div>
              <div className="text-[#A3A3A3] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#276EF1]/10 border border-[#276EF1]/20 rounded-full px-4 py-2 mb-6">
              <span className="text-[#276EF1] text-sm font-medium">Why Gaadiid?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Everything you need<br /><span className="gradient-text">in one app</span>
            </h2>
            <p className="text-[#A3A3A3] text-lg max-w-xl mx-auto" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Built specifically for Somaliland — from local payment methods to familiar city routes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 card-hover cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-[#181818] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Ride in <span className="gradient-text">3 steps</span>
            </h2>
            <p className="text-[#A3A3A3] text-lg" style={{ fontFamily: "Work Sans, sans-serif" }}>Getting a ride has never been this easy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Smartphone className="w-8 h-8" />, title: "Open the App", desc: "Download Gaadiid and enter your pickup location. The app uses your GPS automatically.", color: "green" },
              { step: "02", icon: <Car className="w-8 h-8" />, title: "Get Matched", desc: "We instantly connect you with the nearest available, verified driver in your area.", color: "blue" },
              { step: "03", icon: <CheckCircle className="w-8 h-8" />, title: "Ride & Pay", desc: "Enjoy your trip and pay by cash, Zaad, EVC Plus, or card. Rate your driver afterwards.", color: "green" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${item.color === "green" ? "bg-[#00D166]/10 border border-[#00D166]/20 text-[#00D166]" : "bg-[#276EF1]/10 border border-[#276EF1]/20 text-[#276EF1]"}`}>
                  {item.icon}
                </div>
                <div className="text-[#525252] text-sm font-mono mb-2">{item.step}</div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Work Sans, sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Available <span className="gradient-text">near you</span></h2>
              <p className="text-[#A3A3A3]" style={{ fontFamily: "Work Sans, sans-serif" }}>Operating across major Somaliland cities.</p>
            </div>
            <Link href="/download" className="text-[#00D166] flex items-center gap-2 font-semibold hover:gap-3 transition-all cursor-pointer text-sm">
              See all cities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <div key={city} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 text-center hover:border-[#00D166]/50 transition-all duration-200 card-hover cursor-pointer group">
                <MapPin className="w-5 h-5 text-[#00D166] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-white font-semibold text-sm">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0d1f0f] to-[#0a0d1a] border border-[#00D166]/20 rounded-3xl p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-[#00D166]" />
                <span className="text-[#00D166] text-sm font-medium">Earn on your schedule</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Drive with<br /><span className="gradient-text">Gaadiid</span></h2>
              <p className="text-[#A3A3A3] text-lg leading-relaxed mb-8" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Join thousands of drivers earning good income with full flexibility. Set your own hours, drive as much or as little as you want.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/driver" className="bg-[#00D166] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#00A350] transition-colors cursor-pointer text-center">
                  Start Earning Today
                </Link>
                <Link href="/how-it-works" className="border border-[#2a2a2a] text-white font-semibold px-8 py-4 rounded-xl hover:border-[#00D166] transition-colors cursor-pointer text-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Award className="w-6 h-6 text-[#00D166]" />, title: "Weekly Payouts", desc: "Receive your earnings every week directly to Zaad or EVC Plus." },
                { icon: <Users className="w-6 h-6 text-[#276EF1]" />, title: "Driver Community", desc: "Join a growing community of professional drivers in Somaliland." },
                { icon: <Shield className="w-6 h-6 text-[#00D166]" />, title: "Insurance Cover", desc: "You are covered while you drive. Safety is our top priority." },
                { icon: <Clock className="w-6 h-6 text-[#276EF1]" />, title: "Flexible Hours", desc: "Drive when it suits you. Morning, evening, or weekends only." },
              ].map((item) => (
                <div key={item.title} className="bg-[#111111]/80 border border-[#2a2a2a] rounded-2xl p-4">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-[#A3A3A3] text-xs leading-relaxed" style={{ fontFamily: "Work Sans, sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Loved by <span className="gradient-text">Somalilanders</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Faadumo Axmed", role: "Daily commuter, Hargeisa", text: "Gaadiid changed how I get to work. No more haggling over fares. I know the price before I even get in the car. Amazing app!", rating: 5 },
              { name: "Cabdiraxmaan Cali", role: "Driver Partner, Berbera", text: "I have doubled my income since joining Gaadiid. The app is simple to use and payments come through Zaad every week without fail.", rating: 5 },
              { name: "Xaawo Nuur", role: "University student, Hargeisa", text: "As a student, safety matters to me. I love that I can share my trip with my family. The drivers are always professional and the cars are clean.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 card-hover">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[#E5E5E5] text-sm leading-relaxed mb-6" style={{ fontFamily: "Work Sans, sans-serif" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D166] to-[#276EF1] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#A3A3A3] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Ready to ride?</h2>
          <p className="text-[#A3A3A3] text-xl mb-10" style={{ fontFamily: "Work Sans, sans-serif" }}>
            Download Gaadiid and book your first ride in under 60 seconds.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="#" className="flex items-center gap-3 bg-[#00D166] text-black px-8 py-4 rounded-2xl font-bold hover:bg-[#00A350] transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                <path d="M3.18 23.76c.33.19.7.24 1.07.14l12.2-7.04-2.62-2.62-10.65 9.52zM.52 1.44C.2 1.8 0 2.35 0 3.06v17.88c0 .71.2 1.26.53 1.62l.09.08 10.02-10.02v-.24L.61 1.36l-.09.08zM20.8 10.53l-2.85-1.65-2.93 2.93 2.93 2.93 2.87-1.66c.82-.47.82-1.24-.02-1.55zM4.25.1L16.45 7.14l-2.62 2.62L3.18.24C3.52.14 3.92.19 4.25.1z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
