import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, CalendarCheckIcon, BadgeCheckIcon, WalletIcon, ArrowUpRight } from "lucide-react";
import { getMyProperties } from "../_actions/myPropertiesAction";
import { IncomingRequestsList } from "../_components/incomingRequest";

export default async function LandlordDashboardPage() {
  // ১. ব্যাকএন্ড এপিআই অ্যাকশন কল করা হচ্ছে
  const result = await getMyProperties();
  
  // 🛡️ সেফগার্ড লেয়ার: ডাটাবেজ বা রেসপন্স পুরোপুরি খালি (null/undefined) হলেও কোড ক্র্যাশ করবে না
  const properties = Array.isArray(result?.data) ? result.data : [];
  const incomingRequests = Array.isArray(result?.requests) ? result.requests : [];

  // ২. রিয়েল ডাটা স্ট্যাটস ক্যালকুলেশন (টাইপ সেফ)
  const totalEarnings = properties.reduce(
    (acc: number, curr: any) => acc + (Number(curr?.pricePerDay) || 0), 
    0
  );

  const activeBookingsCount = incomingRequests.filter(
    (r: any) => r?.status === "ACTIVE"
  ).length;

  // ডাইনামিক অকুপেন্সি রেট ক্যালকুলেশন
  const occupancyRate = properties.length > 0 
    ? `${Math.round((activeBookingsCount / properties.length) * 100)}%` 
    : "0%";

  const stats = [
    {
      title: "My Properties",
      value: properties.length.toString(), // এখন আর কখনো undefined হবে না
      change: "Total listed items",
      icon: HomeIcon,
    },
    {
      title: "Total Earnings",
      value: `৳${totalEarnings}`,
      change: "Calculated from listed assets",
      icon: WalletIcon,
    },
    {
      title: "Active Bookings",
      value: activeBookingsCount.toString(),
      change: "Stays currently running",
      icon: CalendarCheckIcon,
    },
    {
      title: "Occupancy Rate",
      value: occupancyRate,
      change: "Live rental statistics",
      icon: BadgeCheckIcon,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Landlord Overview</h1>
          <p className="text-sm text-muted-foreground">
            Monitor real-time rental applications, track live revenue data, and oversee platform performance.
          </p>
        </div>
      </div>

      {/* লাইভ স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-neutral-100 bg-white rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
                  <Icon className="size-4 shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                  <ArrowUpRight className="size-3" /> {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* রিয়েল-টাইম ইনকামিং রেন্টাল রিকোয়েস্ট টেবিল */}
      <div className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-gray-900">Incoming Rental Requests</h2>
        {incomingRequests.length > 0 ? (
          <IncomingRequestsList initialRequests={incomingRequests} />
        ) : (
          <div className="text-center py-10 border border-dashed rounded-xl text-neutral-400 text-sm">
            No incoming tenant applications found.
          </div>
        )}
      </div>

    </div>
  );
}
