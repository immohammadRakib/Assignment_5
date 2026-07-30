import { cookies } from "next/headers";
import TenantDashboard from "./../../_components/tenantDashboard";

async function getMyRentalRequests() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, data: [] };

  try {
    // 🎯 তোমার দেওয়া এন্ডপয়েন্ট অনুযায়ী টেন্যান্টের সব রিকোয়েস্ট নিয়ে আসা হচ্ছে
    const res = await fetch("https://assignment-4-vnjw.onrender.com/api/rentals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 0 } // ডাটা যেন ক্যাশ না হয়ে সবসময় তাজা থাকে
    });

    const result = await res.json();
    
    // এপিআই রেসপন্স স্ট্রাকচার অনুযায়ী ডাটা ফিল্টার
    const rentals = result?.data || result || [];
    return { success: true, data: Array.isArray(rentals) ? rentals : [] };
  } catch (error) {
    console.error("Fetch error on tenant requests:", error);
    return { success: false, data: [] };
  }
}

export default async function TenantRequestsPage() {
  const result = await getMyRentalRequests();
  const rentals = result.data;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">My Rental Requests</h1>
        <p className="text-sm text-neutral-500">Track the status of your stay applications.</p>
      </div>

      {/* 🚀 তোমার বানানো টেন্যান্ট ড্যাশবোর্ড কম্পোনেন্টে ডাটা পাস করা হচ্ছে */}
      <TenantDashboard rentals={rentals} payments={[]} />
    </div>
  );
}
