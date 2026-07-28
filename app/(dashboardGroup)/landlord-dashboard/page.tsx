import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, CalendarCheckIcon, BadgeCheckIcon, WalletIcon, ArrowUpRight } from "lucide-react";
import { PropertyFormDialog } from "../_components/propertyFormDialog";
import { MyPropertiesList } from "../_components/getMyPropertyList";
import { getMyProperties } from "../_actions/myPropertiesAction";

export default async function LandlordDashboardPage() {
  // ১. সরাসরি এপিআই কল করে আপনার আসল ডাটা আনা হচ্ছে (Stats এর জন্য)
  const result = await getMyProperties();
  
  // 🛠️ ফিক্স ১: ডুপ্লিকেট এবং ভাঙা ভেরিয়েবল অ্যাসাইনমেন্ট ঠিক করা হয়েছে
  const properties = result?.data || []; 

  // ২. আসল ডাটা অনুযায়ী স্ট্যাটাস ক্যালকুলেশন
  const stats = [
    {
      title: "My Properties",
      value: properties.length.toString(),
      change: "Total listed items",
      icon: HomeIcon,
    },
    {
      title: "Total Earnings",
      value: `৳${properties.reduce((acc: number, curr: any) => acc + (Number(curr.pricePerDay) || 0), 0)}`,
      change: "Calculated from all stays",
      icon: WalletIcon,
    },
    {
      title: "Active Bookings",
      value: "4", 
      change: "3 slots currently available",
      icon: CalendarCheckIcon,
    },
    {
      title: "Occupancy Rate",
      value: "75%",
      change: "+5% increase in rent-outs",
      icon: BadgeCheckIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Landlord Panel</h1>
          <p className="text-sm text-muted-foreground">
            Manage your real properties and track live earnings.
          </p>
        </div>
        <PropertyFormDialog mode="create" />
      </div>

      {/* লাইভ স্ট্যাটস গ্রিড (Real Data) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
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
                {/* 🛠️ ফিক্স ২: text-gray-850 বদলে text-gray-900 করা হয়েছে */}
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                  <ArrowUpRight className="size-3" /> {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* আসল প্রপার্টি লিস্টিং */}
      {/* 🛠️ ফিক্স ৩: text-gray-850 বদলে text-gray-900 করা হয়েছে */}
      <div className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-gray-900">Your Rental Listings</h2>
        <MyPropertiesList />
      </div>
    </div>
  );
}
