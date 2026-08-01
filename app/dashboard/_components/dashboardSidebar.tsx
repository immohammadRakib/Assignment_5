"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, PlusCircle, Inbox, Building, 
  Clock, CreditCard, Star, Users, ShieldAlert, Activity,
  LogOut, ChevronRight, Home, UserCheck, Settings, Layers
} from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "sonner";

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const role = user?.data?.profile?.role || user?.data?.role || "TENANT";

  const panelTitle = role === "ADMIN" ? "Admin Panel" : role === "LANDLORD" ? "Landlord Panel" : "Tenant Panel";

  const menuConfig = {
    ADMIN: [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "My Profile", href: "/dashboard/admin/me", icon: UserCheck },
      { label: "User Management", href: "/dashboard/admin/users", icon: Users },
      { label: "Manage Categories", href: "/dashboard/admin/categories", icon: Layers },
      { label: "Property Moderation", href: "/dashboard/admin/moderation", icon: ShieldAlert },
      { label: "Settings Panel", href: "/dashboard/settings", icon: Settings },
    ],
    LANDLORD: [
      { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
      { label: "My Profile", href: "/dashboard/landlord/me", icon: UserCheck },
      { label: "Create Listing", href: "/dashboard/landlord/properties/new", icon: PlusCircle },
      { label: "Incoming Requests", href: "/dashboard/landlord/requests", icon: Inbox },
      { label: "My Listings", href: "/dashboard/landlord/my-properties", icon: Building },
      { label: "Settings Panel", href: "/dashboard/settings", icon: Settings },
    ],
    TENANT: [
      { label: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
      { label: "My Profile", href: "/dashboard/tenant/me", icon: UserCheck },
      { label: "Rental Requests", href: "/dashboard/tenant/requests", icon: Clock },
      { label: "Payment History", href: "/dashboard/tenant/payments", icon: CreditCard },
      // { label: "Reviews", href: "/dashboard/tenant/reviews", icon: Star },
      { label: "Settings Panel", href: "/dashboard/settings", icon: Settings },
    ]
  };

  const currentMenuItems = menuConfig[role as keyof typeof menuConfig] || menuConfig.TENANT;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 dark:border-slate-800 border-r border-neutral-100 p-6 hidden md:flex flex-col justify-between shrink-0 sticky top-16 h-[calc(100vh-4rem)] select-none mt-4">
      <div className="space-y-8">
        
        <div className="px-5 py-4 bg-rose-50/50 border border-rose-100/50 rounded-[24px] relative overflow-hidden group">
          <div className="absolute -right-2 -top-2 w-12 h-12 bg-rose-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-500/80">Authorized Access</p>
          <h4 className="text-base font-black text-gray-900 mt-1 tracking-tight">{panelTitle}</h4>
          <p className="text-[11px] font-medium text-gray-500 truncate mt-1">{user?.data?.profile?.email || user?.data?.email}</p>
        </div>

        <nav className="space-y-2">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${
                  isActive 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-200" 
                    : "text-gray-500 hover:bg-neutral-50 hover:text-rose-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-rose-500"}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "text-white/80" : "text-gray-400"}`} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-neutral-50 pt-6">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold text-gray-500 hover:bg-neutral-50 hover:text-gray-900 transition-all group">
          <Home className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-900" />
          <span>Back to Home</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-black text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
