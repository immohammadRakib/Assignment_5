import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, Users, Home, Settings } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { 
    label: "Admin Dashboard", 
    href: "/admin-dashboard", // 🎯 বড় হাতের 'A' ফিক্স করে ছোট হাতের করা হলো
    icon: LayoutDashboard 
  },
  { 
    label: "Manage Users", 
    href: "/admin-dashboard/users", // 🎯 ইউজার ম্যানেজ করার জন্য রুট
    icon: Users 
  },
  { 
    label: "All Properties", 
    href: "/admin-dashboard/properties", // 🎯 সব প্রপার্টি দেখভাল করার জন্য রুট
    icon: Home 
  },
  { 
    label: "Settings", 
    href: "/admin-dashboard/settings", 
    icon: Settings 
  },
];
