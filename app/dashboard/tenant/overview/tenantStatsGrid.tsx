'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, ClockIcon, CheckCircleIcon, CreditCardIcon, TrendingUp } from 'lucide-react';

interface StatsProps {
  rentals: any[];
}

const formatEarnings = (num: number) => {
  if (!num) return "0";
  if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, "") + " T";
  if (num >= 1e9) return (num / 1e9).toFixed(2).replace(/\.00$/, "") + " B";
  if (num >= 1e6) return (num / 1e6).toFixed(2).replace(/\.00$/, "") + " M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K";
  return num.toString();
};

export default function TenantStatsGrid({ rentals }: StatsProps) {
  // 📊 রিয়াল ডাটা স্ট্যাটস ক্যালকুলেশন
  const totalSpent = rentals.reduce((acc: number, curr: any) => {
      console.log("Checking Rental:", curr.status, curr.totalPrice);
    return curr.status === "PAID" || curr.status === "CONFIRMED" || curr.status === "ACTIVE" 
      ? acc + (Number(curr.totalPrice) || 0) 
      : acc;
  }, 0);

  const pendingRequests = rentals.filter((r: any) => r.status === "PENDING").length;
  const activeStays = rentals.filter((r: any) => r.status === "PAID" || r.status === "CONFIRMED" || r.status === "ACTIVE").length;

  // const cardData = [
  //   { title: "Total Bookings", value: rentals.length.toString(), change: "All time requests", color: "from-blue-500 to-indigo-500", bgLight: "bg-blue-50 text-blue-600", subText: "Historical rental footprint" },
  //   { title: "Pending Approval", value: pendingRequests.toString(), change: "Waiting for landlord", color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50 text-amber-500", subText: "Awaiting owner response" },
  //   { title: "Active/Confirmed", value: activeStays.toString(), change: "Ready to move or stay", color: "from-emerald-500 to-teal-500", bgLight: "bg-emerald-50 text-emerald-600", subText: "Current active leases" },
  //   { title: "Total Expenses", value: `৳${formatEarnings(totalSpent)}`, change: "Confirmed lease payments", color: "from-rose-500 to-pink-500", bgLight: "bg-rose-50 text-rose-600", subText: "100% Processed Secured" },
  // ];

  // ✅ প্রতিটি অবজেক্টে icon প্রপার্টি যোগ করে ফিক্স করা হলো:
const cardData = [
  { 
    title: "Total Bookings", 
    value: rentals.length.toString(), 
    change: "All time requests", 
    color: "from-blue-500 to-indigo-500", 
    bgLight: "bg-blue-50 text-blue-600", 
    subText: "Historical rental footprint",
    icon: HomeIcon // 🚀 যোগ করা হলো
  },
  { 
    title: "Pending Approval", 
    value: pendingRequests.toString(), 
    change: "Waiting for landlord", 
    color: "from-amber-500 to-orange-500", 
    bgLight: "bg-amber-50 text-amber-500", 
    subText: "Awaiting owner response",
    icon: ClockIcon // 🚀 যোগ করা হলো
  },
  { 
    title: "Active/Confirmed", 
    value: activeStays.toString(), 
    change: "Ready to move or stay", 
    color: "from-emerald-500 to-teal-500", 
    bgLight: "bg-emerald-50 text-emerald-600", 
    subText: "Current active leases",
    icon: CheckCircleIcon // 🚀 যোগ করা হলো
  },
  { 
    title: "Total Expenses", 
    value: `৳${formatEarnings(totalSpent)}`, 
    change: "Confirmed lease payments", 
    color: "from-rose-500 to-pink-500", 
    bgLight: "bg-rose-50 text-rose-600", 
    subText: "100% Processed Secured",
    icon: CreditCardIcon // 🚀 যোগ করা হলো
  },
];


  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((stat, i) => {
        const Icon = stat.icon || (i === 0 ? HomeIcon : i === 1 ? ClockIcon : i === 2 ? CheckCircleIcon : CreditCardIcon);
        return (
          <Card key={i} className="shadow-sm border-slate-100 bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</CardTitle>
              <div className={`p-3 rounded-2xl transition-all duration-300 group-hover:bg-gradient-to-tr ${stat.color} group-hover:text-white ${stat.bgLight}`}>
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</div>
              <p className="text-[10px] text-emerald-600 flex items-center gap-0.5 font-bold">
                <TrendingUp className="w-3 h-3 shrink-0" /> {stat.change}
              </p>
              <span className="text-[10px] text-slate-400 font-semibold block pt-1 border-t border-slate-100 mt-1">{stat.subText}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
