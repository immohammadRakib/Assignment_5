"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HomeIcon,
  WalletIcon,
  CalendarCheckIcon,
  BadgeCheckIcon,
  TrendingUp,
} from "lucide-react";

const formatEarnings = (num: number) => {
  if (!num) return "0";
  if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, "") + " T";
  if (num >= 1e9) return (num / 1e9).toFixed(2).replace(/\.00$/, "") + " B";
  if (num >= 1e6) return (num / 1e6).toFixed(2).replace(/\.00$/, "") + " M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K";
  return num.toString();
};

export default function StatsGrid() {
  const API_BASE =
    process.env.BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["landlordStats"],
    queryFn: async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rentnest_token")
          : null;
      const res = await fetch(`${API_BASE}/api/dashboard/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const stats = apiResponse?.data || apiResponse || {};

  const propertiesCount = Number(stats.myTotalProperties || 0);
  const totalEarnings = Number(stats.myTotalEarnings || 0);
  const confirmedBookings = Number(stats.myConfirmedBookings || 0);
  const pendingRequests = Number(stats.myPendingRequests || 0);
  const propertyViews = Number(stats.myPropertyViews || 0);

  const occupancyRate =
    propertiesCount > 0
      ? `${Math.round((confirmedBookings / propertiesCount) * 100)}%`
      : "0%";

  const cardData = [
    {
      title: "My Properties",
      value: propertiesCount.toString(),
      change: "Total listed items",
      subText: `${stats.myAvailableProperties || 0} Units Available`,
      icon: HomeIcon,
      color: "from-rose-500 to-pink-500",
      bgLight: "bg-rose-50 text-rose-500",
    },
    {
      title: "Total Earnings",
      value: `৳${formatEarnings(totalEarnings)}`,
      change: "Calculated revenue",
      subText: "100% Processed Secured",
      icon: WalletIcon,
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Active Leases",
      value: confirmedBookings.toString(),
      change: "Confirmed contracts",
      subText: `${pendingRequests} Application Pending`,
      icon: CalendarCheckIcon,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50 text-amber-500",
    },
    {
      title: "Property Traffic",
      value: formatEarnings(propertyViews),
      change: "Total profile views",
      subText: `${stats.myTotalReviews || 0} Tenant Reviews`,
      icon: BadgeCheckIcon,
      color: "from-indigo-500 to-purple-500",
      bgLight: "bg-indigo-50 text-indigo-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="shadow-sm border-slate-100 bg-white rounded-2xl animate-pulse h-28"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={i}
            className="dark:bg-slate-800 shadow-sm border-slate-100 bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
                {stat.title}
              </CardTitle>
              <div
                className={`p-3 rounded-2xl transition-all duration-300 group-hover:bg-gradient-to-tr ${stat.color} group-hover:text-white ${stat.bgLight}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-black text-slate-800 dark:text-rose-400 tracking-tight">
                {stat.value}
              </div>
              <p className="text-[10px] text-emerald-600 flex items-center gap-0.5 font-bold">
                <TrendingUp className="w-3 h-3 shrink-0" /> {stat.change}
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold block pt-1 border-t border-slate-100 mt-1">
                {stat.subText}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
