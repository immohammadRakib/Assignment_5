import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, Home, PlusCircle, User, Settings } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  { 
    label: "Landlord Dashboard", 
    href: "/landlord-dashboard", 
    icon: LayoutDashboard 
  },
  { 
    label: "My Properties", 
    href: "/landlord-dashboard/properties", 
    icon: Home 
  },
  { 
    label: "Add Property", 
    href: "/landlord-dashboard/properties/add", 
    icon: PlusCircle 
  },
  { 
    label: "Profile Settings", 
    href: "/landlord-dashboard/profile", 
    icon: User 
  },
];
