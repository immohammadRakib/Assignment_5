"use client";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItem"; 

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();
  let navItems: ISidebarItem[] = [];

  const userRole = user?.data?.profile?.role;

  if (userRole === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (userRole === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (userRole === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

const MenuButton = SidebarMenuButton as any;

  return (
    <Sidebar 
      collapsible="none" 
      className="h-[calc(100svh-0rem)] border-r border-sidebar-border bg-white"
    >
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <MenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className="data-[active=true]:bg-rose-50 data-[active=true]:text-rose-500 hover:bg-neutral-50 hover:text-gray-900 transition-colors py-5 rounded-lg px-4"
                  >
                    <Link href={item.href} className="flex items-center gap-3 font-medium text-sm">
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </MenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
