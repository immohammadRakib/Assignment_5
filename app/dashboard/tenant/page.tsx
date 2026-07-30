import { cookies } from "next/headers";
import { HomeIcon, ClockIcon, CreditCardIcon, CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TenantDashboard from "../_components/tenantDashboard"; // পাথ ঠিক করে নিও

async function getTenantOverviewData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { rentals: [], stats: [] };

  try {
    const res = await fetch("https://assignment-4-vnjw.onrender.com/api/rentals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 0 }
    });

    const result = await res.json();
    const rentals = result?.data || result || [];
    const finalRentals = Array.isArray(rentals) ? rentals : [];

    // 📊 রিয়েল ডাটা স্ট্যাটস ক্যালকুলেশন
    const totalSpent = finalRentals.reduce((acc: number, curr: any) => {
        return curr.status === "CONFIRMED" || curr.status === "ACTIVE" 
          ? acc + (Number(curr.totalPrice) || 0) 
          : acc;
    }, 0);

    const pendingRequests = finalRentals.filter((r: any) => r.status === "PENDING").length;
    const activeStays = finalRentals.filter((r: any) => r.status === "CONFIRMED" || r.status === "ACTIVE").length;

    const stats = [
      {
        title: "Total Bookings",
        value: finalRentals.length.toString(),
        description: "All time requests",
        icon: HomeIcon,
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      {
        title: "Pending Approval",
        value: pendingRequests.toString(),
        description: "Waiting for landlord",
        icon: ClockIcon,
        color: "text-amber-600",
        bg: "bg-amber-50"
      },
      {
        title: "Active/Confirmed",
        value: activeStays.toString(),
        description: "Ready to move or stay",
        icon: CheckCircleIcon,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      },
      {
        title: "Total Expenses",
        value: `৳${totalSpent}`,
        description: "Confirmed lease payments",
        icon: CreditCardIcon,
        color: "text-rose-600",
        bg: "bg-rose-50"
      }
    ];

    return { rentals: finalRentals, stats };
  } catch (error) {
    console.error("Tenant Overview Sync Failed:", error);
    return { rentals: [], stats: [] };
  }
}

export default async function TenantOverviewPage() {
  const { rentals, stats } = await getTenantOverviewData();

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Tenant Overview</h1>
        <p className="text-sm text-neutral-500 font-medium">
          Manage your rental journey and track your stay applications.
        </p>
      </div>

      {/* স্ট্যাটস কার্ড গ্রিড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-neutral-100 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <p className="text-[10px] text-neutral-400 mt-1 font-bold uppercase tracking-tighter">
                   {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* কুইক টেবিল ভিউ */}
      <div className="space-y-4">
        <TenantDashboard rentals={rentals} payments={[]} />
      </div>
    </div>
  );
}
