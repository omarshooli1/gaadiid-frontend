import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00D166] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-xl">Gaadiid</span>
            </div>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              Safe, affordable, and reliable transport across Somaliland. Available 24/7 in Hargeisa, Berbera, Burao & more.
            </p>
            {/* App Store Buttons */}
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-3 bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 hover:border-[#00D166] transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-[#A3A3A3] text-xs">Download on the</div>
                  <div className="text-white text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 hover:border-[#00D166] transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 shrink-0">
                  <path d="M3.18 23.76c.33.19.7.24 1.07.14l12.2-7.04-2.62-2.62-10.65 9.52zM.52 1.44C.2 1.8 0 2.35 0 3.06v17.88c0 .71.2 1.26.53 1.62l.09.08 10.02-10.02v-.24L.61 1.36l-.09.08zM20.8 10.53l-2.85-1.65-2.93 2.93 2.93 2.93 2.87-1.66c.82-.47.82-1.24-.02-1.55zM4.25.1L16.45 7.14l-2.62 2.62L3.18.24C3.52.14 3.92.19 4.25.1z"/>
                </svg>
                <div>
                  <div className="text-[#A3A3A3] text-xs">Get it on</div>
                  <div className="text-white text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Blog", "Investors"].map(i => (
                <li key={i}><a href="#" className="text-[#A3A3A3] hover:text-white text-sm transition-colors cursor-pointer">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {["Ride", "Gaadiid Business", "Gaadiid Parcel", "Schedule a Ride", "Gaadiid Women"].map(i => (
                <li key={i}><a href="#" className="text-[#A3A3A3] hover:text-white text-sm transition-colors cursor-pointer">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* Safety */}
          <div>
            <h4 className="text-white font-semibold mb-4">Safety</h4>
            <ul className="space-y-3">
              {["Safety Center", "Community Guidelines", "Non-Discrimination", "Accessibility", "Contact Us"].map(i => (
                <li key={i}><a href="#" className="text-[#A3A3A3] hover:text-white text-sm transition-colors cursor-pointer">{i}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#525252] text-sm">© 2025 Gaadiid Technologies. All rights reserved. Hargeisa, Somaliland.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map(i => (
              <a key={i} href="#" className="text-[#525252] hover:text-white text-sm transition-colors cursor-pointer">{i}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
