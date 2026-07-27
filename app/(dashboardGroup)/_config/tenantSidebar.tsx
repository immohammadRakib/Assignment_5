import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, History, User, Heart } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  { 
    label: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    label: "My Bookings", 
    href: "/dashboard/bookings", // ভাড়াটিয়ার বুকিং হিস্ট্রি
    icon: History 
  },
  { 
    label: "Wishlist", 
    href: "/dashboard/wishlist", // পছন্দের প্রপার্টি সেভ রাখার জন্য
    icon: Heart 
  },
  { 
    label: "My Profile", 
    href: "/dashboard/profile", 
    icon: User 
  },
];
