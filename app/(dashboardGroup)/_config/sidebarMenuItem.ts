import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebar"
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebar";
import { TENANT_SIDEBAR_ITEMS } from "./tenantSidebar"


const USER_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Posts",
        href : "/dashboard/my-posts",
        icon : FileText
    },
]


export const sidebarMenuItems = {
    TENANT : TENANT_SIDEBAR_ITEMS,
    LANDLORD: LANDLORD_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}