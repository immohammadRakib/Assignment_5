"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";
import { LayoutDashboard, LogOut, Settings, User, Menu, Globe, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

// ডেক্সটপ সেন্ট্রাল সার্চ বার (Airbnb Style)
function SearchBar() {
  return (
    <div className="hidden md:flex border-[1px] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer items-center justify-between absolute left-1/2 transform -translate-x-1/2">
      <div className="text-xs font-semibold px-4 text-gray-800">Anywhere</div>
      <div className="text-xs font-semibold px-4 border-x-[1px] text-gray-800">Any Week</div>
      <div className="text-xs pl-4 pr-2 text-gray-600 flex flex-row items-center gap-2">
        <div className="text-gray-500">Add Guests</div>
        <div className="p-1.5 bg-rose-500 rounded-full text-white">
          <Search size={12} />
        </div>
      </div>
    </div>
  );
}

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      const role = user?.data?.profile?.role;
      if (role === "USER") router.push("/dashboard");
      else if (role === "AUTHOR") router.push("/author-dashboard");
      else if (role === "ADMIN") router.push("/admin-dashboard");
      return;
    }

    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="w-full bg-white border-b-[1px] sticky top-0 z-50 px-4 md:px-10 lg:px-20 py-3">
      <div className="flex flex-row items-center justify-between h-12 relative">
        
        {/* লোগো (Airbnb Style Rose Color) */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-rose-500 tracking-tight">
            airbnb
          </span>
        </Link>

        {/* সার্চ বার (Airbnb Style) */}
        <SearchBar />

        {/* ডানদিকের অপশন এবং ইউজার মেনু */}
        <div className="flex flex-row items-center gap-3">
          <div className="hidden md:block text-xs font-semibold py-2 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer text-gray-700">
            Airbnb your home
          </div>
          <div className="hidden md:block p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-gray-700">
            <Globe size={16} />
          </div>

          {/* লগইন স্ট্যাটাস চেক */}
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Airbnb-এর মতো মেনু + প্রোফাইল বাটন */}
                <div className="p-2 md:py-1.5 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white">
                  <Menu size={16} className="text-gray-600" />
                  <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    <User size={14} />
                  </div>
                </div>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-neutral-100">
                <DropdownMenuLabel className="font-normal px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-gray-800">{user.data?.profile?.name}</p>
                    <p className="text-xs text-gray-400">{user.data?.profile?.email}</p>
                    <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-600 px-1.5 py-0.5 rounded-md mt-1 w-max font-bold">
                      {user.data?.profile?.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem 
                      key={item.action} 
                      onClick={() => handleUserMenuAction(item.action)}
                      className="px-4 py-2.5 text-gray-600 cursor-pointer hover:bg-neutral-50"
                    >
                      <Icon className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-sm">{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => handleUserMenuAction("logout")}
                  className="px-4 py-2.5 text-red-600 cursor-pointer hover:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-3 text-red-400" />
                  <span className="text-sm font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-5 text-sm cursor-pointer shadow-none">
                Login
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}
