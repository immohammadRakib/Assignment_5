"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, RefreshCw, ArrowLeft, ShieldAlert, Ban, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const transactionId = searchParams.get("tranId") || "N/A";

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/60 min-h-[85vh] select-none font-sans antialiased">
      <div className="w-full max-w-md bg-white border border-neutral-100 rounded-3xl p-6 md:p-8 shadow-2xl shadow-neutral-200/40 text-center relative overflow-hidden group">
        
        {/* লাক্সারি ব্যাকгруন্ড অ্যালার্ট গ্লো ইফেক্টস */}
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-70 group-hover:bg-rose-100/50 transition-colors duration-500" />
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-40" />

        {/* 🎯 ইন্টারেক্টিভ পালসিং অ্যালার্ট অ্যানিমেশন */}
        <div className="relative mx-auto flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-rose-100 border-t-rose-500 animate-spin duration-2000" />
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner animate-pulse">
            <AlertCircle className="w-9 h-9 stroke-[2]" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Transaction Aborted!</h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto font-medium">
            The billing protocol was manually terminated or rejected by the banking core node. No funds were cleared.
          </p>
        </div>

        {/* 💳 ফেলিউর লগ বক্স */}
        <div className="bg-neutral-50/80 border border-neutral-200/50 p-5 rounded-2xl space-y-3 font-mono text-xs my-6 text-left shadow-2xs relative z-10 backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Failed Node ID</span>
            <span className="text-gray-900 font-bold tracking-tight max-w-[160px] truncate bg-white border border-neutral-200 px-2 py-0.5 rounded-md shadow-3xs">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Error Status</span>
            <span className="text-rose-600 font-black tracking-wide uppercase flex items-center gap-1 text-[10px]">
              <Ban className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Failed / Cancelled
            </span>
          </div>
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Resolution</span>
            <span className="text-neutral-500 font-medium text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md">
              Retry Required
            </span>
          </div>
        </div>

        {/* ইন্টারেক্টিভ অ্যাকশন বাটন প্যানেল */}
        <div className="space-y-3 relative z-10">
          <Link href="/dashboard/tenant/requests" className="block w-full">
            <Button className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-[0.98] border border-rose-500/10" >
              <RefreshCw className="w-4 h-4 shrink-0" /> Re-initiate Billing Session
            </Button>
          </Link>
          
          <Link href="/dashboard/tenant" className="block w-full">
            <button className="w-full h-11 bg-neutral-50 hover:bg-neutral-100 text-gray-700 border border-neutral-200 font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-[0.98]">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Main Overview
            </button>
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-rose-500 font-black uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 shrink-0 animate-bounce" />
          <span>Ledger Gateway Security Protocol Terminated</span>
        </div>

      </div>
    </div>
  );
}
