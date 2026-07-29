"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentInitiationPage() {
  const params = useParams();
  const router = useRouter();
  const rentalId = params.id;
  const [isProcessing, setIsPending] = useState(false);

  const handleInitializePayment = async () => {
    setIsPending(true);
    
    // ব্রাউজার কুকি থেকে সরাসরি টোকেন এক্সট্র্যাক্ট করা
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (!token) {
      toast.error("Authentication expired. Please log in again.");
      router.push("/auth/login");
      return;
    }

    try {
      // 🎯 অফিসিয়াল রিকোয়ারমেন্ট এন্ডপয়েন্টে পেমেন্ট সেশন ক্রিয়েট করা হচ্ছে
      const res = await fetch("https://onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rentalId: rentalId })
      });

      const result = await res.json();

      // SSLCommerz গেটওয়ে ইউআরএল রিডাইরেক্ট মেকানিজম
      if (result?.success && result?.GatewayPageURL) {
        toast.success("Secure checkout session initialized. Redirecting...");
        window.location.replace(result.GatewayPageURL);
      } else {
        toast.error(result?.message || "Failed to initiate payment. Contact admin.");
      }
    } catch (error) {
      console.error("Gateway error:", error);
      toast.error("Network interface connection failure.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-white min-h-[70vh] select-none">
      <div className="w-full max-w-sm border border-neutral-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-neutral-100/50 space-y-6 text-center relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40" />
        
        <div className="mx-auto p-4 bg-rose-50 text-rose-500 rounded-full w-max animate-pulse">
          <CreditCard className="w-8 h-8 stroke-[1.5]" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Checkout Invoice</h2>
          <p className="text-xs text-neutral-400">Initialize secured gateway billing framework</p>
        </div>

        <div className="bg-neutral-50/60 p-4 rounded-2xl border border-neutral-100 text-left text-xs font-semibold text-neutral-500 space-y-1.5 font-mono">
          <p>REQUEST ID: <span className="text-gray-900">{rentalId}</span></p>
          <p>GATEWAY: <span className="text-rose-500 font-bold">SSLCOMMERZ BDT</span></p>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            onClick={handleInitializePayment}
            disabled={isProcessing}
            className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98] disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Secure Vault...</span>
              </>
            ) : (
              "Secure Redirect to Pay"
            )}
          </Button>

          <button 
            onClick={() => router.back()}
            className="text-xs font-bold text-neutral-400 hover:text-gray-600 transition flex items-center gap-1 justify-center mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Request Feed
          </button>
        </div>

        <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Encrypted Payment Framework [⚠]</span>
        </div>
      </div>
    </div>
  );
}
