"use client";

import React, { useEffect, useState } from "react";
import {
  Banknote,
  TrendingUp,
  ArrowUpRight,
  Wallet,
  ArrowDownLeft,
  ShieldCheck,
  Receipt,
  Search,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface IPayment {
  id: string;
  bookingId: string;
  amount: number | string;
  status: string;
  createdAt: string;
  transactionId: string;
  booking?: {
    property?: {
      title: string;
      location: string;
    };
    tenant?: {
      name: string;
      email: string;
    };
  };
}

export default function LandlordEarningsPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEarnings() {
      let rawToken =
        typeof window !== "undefined"
          ? localStorage.getItem("rentnest_token")
          : null;

      if (!rawToken) {
        toast.error("Session authorization missing. Please re-login.");
        setLoading(false);
        return;
      }

      const cleanToken = rawToken.replace(/^"|"$/g, "").trim();

      try {
        const res = await fetch(
          "https://assignment-4-vnjw.onrender.com/api/payments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: cleanToken.startsWith("Bearer ")
                ? cleanToken
                : `Bearer ${cleanToken}`,
            },
            credentials: "include",
          },
        );

        if (res.ok) {
          const result = await res.json();

          const paymentData = result?.data?.data || result?.data || [];

          setPayments(Array.isArray(paymentData) ? paymentData : []);
        } else {
          const errorData = await res.json().catch(() => ({}));
          toast.error(
            errorData?.message || "Failed to parse authorized ledger metrics.",
          );
        }
      } catch (error) {
        console.error("Ledger thread drop error:", error);
        toast.error("Network interface dropped connecting threads.");
      } finally {
        setLoading(false);
      }
    }

    fetchEarnings();
  }, []);

  const totalEarnings = payments.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0,
  );
  const completedPayouts = payments
    .filter(
      (p) =>
        p.status?.toLowerCase() === "paid" ||
        p.status?.toLowerCase() === "success",
    )
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const pendingPayouts = totalEarnings - completedPayouts;

  const filteredPayments = payments.filter(
    (p) =>
      p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.booking?.property?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="p-6 md:p-10 space-y-8 animate-pulse max-w-7xl mx-auto text-left">
        <div className="h-8 bg-slate-100 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-slate-50 border border-slate-100 rounded-2xl"
            />
          ))}
        </div>
        <div className="h-64 bg-slate-50 border border-slate-100 rounded-2xl w-full" />
      </div>
    );
  }
  return (
    <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto select-none text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Banknote className="w-8 h-8 text-[#FF385C]" />{" "}
            <span className="font-bold dark:text-white">Earnings</span>
          </h1>
          <p className="text-sm font-medium text-slate-400 dark:text-slate-400">
            Monitor securely authenticated revenue streaming and digital
            checkout allocations.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100  text-emerald-600 text-xs font-bold rounded-xl h-fit">
          <ShieldCheck className="w-4 h-4 stroke-[2.5px] dark:text-emerald-600" />{" "}
          Encrypted Financial Vault
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-rose-950/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 text-[#FF385C] rounded-xl">
              <TrendingUp className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
              Live <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gross Revenue
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
            ৳ {totalEarnings.toLocaleString("en-US")}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-rose-950/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
              Settled
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Withdrawn / Payouts
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
            ৳ {completedPayouts.toLocaleString("en-US")}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-rose-950/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <ArrowDownLeft className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
              Processing
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Escrow / Pending Approval
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
            ৳ {pendingPayouts.toLocaleString("en-US")}
          </h3>
        </motion.div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-rose-950/5 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-slate-500" /> Transaction Registry
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute top-3.5 left-4 size-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search via TXID or Asset title..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 h-11 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredPayments.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Asset Details</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Payer / Tenant</th>
                  <th className="p-4">Settlement Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-50/50 flex items-center justify-center shrink-0 border border-rose-100/40 text-[#FF385C]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1 max-w-[180px]">
                          {payment.booking?.property?.title ||
                            "Premium Rental Space"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">
                          {payment.booking?.property?.location ||
                            "Sylhet, Bangladesh"}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-500 font-bold uppercase select-all">
                      {payment.transactionId || "TXN-ID-LEDGER"}
                    </td>
                    <td className="p-4">
                      <p className="text-slate-800 font-bold">
                        {payment.booking?.tenant?.name || "Verified Tenant"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {payment.booking?.tenant?.email || "guest@rentnest.com"}
                      </p>
                    </td>
                    <td className="p-4 text-slate-400 font-bold">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      {payment.status?.toLowerCase() === "paid" ||
                      payment.status?.toLowerCase() === "success" ? (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Success
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-100">
                          In Transit
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right text-sm font-black text-slate-900">
                      ৳ {Number(payment.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center text-slate-400 font-bold space-y-1">
              <Receipt className="w-12 h-12 mx-auto stroke-[1.5px] opacity-25 text-slate-400" />
              <p className="text-sm text-slate-500">
                No matching payout records registered.
              </p>
              <p className="text-[10px] font-medium text-slate-400">
                All authenticated ledger settlements log automatically inside
                this node container.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
