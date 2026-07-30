"use client";

import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // ইউআরএল থেকে ডাইনামিক ডাটা রিড করা হচ্ছে
  const propertyId = searchParams.get("propertyId");
  const amount = searchParams.get("amount");
  const propertyName = searchParams.get("name") || "Rental Property Booking";

  const [loading, setLoading] = useState(false);

  // সিকিউরিটি চেক: ইউআরএল-এ ডাটা না থাকলে ড্যাশবোর্ডে ব্যাক করানো
//   useEffect(() => {
//     if (!propertyId || !amount) {
//       toast.error("Invalid payment routing parameters.");
//       router.push("/tenant-dashboard");
//     }
//   }, [propertyId, amount, router]);

  useEffect(() => {
    if (!propertyId || !amount) {
      toast.error("Invalid payment routing parameters.");

      // ব্রাউজারের ডকুমেন্ট কুকি থেকে টোকেনটি রিড করা
      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;

      if (token) {
        try {
          const decoded = jwt.decode(token) as any;
          const role = decoded?.role;

          // রোল অনুযায়ী সঠিক ড্যাশবোর্ডে ফেরত পাঠানো হচ্ছে
          if (role === "ADMIN") {
            router.push("/admin-dashboard");
          } else if (role === "LANDLORD") {
            router.push("/landlord-dashboard");
          } else {
            router.push("/dashboard"); // TENANT এর জন্য
          }
        } catch (error) {
          console.error("Failed to decode token on payment redirect:", error);
          router.push("/"); // টোকেন ক্র্যাশ করলে সেফটি হিসেবে হোমে পাঠানো
        }
      } else {
        router.push("/login"); // টোকেনই যদি না থাকে (যদিও মিডলওয়্যার আটকে দেবে)
      }
    }
  }, [propertyId, amount, router]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // ১. ক্লায়েন্ট সাইড থেকে ডাইনামিকালি এপিআই কল করার সময় আমরা ক্রেডেনশিয়াল পাস করব 
      // যাতে নেক্সট জেএস অটোমেটিক কুকি থেকে 'accessToken' ব্যাকএন্ডে পাঠায়
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          propertyId: propertyId,
        }),
      });

      const data = await response.json();

      if (data?.success && data?.GatewayPageURL) {
        toast.success("Redirecting to secure SSLCommerz gateway...");
        window.location.replace(data.GatewayPageURL);
      } else {
        toast.error(data?.message || "Failed to initialize secure checkout window.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Network error during payment processing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!propertyId || !amount) return null;

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/50 min-h-[75vh]">
      <Card className="w-full max-w-md shadow-xl border-neutral-100 rounded-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto p-3 bg-rose-50 text-rose-500 rounded-full w-max mb-2 animate-pulse">
            <CreditCard className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">Secure Checkout</CardTitle>
          <CardDescription className="text-xs text-neutral-400">Powered by SSLCommerz Gateway</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 border-t border-b border-neutral-100 py-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-500 font-medium">Item/Property:</span>
            <span className="text-gray-900 font-bold max-w-[200px] truncate">{propertyName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-500 font-medium">Property ID:</span>
            <span className="text-neutral-400 font-mono text-xs">{propertyId}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-neutral-50">
            <span className="text-neutral-900 font-bold">Total Amount:</span>
            <span className="text-2xl font-black text-rose-500">৳{Number(amount).toLocaleString()}</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-5">
          <Button 
            onClick={handlePayment} 
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-md transition cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Gateway...</span>
              </>
            ) : (
              `Pay ৳${Number(amount).toLocaleString()} Now`
            )}
          </Button>
          
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 justify-center font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Encrypted & Safe Rental Transaction [⚠]</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPage;
