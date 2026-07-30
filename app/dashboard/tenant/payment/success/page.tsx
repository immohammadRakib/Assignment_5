"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, CalendarDays } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center bg-white">
      <div className="p-4 bg-emerald-50 text-emerald-500 rounded-full mb-4 animate-bounce">
        <CheckCircle2 className="w-16 h-16 stroke-[1.5]" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Payment Successful!</h1>
      <p className="text-sm text-neutral-500 max-w-sm mt-2 leading-relaxed">
        Thank you! Your rental payment has been securely processed via SSLCommerz. Your booking is now active.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto justify-center">
        <Link href="/dashboard/tenant" passHref>
          <Button className="w-full sm:w-auto h-11 px-6 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-md">
            <CalendarDays className="w-4 h-4" /> Go to My Bookings
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="outline" className="w-full sm:w-auto h-11 px-6 rounded-xl border-neutral-200 text-gray-600 transition-all flex items-center gap-2 cursor-pointer">
            Return Home <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
