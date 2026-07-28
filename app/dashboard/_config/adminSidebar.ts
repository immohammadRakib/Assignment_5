import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, Users, Home, Settings } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { 
    label: "Admin Dashboard", 
    href: "/admin-dashboard", 
    icon: LayoutDashboard 
  },
  { 
    label: "Manage Users", 
    href: "/admin-dashboard/users", 
    icon: Users 
  },
  { 
    label: "All Properties", 
    href: "/admin-dashboard/properties",
    icon: Home 
  },
  { 
    label: "Settings", 
    href: "/admin-dashboard/settings", 
    icon: Settings 
  },
];
