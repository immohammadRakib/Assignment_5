"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HomeIcon, 
  CalendarCheckIcon, 
  BadgeCheckIcon, 
  WalletIcon, 
  ArrowUpRight, 
  PlusIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyFormDialog } from "../_components/propertyFormDialog";
import { MyPropertiesList } from "../_components/getMyPropertyList"

// বাড়ির মালিকদের জন্য কাস্টম ডামি স্ট্যাটস ডাটা
const landlordStats = [
  {
    title: "My Properties",
    value: "12",
    change: "+2 new listed this month",
    icon: HomeIcon,
  },
  {
    title: "Active Bookings",
    value: "4",
    change: "3 slots currently available",
    icon: CalendarCheckIcon,
  },
  {
    title: "Total Earnings",
    value: "৳45,200",
    change: "+18% from last month",
    icon: WalletIcon,
  },
  {
    title: "Occupancy Rate",
    value: "75%",
    change: "+5% increase in rent-outs",
    icon: BadgeCheckIcon,
  },
];

export default function LandlordDashboardPage() {
  return (
    <div className="space-y-6">
      {/* हेडर সেকশন (Airbnb/RentNest Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Landlord Panel</h1>
          <p className="text-sm text-muted-foreground">
            Manage your rental listings, track bookings, and check real-time earnings.
          </p>
        </div>
        {/* 🎯 নতুন প্রপার্টি এড করার জন্য আমরা যে ডায়ালগটি বানিয়েছিলাম, তা এখানে যুক্ত করা হলো */}
        <PropertyFormDialog mode="create" />
      </div>

      {/* ৪ কলামের স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {landlordStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-neutral-100 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
                  <Icon className="size-4 shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-850">{stat.value}</div>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                  <ArrowUpRight className="size-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 🎯 ল্যান্ডলর্ডের নিজের প্রপার্টিগুলোর লাইভ গ্রিড লিস্ট */}
      <div className="space-y-3 pt-4">
        <div>
          <h2 className="text-lg font-bold text-gray-850">Your Rental Listings</h2>
          <p className="text-xs text-muted-foreground">Active houses and apartments currently listed on RentNest.</p>
        </div>
        
        {/* এখানে তোমার তৈরি করা সার্ভার-কম্পোনেন্ট লিস্টটি কল হবে */}
        <MyPropertiesList />
      </div>
    </div>
  );
}
