"use client";

import React from "react";
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
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      const role = user?.data?.profile?.role;
      if (role === "USER" || role === "TENANT")
        router.push("/dashboard/tenant");
      else if (role === "AUTHOR" || role === "LANDLORD")
        router.push("/dashboard/landlord");
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
        router.push("/dashboard/tenant/me");
      } else if (role === "AUTHOR" || role === "LANDLORD") {
        router.push("/dashboard/landlord/me");
      } else if (role === "ADMIN") {
        router.push("/dashboard/admin/me");
      }
      return;
    }
    if (action === "settings") {
      router.push("/dashboard/settings");
      return;
    }
  };

  return (
    <nav className="w-full bg-white border-b-[1px] border-neutral-200 sticky top-0 z-50 px-4 md:px-10 lg:px-20 py-3 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-row items-center justify-between h-12 relative">
        {/* লোগো */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-rose-500 tracking-tight dark:text-rose-400">
            RentNest
          </span>
        </Link>

        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-rose-500 transition-colors text-sm font-medium dark:text-slate-300 dark:hover:text-rose-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-row items-center gap-3">
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="p-2 md:py-1.5 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/80">
                  <Menu
                    size={16}
                    className="text-gray-600 dark:text-slate-300"
                  />
                  <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center dark:bg-slate-600">
                    <User size={14} />
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 rounded-xl shadow-lg border-neutral-100 bg-white dark:bg-slate-900 dark:border-slate-800"
              >
                <DropdownMenuLabel className="font-normal px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                      {user.data?.profile?.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-400">
                      {user.data?.profile?.email}
                    </p>
                    <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-600 px-1.5 py-0.5 rounded-md mt-1 w-max font-bold dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400">
                      {user.data?.profile?.role}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("dashboard")}
                  className="px-4 py-2.5 text-gray-600 cursor-pointer hover:bg-neutral-50 dark:text-slate-300 dark:hover:bg-slate-800 focus:bg-neutral-50 dark:focus:bg-slate-800 focus:text-gray-600 dark:focus:text-slate-200"
                >
                  <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400 dark:text-slate-500" />
                  <span className="text-sm">Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("profile")}
                  className="px-4 py-2.5 text-gray-600 cursor-pointer hover:bg-neutral-50 dark:text-slate-300 dark:hover:bg-slate-800 focus:bg-neutral-50 dark:focus:bg-slate-800 focus:text-gray-600 dark:focus:text-slate-200"
                >
                  <User className="w-4 h-4 mr-3 text-gray-400 dark:text-slate-500" />
                  <span className="text-sm">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("settings")}
                  className="px-4 py-2.5 text-gray-600 cursor-pointer hover:bg-neutral-50 dark:text-slate-300 dark:hover:bg-slate-800 focus:bg-neutral-50 dark:focus:bg-slate-800 focus:text-gray-600 dark:focus:text-slate-200"
                >
                  <Settings className="w-4 h-4 mr-3 text-gray-400 dark:text-slate-500" />
                  <span className="text-sm">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="dark:bg-slate-800" />

                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="px-4 py-2.5 text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-3 text-red-400 dark:text-red-500" />
                  <span className="text-sm font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-5 text-sm cursor-pointer shadow-none dark:bg-rose-600 dark:hover:bg-rose-700">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
