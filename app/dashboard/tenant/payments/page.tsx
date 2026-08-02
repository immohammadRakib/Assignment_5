import { cookies } from "next/headers";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PaymentRow from "../../_components/paymentRow";

async function getTenantPaymentsStream() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || null;

  if (!token) return [];

  try {
    const baseUrl =
      process.env.BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";
    const sanitizedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;

    console.log(
      "🛰️ Server Side Fetching Payments from:",
      `${sanitizedBaseUrl}/api/payments`,
    );

    const res = await fetch(`${sanitizedBaseUrl}/api/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      return [];
    }

    const result = await res.json();
    const finalPayments = Array.isArray(result)
      ? result
      : result?.data || result?.result || [];
    return Array.isArray(finalPayments) ? finalPayments : [];
  } catch (error) {
    console.error("Failed to load payment streams on server:", error);
    return [];
  }
}

export default async function TenantPaymentsHistoryPage() {
  const payments = await getTenantPaymentsStream();

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto select-none font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight dark:text-white">
            Verified Transaction Receipts
          </h1>
          <p className="text-xs text-neutral-500 font-medium darK:text-slate-500">
            Review your platform billing logs, verified payment tokens, and
            retry unfulfilled checkouts.
          </p>
        </div>
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:bg-neutral-100 border border-neutral-200 bg-white px-4 py-2.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Request Feed
        </Link>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm max-w-md mx-auto mt-10">
          No transaction history recorded yet. Validated invoices will broadcast
          live here.
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Transaction ID / Hash</th>
                  <th className="p-4">Property Stay Asset</th>
                  <th className="p-4">Paid Remittance</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Gateway Status</th>
                  <th className="p-4 text-right">Action Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-semibold text-gray-700">
                {payments.map((pay: any, index: number) => (
                  <PaymentRow
                    key={pay.id || pay._id || index}
                    pay={pay}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>100% AES-256 Encrypted Platform Ledger Audit Logs</span>
      </div>
    </div>
  );
}
