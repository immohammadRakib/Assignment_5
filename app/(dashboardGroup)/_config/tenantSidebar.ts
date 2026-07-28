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
    href: "/dashboard/bookings",
    icon: History 
  },
  { 
    label: "Wishlist", 
    href: "/dashboard/wishlist",
    icon: Heart 
  },
  { 
    label: "My Profile", 
    href: "/dashboard/profile", 
    icon: User 
  },
];
