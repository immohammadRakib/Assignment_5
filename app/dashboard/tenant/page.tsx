export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LayoutDashboard, CalendarCheckIcon } from "lucide-react";
import jwt from 'jsonwebtoken';
import TenantDashboard from "../_components/tenantDashboard";
import TenantBanner from "./overview/tenantBanner"; // পার্ট ১ ইম্পোর্ট
import TenantStatsGrid from "./overview/tenantStatsGrid"; // পার্ট ২ ইম্পোর্ট

export default async function TenantOverviewPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  // 🔐 সার্ভার সাইডেই নেটিভলি টোকেন থেকে নাম ডিকোড করা
  let userName = "User";
  try {
    const decoded = jwt.decode(token) as any;
    if (decoded && decoded.name) {
      userName = decoded.name;
    }
  } catch (err) {
    console.error("Token decode error on server:", err);
  }

  // 🎯 ওল্ড ক্যাশ এড়াতে নেটিভ নো-ক্যাশ ফেচ এপিআই কল
  let rentals: any[] = [];
  try {
    const res = await fetch("https://assignment-4-vnjw.onrender.com/api/rentals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      cache: 'no-store' // 🚀 ওল্ড মেমরি ক্যাশ ব্রেক করার ট্রিক
    });
    const result = await res.json();
    const rawRentals = result?.data || result || [];
    rentals = Array.isArray(rawRentals) ? rawRentals : [];
  } catch (error) {
    console.error("Tenant Fetch Failed:", error);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      
      {/* 🚀 পার্ট ১: ডাইনামিক নাম ব্যানার উইথ রোজ-পার্পল গ্রেডিয়েন্ট */}
      <TenantBanner userName={userName} />

      {/* 📊 পার্ট ২: লাইভ মেট্রিড কার্ড গ্রিড */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <LayoutDashboard className="w-4 h-4 text-rose-500" /> Live Rental Metrics
        </h2>
        <TenantStatsGrid rentals={rentals} />
      </div>

      {/* 🚀 রিয়াল-টাইম টেন্যান্ট ড্যাশবোর্ড জোন (লিস্ট/টেবিল ভিউ) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <h2 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-rose-500 rounded-full inline-block" />
            My Rental Applications & Stays
          </h2>
          <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
            Personal History Logs
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden p-2">
          {rentals.length > 0 ? (
            <TenantDashboard rentals={rentals} payments={[]} />
          ) : (
            <div className="text-center py-20 text-slate-400 max-w-xl mx-auto">
              <div className="w-14 h-14 bg-slate-50 text-slate-400 flex items-center justify-center rounded-2xl mx-auto mb-4 border border-slate-100">
                <CalendarCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">No Active Stays</h3>
              <p className="text-sm text-slate-400 mt-1">You haven't requested any property bookings yet. Head over to the home page to find your next nest!</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
