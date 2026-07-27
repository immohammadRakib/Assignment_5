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
    href: "/landlord-dashboard/properties", // মালিকের আপলোড করা সব বাসা/ফ্ল্যাট
    icon: Home 
  },
  { 
    label: "Add Property", 
    href: "/landlord-dashboard/properties/add", // নতুন প্রপার্টি লিস্টিং ফর্মের রুট
    icon: PlusCircle 
  },
  { 
    label: "Profile Settings", 
    href: "/landlord-dashboard/profile", 
    icon: User 
  },
];
