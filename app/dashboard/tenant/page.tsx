import { cookies } from "next/headers";
import TenantDashboard from "../_components/tenantDashboard";

async function getTenantLiveFields() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // টোকেন না থাকলে খালি অ্যারে ব্যাক করবে
  if (!token) return { rentals: [], payments: [] };

  try {
    // 🎯 cURL ডকস অনুযায়ী নিখুঁত এন্ডপয়েন্ট কানেকশন
    const [rentalsRes, paymentsRes] = await Promise.all([
      fetch("https://assignment-4-vnjw.onrender.com/api/rentals", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        next: { revalidate: 0 } // লাইভ ট্র্যাকিংয়ের জন্য ক্যাশ অফ রাখা হলো
      }),
      fetch("https://onrender.com", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        next: { revalidate: 0 }
      })
    ]);

    // রেন্ডার সার্ভারের ওয়েক-আপ বা content-type সেফটি চেক
    const contentTypeRentals = rentalsRes.headers.get("content-type");
    const contentTypePayments = paymentsRes.headers.get("content-type");

    const rentalsData = contentTypeRentals && contentTypeRentals.includes("application/json") 
      ? await rentalsRes.json() 
      : null;

    const paymentsData = contentTypePayments && contentTypePayments.includes("application/json") 
      ? await paymentsRes.json() 
      : null;

    // 🛠️ মঙ্গোডিবি/অ্যাপোলো আর্কিটেকচার অনুযায়ী ডাটা এক্সট্র্যাকশন ফিল্টার
    const finalRentals = rentalsData?.data || rentalsData?.result || rentalsData || [];
    const finalPayments = paymentsData?.data || paymentsData?.result || paymentsData || [];

    return {
      rentals: Array.isArray(finalRentals) ? finalRentals : [],
      payments: Array.isArray(finalPayments) ? finalPayments : []
    };
  } catch (error) {
    console.error("Render Live Sync Failed, acting fallback:", error);
    return { rentals: [], payments: [] };
  }
}

export default async function TenantDashboardPage() {
  const { rentals, payments } = await getTenantLiveFields();

  // 🐞 সার্ভার সাইড ডিবাগিং ইন্টিগ্রেটর (তোমার VS Code টার্মিনালে ডাটা দেখতে পাবে)
  console.log("--- TENANT API REALTIME SYNC ---");
  console.log("Total Fetched Rentals Count:", rentals.length);
  console.log("Raw Rentals Content:", JSON.stringify(rentals, null, 2));

  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* আসল ডাটা ক্লায়েন্ট ডিজাইনে পাস করা হচ্ছে */}
      <TenantDashboard rentals={rentals} payments={payments} />
    </div>
  );
}
