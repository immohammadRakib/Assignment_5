"use client"; // Remove this line if you decide to fetch data directly in a Server Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarDaysIcon, 
  HeartIcon, 
  CreditCardIcon, 
  ClockIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 🎯 Ensure 'export default' is present and the function name is unique
export default function TenantDashboardPage() {
  
  // Dummy Stats for Tenant (Requirement 1: Modern UI)
  const tenantStats = [
    { title: "Active Bookings", value: "", desc: "Your ongoing rentals", icon: CalendarDaysIcon },
    { title: "Wishlist", value: "", desc: "Properties you liked", icon: HeartIcon },
    { title: "Total Spent", value: "৳", desc: "Paid through RentNest", icon: CreditCardIcon },
    { title: "Pending", value: "", desc: "Awaiting landlord response", icon: ClockIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tenant Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your rentals and view your payment history.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tenantStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-neutral-100 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase text-gray-500">{stat.title}</CardTitle>
                <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Placeholder for Booking List (Requirement 5: CRUD/Functionality) */}
      <Card className="p-8 text-center border-dashed border-2">
        <p className="text-muted-foreground">You have no upcoming bookings.</p>
        <Link href="/properties">
          <Button className="mt-4 bg-rose-500 hover:bg-rose-600 cursor-pointer">
            Browse Properties
          </Button>
        </Link>
      </Card>
    </div>
  );
}
