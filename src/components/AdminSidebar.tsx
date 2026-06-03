"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Car, CreditCard, Settings, LogOut, Menu, X, Shield } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" || pathname === "/admin/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNav}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-[#00D166]/10 text-[#00D166] border border-[#00D166]/20"
                : "text-[#A3A3A3] hover:text-white hover:bg-[#181818] border border-transparent"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNav }: { onNav?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#2a2a2a]">
        <div className="w-8 h-8 rounded-lg bg-[#00D166] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-black" />
        </div>
        <div>
          <span className="text-white font-bold text-sm leading-none">Gaadiid</span>
          <span className="block text-[#525252] text-[10px] mt-0.5">Admin Panel</span>
        </div>
      </div>

      <NavItems onNav={onNav} />

      <div className="px-3 py-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#181818] cursor-pointer group transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#276EF1]/15 border border-[#276EF1]/25 flex items-center justify-center shrink-0">
            <span className="text-[#276EF1] text-xs font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Admin</p>
            <p className="text-[#525252] text-[10px] truncate">admin@gaadiid.so</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-[#525252] group-hover:text-red-400 transition-colors shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0d0d0d] border-r border-[#2a2a2a] fixed top-0 left-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 h-14 flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="text-white cursor-pointer p-1">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#00D166] flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-white font-bold text-sm">Gaadiid Admin</span>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-[#2a2a2a]">
            <div className="flex items-center justify-between px-5 h-14 border-b border-[#2a2a2a]">
              <span className="text-white font-bold text-sm">Menu</span>
              <button onClick={() => setOpen(false)} className="text-[#A3A3A3] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
              <SidebarContent onNav={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
