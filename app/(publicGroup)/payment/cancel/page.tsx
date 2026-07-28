"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw, HelpCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center bg-white">
      <div className="p-4 bg-rose-50 text-rose-500 rounded-full mb-4 animate-pulse">
        <XCircle className="w-16 h-16 stroke-[1.5]" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Payment Cancelled</h1>
      <p className="text-sm text-neutral-500 max-w-sm mt-2 leading-relaxed">
        The transaction was cancelled or could not be completed. No amount has been deducted from your account.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto justify-center">
        <Link href="/dashboard/tenant" passHref>
          <Button className="w-full sm:w-auto h-11 px-6 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-md">
            <RefreshCcw className="w-4 h-4" /> Retry Checkout
          </Button>
        </Link>
        <Link href="/contact" passHref>
          <Button variant="outline" className="w-full sm:w-auto h-11 px-6 rounded-xl border-neutral-200 text-gray-600 transition-all flex items-center gap-2 cursor-pointer">
            <HelpCircle className="w-4 h-4" /> Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
