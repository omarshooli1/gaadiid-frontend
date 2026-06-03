import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Star, Smartphone } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <section className="pt-40 pb-24 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00D166]/10 border border-[#00D166]/20 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-[#00D166] fill-[#00D166]" />
              <span className="text-[#00D166] text-sm font-medium">4.8 stars · 50,000+ downloads</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Get the<br /><span className="gradient-text">Gaadiid App</span>
            </h1>
            <p className="text-[#A3A3A3] text-lg leading-relaxed mb-10" style={{ fontFamily: "Work Sans, sans-serif" }}>
              Available on iOS and Android. Download for free and book your first ride in under 60 seconds.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Book rides in 30 seconds",
                "Live GPS tracking",
                "Pay with Zaad, EVC Plus, or cash",
                "Share trip with family",
                "Emergency SOS button",
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#00D166]" />
                  <span className="text-[#E5E5E5] text-sm" style={{ fontFamily: "Work Sans, sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors cursor-pointer justify-center">
                <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6 shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-[#00D166] text-black px-6 py-4 rounded-2xl font-bold hover:bg-[#00A350] transition-colors cursor-pointer justify-center">
                <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6 shrink-0">
                  <path d="M3.18 23.76c.33.19.7.24 1.07.14l12.2-7.04-2.62-2.62-10.65 9.52zM.52 1.44C.2 1.8 0 2.35 0 3.06v17.88c0 .71.2 1.26.53 1.62l.09.08 10.02-10.02v-.24L.61 1.36l-.09.08zM20.8 10.53l-2.85-1.65-2.93 2.93 2.93 2.93 2.87-1.66c.82-.47.82-1.24-.02-1.55zM4.25.1L16.45 7.14l-2.62 2.62L3.18.24C3.52.14 3.92.19 4.25.1z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-black/60">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code area */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-10 text-center">
              <Smartphone className="w-16 h-16 text-[#00D166] mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Scan to Download</h3>
              <p className="text-[#A3A3A3] text-sm mb-6" style={{ fontFamily: "Work Sans, sans-serif" }}>
                Point your phone camera at this QR code to go straight to the app download.
              </p>
              {/* QR code placeholder */}
              <div className="w-44 h-44 bg-white rounded-2xl mx-auto flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 p-3">
                  {Array(25).fill(0).map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
              <p className="text-[#525252] text-xs mt-4">Coming soon on both platforms</p>
            </div>
            <div className="flex gap-4 w-full">
              {[{ label: "Version", value: "2.4.1" }, { label: "Size", value: "42 MB" }, { label: "Rating", value: "4.8 / 5" }].map(s => (
                <div key={s.label} className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-[#525252] text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
