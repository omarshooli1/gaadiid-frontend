export const dynamic = "force-static";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808]">
      <AdminSidebar />
      <div className="md:ml-60">
        <div className="pt-14 md:pt-0 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
