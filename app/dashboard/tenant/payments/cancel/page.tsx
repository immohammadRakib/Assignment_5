"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  XCircle,
  ArrowLeft,
  ShieldAlert,
  RefreshCw,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId =
    searchParams.get("tranId") ||
    "CNL-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/60 min-h-[85vh] select-none font-sans antialiased">
      <div className="w-full max-w-md bg-white border border-neutral-100 rounded-3xl p-6 md:p-8 shadow-2xl shadow-neutral-200/40 text-center relative overflow-hidden group">
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-80 group-hover:bg-amber-100/50 transition-colors duration-500" />
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-neutral-100 rounded-full blur-3xl opacity-60" />

        <div className="relative mx-auto flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-amber-100 border-t-amber-500 animate-spin duration-2000" />
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shadow-inner animate-pulse">
            <XCircle className="w-9 h-9 stroke-[1.5]" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Payment Cancelled
          </h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto font-medium">
            The digital remittance session was manually terminated by the user.
            No transaction fees or stay bills were processed.
          </p>
        </div>

        <div className="bg-neutral-50/80 border border-neutral-200/50 p-5 rounded-2xl space-y-3 font-mono text-xs my-6 text-left shadow-inner relative z-10 backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
              Session Hash
            </span>
            <span className="text-gray-900 font-black tracking-tight bg-white border border-neutral-200 px-2 py-0.5 rounded-md shadow-3xs max-w-[160px] truncate">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
              Termination
            </span>
            <span className="text-amber-600 font-black tracking-wide uppercase flex items-center gap-1 text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-bounce" />{" "}
              User Terminated
            </span>
          </div>
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
              Remittance Status
            </span>
            <span className="text-neutral-500 font-bold text-[10px] bg-neutral-200/60 text-neutral-700 px-2 py-0.5 rounded-md">
              UNPAID / REVOKED
            </span>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <Link href="/dashboard/tenant/requests" className="block w-full">
            <Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-[0.98] border border-amber-500/10">
              <RefreshCw className="w-4 h-4 shrink-0" /> Re-try Booking Checkout
            </Button>
          </Link>

          <Link href="/dashboard/tenant" className="block w-full">
            <button className="w-full h-11 bg-neutral-50 hover:bg-neutral-100 text-gray-700 border border-neutral-200 font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-[0.98]">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Tenant Dashboard
            </button>
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-amber-600 font-black uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 shrink-0 animate-pulse" />
          <span>Remittance Handshake Session Safely Terminated</span>
        </div>
      </div>
    </div>
  );
}
