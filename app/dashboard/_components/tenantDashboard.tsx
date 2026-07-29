"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDaysIcon, HeartIcon, CreditCardIcon, ClockIcon, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// অফিসিয়াল রিকোয়ারমেন্ট ব্যাজ কালার ম্যাপ
const badgeStyles = {
  PENDING: "bg-amber-50 border-amber-200 text-amber-700",
  APPROVED: "bg-blue-50 border-blue-200 text-blue-700",
  REJECTED: "bg-rose-50 border-rose-200 text-rose-700",
  ACTIVE: "bg-emerald-50 border-emerald-200 text-emerald-700",
  COMPLETED: "bg-neutral-100 border-neutral-200 text-neutral-600"
};

export default function TenantDashboard({ rentals, payments }: { rentals: any[]; payments: any[] }) {
  // লাইভ ডাটা থেকে ক্যালকুলেশন
  const activeBookingsCount = rentals.filter((r: any) => r.status === "ACTIVE").length.toString();
  const pendingBookingsCount = rentals.filter((r: any) => r.status === "PENDING").length.toString();
  const totalSpentAmount = payments.reduce((acc: number, curr: any) => acc + (Number(curr.amount) || 0), 0);

  // তোমার সেই লাক্সারি প্রিমিয়াম স্ট্যাটস গ্রিড
  const tenantStats = [
    { title: "Active Bookings", value: activeBookingsCount, desc: "Your ongoing rentals", icon: CalendarDaysIcon },
    { title: "Wishlist", value: "0", desc: "Properties you liked", icon: HeartIcon },
    { title: "Total Spent", value: `৳${totalSpentAmount.toLocaleString()}`, desc: "Paid through RentNest", icon: CreditCardIcon },
    { title: "Pending Requests", value: pendingBookingsCount, desc: "Awaiting response", icon: ClockIcon },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Tenant Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your rentals and view your payment history.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tenantStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-neutral-100 bg-white rounded-2xl group hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase text-gray-500">{stat.title}</CardTitle>
                <div className="p-2 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-105 transition-transform">
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1 font-medium">{stat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 📊 রেন্টাল রিকোয়েস্ট হিস্ট্রি টেবিল */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Your Rental Feed History</h3>
        {rentals.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-neutral-200 rounded-2xl bg-white">
            <p className="text-muted-foreground text-sm font-medium">You have no upcoming or recorded bookings.</p>
            <Link href="/properties">
              <Button className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-6 h-11 cursor-pointer transition active:scale-[0.98]">
                Browse Properties
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Property Stay Title</th>
                  <th className="p-4">Rental Duration Timeline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-semibold text-gray-700">
                {/* 🛠️ ফিক্স ১: (rental, index) ট্র্যাপ দিয়ে ইউনিক কি নিশ্চিত করা হয়েছে */}
                {rentals.map((rental: any, index: number) => {
                  const rentalKey = rental._id || rental.id || `rental-row-${index}`;
                  const currentRentalId = rental._id || rental.id;
                  
                  return (
                    <tr key={rentalKey} className="hover:bg-neutral-50/20 transition-colors">
                      <td className="p-4 font-bold text-gray-900 truncate max-w-[200px]">
                        {rental.propertyId?.title || "Premium Rental Unit"}
                      </td>
                      <td className="p-4 text-gray-500 text-xs font-mono">
                        {rental.startDate ? new Date(rental.startDate).toLocaleDateString() : "N/A"} - {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${badgeStyles[rental.status as keyof typeof badgeStyles] || badgeStyles.PENDING}`}>
                          {rental.status || "PENDING"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {rental.status === "APPROVED" ? (
                          <Link href={`/dashboard/tenant/requests/${currentRentalId}/pay`}>
                            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm cursor-pointer transition flex items-center gap-1 ml-auto active:scale-95">
                              Pay Now <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        ) : rental.status === "ACTIVE" ? (
                          <button className="bg-gray-900 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95">
                            Leave Review
                          </button>
                        ) : (
                          <span className="text-xs text-neutral-400 italic font-medium">Awaiting Host</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 💳 পেমেন্ট হিস্ট্রি টেবিল */}
      {payments.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Verified Transaction Receipts</h3>
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Transaction hash</th>
                  <th className="p-4">Paid Bill</th>
                  <th className="p-4">Method</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-semibold text-gray-700">
                {/* 🛠️ ফিক্স ২: (payment, index) ট্র্যাপ দিয়ে ইউনিক কি নিশ্চিত করা হয়েছে */}
                {payments.map((payment: any, index: number) => {
                  const paymentKey = payment._id || payment.transactionId || `payment-row-${index}`;
                  
                  return (
                    <tr key={paymentKey} className="hover:bg-neutral-50/20 transition-colors">
                      <td className="p-4 font-mono text-gray-900 text-xs font-bold">{payment.transactionId || payment._id}</td>
                      <td className="p-4 text-rose-500 font-black">৳{payment.amount?.toLocaleString()}</td>
                      <td className="p-4 text-gray-500 text-xs">{payment.paymentMethod || "SSLCommerz Secured"}</td>
                      <td className="p-4 text-right text-emerald-600 font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
