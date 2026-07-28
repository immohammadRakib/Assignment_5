"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UsersIcon, 
  HomeIcon, 
  DollarSignIcon, 
  PercentIcon, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const adminStats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12% from last month",
    isPositive: true,
    icon: UsersIcon,
  },
  {
    title: "Listed Properties",
    value: "452",
    change: "+8% from last week",
    isPositive: true,
    icon: HomeIcon,
  },
  {
    title: "Total Revenue",
    value: "৳1,85,000",
    change: "+23% from last month",
    isPositive: true,
    icon: DollarSignIcon,
  },
  {
    title: "Platform Commission",
    value: "৳18,500",
    change: "-3% from yesterday",
    isPositive: false,
    icon: PercentIcon,
  },
];


const recentTransactions = [
  { id: "TXN101", tenant: "Anisur Rahman", property: "Smart Bachelor Studio", amount: "৳4,500", status: "Success" },
  { id: "TXN102", tenant: "Sabbir Ahmed", property: "Luxury 3BHK Apartment", amount: "৳11,400", status: "Success" },
  { id: "TXN103", tenant: "Tahmina Akter", property: "Cozy Female Hostel Bed", amount: "৳1,200", status: "Pending" },
  { id: "TXN104", tenant: "Mahdi Hasan", property: "Duplex Villa with Pool", amount: "৳25,000", status: "Success" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Overview</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, Admin! Here is the latest performance data for RentNest.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, i) => {
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
                <div className="flex items-center gap-1 mt-1">
                  {stat.isPositive ? (
                    <ArrowUpRight className="size-3 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="size-3 text-rose-500" />
                  )}
                  <p className={`text-xs ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm border-neutral-100 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">Recent Platform Transactions</CardTitle>
            <p className="text-xs text-muted-foreground">Monitor real-time rental payments and bookings.</p>
          </div>
          <Link href="/admin-dashboard/properties">
            <Button size="sm" variant="outline" className="text-xs font-medium cursor-pointer">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-neutral-50 rounded-lg">
                <tr>
                  <th className="px-4 py-3">Txn ID</th>
                  <th className="px-4 py-3">Tenant Name</th>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-900">{tx.id}</td>
                    <td className="px-4 py-3.5 text-gray-700">{tx.tenant}</td>
                    <td className="px-4 py-3.5 text-gray-600 truncate max-w-[180px]">{tx.property}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-800">{tx.amount}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === "Success" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
