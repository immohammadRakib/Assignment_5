
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, CalendarCheckIcon, BadgeCheckIcon, WalletIcon, ArrowUpRight } from "lucide-react";
import { getMyProperties, getIncomingRequests } from "../_actions/landlordAction"; // 🎯 ফিক্স: রিয়াল রিকোয়েস্ট একশন ইম্পোর্ট করা হলো
import { IncomingRequestsList } from "../_components/incomingRequest";

export default async function LandlordDashboardPage() {

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // 🎯 লগ আউট করার পর টোকেন না থাকলে ইউজারকে আর ড্যাশবোর্ড দেখতে দিবে না
  if (!token) {
    redirect("/login");
  }
  
  // 🎯 ১. ম্যাজিক ট্রিক: ওল্ড ক্যাশ এড়িয়ে দুটি রিয়াল এপিআই অ্যাকশন একসাথে প্যারালাল ফেচ করা হচ্ছে
  const [propertiesResult, requestsResult] = await Promise.all([
    getMyProperties(),
    getIncomingRequests()
  ]);
  

  // 🛡️ ডিফেনসিভ সেফগার্ড লেয়ার: ডাটাবেজ রেসপন্স অবজেক্ট বা অ্যারে যেভাবে আসুক ক্র্যাশ করবে না
  // const properties = Array.isArray(propertiesResult) 
  //   ? propertiesResult 
  //   : (propertiesResult?.data || []);

  // const incomingRequests = Array.isArray(requestsResult) 
  //   ? requestsResult 
  //   : (requestsResult?.data || requestsResult?.result || []);


 

// ✅ একদম নিখুঁত, ক্র্যাশ-প্রুফ ও ডিফেনসিভ ফিক্সড ডাটা পার্সার:
let properties: any[] = [];
if (Array.isArray(propertiesResult)) {
  properties = propertiesResult;
} else if (propertiesResult && Array.isArray(propertiesResult.data)) {
  properties = propertiesResult.data;
} else if (propertiesResult && propertiesResult.data && Array.isArray(propertiesResult.data.data)) {
  properties = propertiesResult.data.data;
} else if (propertiesResult && Array.isArray(propertiesResult.properties)) {
  properties = propertiesResult.properties;
}

let incomingRequests: any[] = [];
if (Array.isArray(requestsResult)) {
  incomingRequests = requestsResult;
} else if (requestsResult && Array.isArray(requestsResult.data)) {
  incomingRequests = requestsResult.data;
} else if (requestsResult && requestsResult.data && Array.isArray(requestsResult.data.data)) {
  incomingRequests = requestsResult.data.data;
} else if (requestsResult && Array.isArray(requestsResult.result)) {
  incomingRequests = requestsResult.result;
}


  // 🎯 ২. রিয়াল ডাটা স্ট্যাটস ক্যালকুলেশন (টাইপ সেফ অ্যান্ড ডাইনামিক)
const totalEarnings = Array.isArray(incomingRequests)
  ? incomingRequests.reduce((acc: number, curr: any) => {
      if (curr?.status === "CONFIRMED" || curr?.status === "ACTIVE") {
        return acc + (Number(curr?.totalPrice) || 0);
      }
      return acc;
    }, 0)
  : 0;
  // কার্ল ডকস ও তোমার ডাটা রেসপন্স অনুযায়ী PENDING এবং CONFIRMED রিকোয়েস্ট কাউন্টার ফিল্টারিং
  const activeBookingsCount = incomingRequests.filter(
    (r: any) => r?.status === "ACTIVE" || r?.status === "CONFIRMED"
  ).length;

  // ডাইনামিক অকুপেন্সি রেট ক্যালকুলেশন
  const occupancyRate = properties.length > 0 
    ? `${Math.round((activeBookingsCount / properties.length) * 100)}%` 
    : "0%";

  const stats = [
    {
      title: "My Properties",
      value: properties.length.toString(),
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
      change: "Confirmed running leases",
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

      {/* লাইভ স্ট্যাটস গ্রিড কার্ডস */}
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

      {/* 🚀 রিয়াল-টাইম ইনকামিং রেন্টাল রিকোয়েস্ট টেবিল জোন */}
      <div className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-gray-900">Incoming Rental Requests</h2>
        {incomingRequests.length > 0 ? (
          <IncomingRequestsList initialRequests={incomingRequests} />
        ) : (
          <div className="text-center py-10 border border-dashed rounded-xl text-neutral-400 text-sm">
            No incoming tenant applications found. Active listings are broadcasting live.
          </div>
        )}
      </div>
    </div>
  );
}
