import { cookies } from "next/headers";
import TenantDashboard from "../_components/tenantDashboard";

async function getTenantLiveFields() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // টোকেন না থাকলে খালি অ্যারে ব্যাক করবে
  if (!token) return { rentals: [], payments: [] };

  try {
    // 🎯 ফিক্স: অনরেন্ডারের রিয়াল লাইভ এপিআই ইউআরএল এবং পেমেন্ট গেটওয়ে গেট রিকোয়েস্ট বাইন্ডিং
    const [rentalsRes, paymentsRes] = await Promise.all([
      fetch("https://assignment-4-vnjw.onrender.com/api/rentals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        next: { revalidate: 0 } // লাইভ ট্র্যাকিংয়ের জন্য ক্যাশ অফ রাখা হলো
      }),
      // এখানে তোমার পেমেন্ট হিস্ট্রির আসল এন্ডপয়েন্ট বসাবে (আপাতত রেন্টাল রিকোয়েস্টের অ্যান্ডপয়েন্ট সেফটি হিসেবে দিলাম)
      fetch("https://assignment-4-vnjw.onrender.com/api/rentals", { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        next: { revalidate: 0 }
      })
    ]);

    const contentTypeRentals = rentalsRes.headers.get("content-type");
    const contentTypePayments = paymentsRes.headers.get("content-type");

    const rentalsData = contentTypeRentals && contentTypeRentals.includes("application/json") ? await rentalsRes.json() : null;
    const paymentsData = contentTypePayments && contentTypePayments.includes("application/json") ? await paymentsRes.json() : null;

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

  console.log("--- TENANT API REALTIME SYNC ---");
  console.log("Total Fetched Rentals Count:", rentals.length);
  console.log("Raw Rentals Content:", JSON.stringify(rentals, null, 2));

  return (
    <div className="max-w-6xl mx-auto p-2">
      <TenantDashboard rentals={rentals} payments={payments} />
    </div>
  );
}
