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
import { LayoutDashboard, LogOut, Settings, User, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";


const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Properties", href: "/properties" },
  { label: "Premium", href: "/premium" },
];

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
      if (role === "USER" || role === "TENANT") router.push("/dashboard/tenant");
      else if (role === "AUTHOR" || role === "LANDLORD") router.push("/dashboard/landlord");
      else if (role === "ADMIN") router.push("/dashboard/admin");
      return;
    }
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/auth/login");
    }
    if (action === "profile") {
      const role = user?.data?.profile?.role;
    if (role === "USER" || role === "TENANT") {
      router.push("/dashboard/tenant/me"); // টেন্যান্টের সেই প্রিমিয়াম প্রোফাইল পেজ
    } else if (role === "AUTHOR" || role === "LANDLORD") {
      router.push("/dashboard/landlord"); // ল্যান্ডলর্ডের জন্য ডিফল্ট ওভারভিউ/প্রোফাইল
    } else if (role === "ADMIN") {
      router.push("/dashboard/admin");
    }
    return;
  }

  // 🎯 ৩. সেটিংস রিডাইরেক্ট লজিক
  if (action === "settings") {
    const role = user?.data?.profile?.role;
    if (role === "USER" || role === "TENANT") {
      router.push("/dashboard/settings"); // সেটিংস এবং প্রোফাইল একই পেজে হ্যান্ডেল করা হয়েছে
    } else if (role === "AUTHOR" || role === "LANDLORD") {
      router.push("/dashboard/settings");
    } else if (role === "ADMIN") {
      router.push("/dashboard/settings");
    }
    return;
  }
  };

  return (
    <nav className="w-full bg-white border-b-[1px] border-neutral-200 sticky top-0 z-50 px-4 md:px-10 lg:px-20 py-3">
      <div className="flex flex-row items-center justify-between h-12 relative">
        
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-rose-500 tracking-tight">
            RentNest
          </span>
        </Link>

        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-rose-500 transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-row items-center gap-3">
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="p-2 md:py-1.5 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white">
                  <Menu size={16} className="text-gray-600" />
                  <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    <User size={14} />
                  </div>
                </div>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-neutral-100 bg-white">
                <DropdownMenuLabel className="font-normal px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.data?.profile?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.data?.profile?.email}
                    </p>
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
            <Link href="/auth/login">
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
