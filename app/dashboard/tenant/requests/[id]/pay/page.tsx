// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { CreditCard, ShieldCheck, Loader2, ArrowLeft, Building2, CheckCircle2, Ticket } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function PaymentInitiationPage() {
//   const params = useParams();
//   const router = useRouter();
//   const rentalId = params.id;
//   const [isProcessing, setIsPending] = useState(false);

//   const handleInitializePayment = async () => {
//     setIsPending(true);
    
//     // ব্রাউজার কুকি থেকে সরাসরি সুরক্ষিত টোকেন এক্সট্র্যাক্ট করা
//     const cookies = document.cookie.split("; ");
//     const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
//     const token = tokenCookie ? tokenCookie.split("=")[1] : null;

//     if (!token) {
//       toast.error("Authentication expired. Please log in again.");
//       router.push("/auth/login");
//       return;
//     }

//     try {
//       // 🎯 ফিক্স: হার্ডকোডেড অনরেন্ডার রুট বাদ দিয়ে সঠিক ডাইনামিক এপিআই গেটওয়ে কানেকশন
//       const res = await fetch("https://assignment-4-vnjw.onrender.com", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({ rentalId: rentalId })
//       });

//       const result = await res.json();

//       // SSLCommerz লাইভ গেটওয়ে ইউআরএল রিডাইরেক্ট মেকানিজম
//       if (result?.success && result?.GatewayPageURL) {
//         toast.success("Secure checkout session initialized. Redirecting...");
//         window.location.replace(result.GatewayPageURL);
//       } else {
//         toast.error(result?.message || "Failed to initiate payment session. Please check entry logs.");
//       }
//     } catch (error) {
//       console.error("Gateway error:", error);
//       toast.error("Network interface connection failure.");
//     } finally {
//       setIsPending(false);
//     }
//   };
//   return (
//     <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/50 min-h-[85vh] select-none font-sans">
//       <div className="w-full max-w-4xl bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 grid grid-cols-1 md:grid-cols-12">
        
//         {/* 🎨 বাম পাশ: ইন্টারেক্টিভ প্রগ্রেস ও ব্রান্ডিং প্যানেল */}
//         <div className="md:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
//           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
//           <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          
//           <div className="space-y-6 relative z-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-xs font-bold text-rose-400 uppercase tracking-widest">
//               <Ticket className="w-3.5 h-3.5" /> Secure Checkout
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-2xl font-black tracking-tight leading-tight">RentNest Premium Billing Gateway</h2>
//               <p className="text-xs text-neutral-400 leading-relaxed">
//                 You are transferring to SSLCommerz local banking node. Complete verification protocols instantly.
//               </p>
//             </div>
//           </div>

//           <div className="space-y-4 pt-12 relative z-10">
//             <div className="flex items-center gap-3">
//               <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-black">✓</div>
//               <p className="text-xs font-bold text-neutral-300">Lease Specification Locked</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black animate-pulse">2</div>
//               <p className="text-xs font-bold text-white">Awaiting Digital Remittance</p>
//             </div>
//             <div className="flex items-center gap-3 opacity-40">
//               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold">3</div>
//               <p className="text-xs font-bold text-neutral-400">Inventory Handover Complete</p>
//             </div>
//           </div>

//           <div className="pt-8 border-t border-white/10 flex items-center gap-2 text-[10px] font-bold text-neutral-500 tracking-wider uppercase relative z-10">
//             <Building2 className="w-3.5 h-3.5" /> Platform Secured Node
//           </div>
//         </div>

//         {/* 💳 ডান পাশ: লাক্সারি ইনভয়েস প্যানেল ও গেটওয়ে ফরোয়ার্ডার বোতাম */}
//         <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center space-y-8 bg-white relative">
//           <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40" />
          
//           <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
//             <div className="space-y-0.5">
//               <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Payment Processor</p>
//               <h3 className="text-xl font-black text-gray-900 tracking-tight">SSLCommerz Digital Hub</h3>
//             </div>
//             <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl animate-pulse">
//               <CreditCard className="w-6 h-6 stroke-[1.5]" />
//             </div>
//           </div>

//           {/* ইন্টারেক্টিভ ইনভয়েস গ্লাস-বক্স */}
//           <div className="bg-neutral-50 border border-neutral-200/60 p-5 rounded-2xl space-y-3 font-mono text-xs shadow-inner">
//             <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
//               <span className="text-neutral-400 font-bold">INVOICE TARGET ID</span>
//               <span className="text-gray-900 font-black tracking-tighter bg-white border border-neutral-200 px-2 py-0.5 rounded-md shadow-2xs max-w-[150px] truncate">{rentalId}</span>
//             </div>
//             <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
//               <span className="text-neutral-400 font-bold">REMITTANCE METHOD</span>
//               <span className="text-rose-500 font-black tracking-wide flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> SSLCOMMERZ BDT
//               </span>
//             </div>
//             <div className="flex justify-between items-center pt-1">
//               <span className="text-neutral-400 font-bold">PROCESSING CHARGE</span>
//               <span className="text-emerald-600 font-black uppercase">৳0.00 (Free Node)</span>
//             </div>
//           </div>

//           {/* ইন্টারেক্টিভ বাটন সেট */}
//           <div className="space-y-4">
//             <Button 
//               onClick={handleInitializePayment} 
//               disabled={isProcessing} 
//               className="w-full h-13 bg-gradient-to-r from-gray-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-black text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
//             >
//               {isProcessing ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
//                   <span className="tracking-wide">Deploying Encryption Safeguards...</span>
//                 </>
//               ) : (
//                 <span className="tracking-wide">Authorize & Redirect to Payment</span>
//               )}
//             </Button>
            
//             <button 
//               onClick={() => router.back()} 
//               className="text-xs font-bold text-neutral-400 hover:text-gray-900 transition-colors flex items-center gap-1 justify-center mx-auto cursor-pointer group"
//             >
//               <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
//               Abort Transaction & Return
//             </button>
//           </div>

//           <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
//             <ShieldCheck className="w-4 h-4 shrink-0" />
//             <span>100% AES-256 Encrypted Ledger Verification</span>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }






// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { CreditCard, ShieldCheck, Loader2, ArrowLeft, Building2, CheckCircle2, Ticket } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { createPaymentSessionAction } from "../../../../../(publicGroup)/_actions/tenantAction"; 

// export default function PaymentInitiationPage() {
//   const params = useParams();
//   const router = useRouter();
  
//   // 🎯 ফিক্স ১: প্যারামিটার থেকে আইডি রিড করা (ইউনিক ভ্যারিয়েবল নেম)
//   const rentalId = params.id as string; 
  
//   // 🎯 ফিক্স ২: স্টেট ভ্যারিয়েবল এবং সেটলার ফাংশন ঠিক করা হলো
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleInitializePayment = async () => {
//     setIsProcessing(true);

//       console.log("=== 1. ALL AVAILABLE COOKIES IN BROWSER ===", document.cookie);

      
    
//     // ক্লায়েন্ট সাইড কুকি থেকে একদম নিখুঁত টোকেন এক্সট্র্যাক্ট করার ট্রিক
//     const cookiesMap = Object.fromEntries(
//       document.cookie.split("; ").map((c) => {
//         const [key, ...v] = c.split("=");
//         return [key, v.join("=")];
//       })
//     );
//     const token = cookiesMap["accessToken"] || null;

//       console.log("=== 2. EXTRACTED ACCESS TOKEN ===", token);
//   console.log("=== 3. COOKIES MAP OBJECT ===", cookiesMap);

//     if (!token) {
//       toast.error("Authentication expired or missing. Please log in again.");
//       router.push("/auth/login");
//       return;
//     }

//     try {
//       // .env ফাইল থেকে ডাইনামিক বেস ইউআরএল নিয়ে আসা
//       const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";
//       const sanitizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
      
//       // তোমার রিয়াল কার্ল ডকস অনুযায়ী ১০০% পারফেক্ট এন্ডপয়েন্ট পাথ
//       const targetUrl = `${sanitizedBaseUrl}/api/payments/create`;
//       console.log("🚀 Hitting Real SSLCommerz Gateway URL:", targetUrl);

//       const res = await fetch(targetUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Cookie": `accessToken=${token}`,
//           "Authorization": `Bearer ${token}`
//         },
//         // কার্ল ডকস অনুযায়ী অবজেক্ট কী-এর নাম 'bookingId' পাস করা হলো
//         body: JSON.stringify({ bookingId: rentalId })
//       });

//       const result = await res.json();
//       console.log("🔥 Gateway Response Object:", result);

//       // SSLCommerz লাইভ গেটওয়ে ইউআরএল রিডাইরেক্ট মেকানিজম
//       if (result?.success && result?.GatewayPageURL) {
//         toast.success("Secure checkout session initialized. Redirecting to SSLCommerz...");
//         window.location.replace(result.GatewayPageURL);
//       } else {
//         toast.error(result?.message || "Payment initiation rejected by Render secure node.");
//       }
//     } catch (error) {
//       console.error("Gateway interface connection error:", error);
//       toast.error("Network interface connection failure.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/50 min-h-[85vh] select-none font-sans">
//       <div className="w-full max-w-4xl bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 grid grid-cols-1 md:grid-cols-12">
        
//         {/* 🎨 বাম পাশ: ইন্টারেক্টিভ প্রрость ও ব্রান্ডিং প্যানেল */}
//         <div className="md:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
//           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
//           <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          
//           <div className="space-y-6 relative z-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-xs font-bold text-rose-400 uppercase tracking-widest">
//               <Ticket className="w-3.5 h-3.5" /> Secure Checkout
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-2xl font-black tracking-tight leading-tight">RentNest Premium Billing Gateway</h2>
//               <p className="text-xs text-neutral-400 leading-relaxed">
//                 You are transferring to SSLCommerz local banking node. Complete verification protocols instantly.
//               </p>
//             </div>
//           </div>

//           <div className="space-y-4 pt-12 relative z-10">
//             <div className="flex items-center gap-3">
//               <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-black">✓</div>
//               <p className="text-xs font-bold text-neutral-300">Lease Specification Locked</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-black animate-pulse">2</div>
//               <p className="text-xs font-bold text-white">Awaiting Digital Remittance</p>
//             </div>
//             <div className="flex items-center gap-3 opacity-40">
//               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold">3</div>
//               <p className="text-xs font-bold text-neutral-400">Inventory Handover Complete</p>
//             </div>
//           </div>

//           <div className="pt-8 border-t border-white/10 flex items-center gap-2 text-[10px] font-bold text-neutral-500 tracking-wider uppercase relative z-10">
//             <Building2 className="w-3.5 h-3.5" /> Platform Secured Node
//           </div>
//         </div>

//         {/* 💳 ডান পাশ: লাক্সারি ইনভয়েস প্যানেল ও গেটওয়ে ফরোয়ার্ডার বোতাম */}
//         <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center space-y-8 bg-white relative">
//           <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40" />
          
//           <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
//             <div className="space-y-0.5">
//               <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Payment Processor</p>
//               <h3 className="text-xl font-black text-gray-900 tracking-tight">SSLCommerz Digital Hub</h3>
//             </div>
//             <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl animate-pulse">
//               <CreditCard className="w-6 h-6 stroke-[1.5]" />
//             </div>
//           </div>

//           {/* ইন্টারেক্টিভ ইনভয়েস গ্লাস-বক্স */}
//           <div className="bg-neutral-50 border border-neutral-200/60 p-5 rounded-2xl space-y-3 font-mono text-xs shadow-inner">
//             <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
//               <span className="text-neutral-400 font-bold">INVOICE TARGET ID</span>
//               <span className="text-gray-900 font-black tracking-tighter bg-white border border-neutral-200 px-2 py-0.5 rounded-md shadow-2xs max-w-[150px] truncate">{rentalId}</span>
//             </div>
//             <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
//               <span className="text-neutral-400 font-bold">REMITTANCE METHOD</span>
//               <span className="text-rose-500 font-black tracking-wide flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> SSLCOMMERZ BDT
//               </span>
//             </div>
//             <div className="flex justify-between items-center pt-1">
//               <span className="text-neutral-400 font-bold">PROCESSING CHARGE</span>
//               <span className="text-emerald-600 font-black uppercase">৳0.00 (Free Node)</span>
//             </div>
//           </div>

//           {/* ইন্টারেক্টিভ বাটন সেট */}
//           <div className="space-y-4">
//             <Button 
//               onClick={handleInitializePayment} 
//               disabled={isProcessing} 
//               className="w-full h-13 bg-gradient-to-r from-gray-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-black text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
//             >
//               {isProcessing ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
//                   <span className="tracking-wide">Deploying Encryption Safeguards...</span>
//                 </>
//               ) : (
//                 <span className="tracking-wide">Authorize & Redirect to Payment</span>
//               )}
//             </Button>
            
//             <button 
//               onClick={() => router.back()} 
//               className="text-xs font-bold text-neutral-400 hover:text-gray-900 transition-colors flex items-center gap-1 justify-center mx-auto cursor-pointer group"
//             >
//               <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
//               Abort Transaction & Return
//             </button>
//           </div>

//           <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
//             <ShieldCheck className="w-4 h-4 shrink-0" />
//             <span>100% AES-256 Encrypted Ledger Verification</span>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }





"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck, Loader2, ArrowLeft, Building2, CheckCircle2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
// 🎯 ফিক্স: নতুন সার্ভার অ্যাকশনটি ইম্পোর্ট করা হলো
import { createPaymentSessionAction } from "../../../../../(publicGroup)/_actions/tenantAction"; 

export default function PaymentInitiationPage() {
  const params = useParams();
  const router = useRouter();
  const rentalId = params.id as string; 
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInitializePayment = async () => {
    setIsProcessing(true);
    try {
      // 🚀 ফিক্স: ক্লায়েন্ট সাইড কুকি ড্রপ ট্র্যাপ বাদ দিয়ে সরাসরি সার্ভার অ্যাকশন কল করা হচ্ছে
      const result = await createPaymentSessionAction(rentalId);
      console.log("🔥 Server Action Gateway Response:", result);

      if (result?.success && result?.GatewayPageURL) {
        toast.success("Secure checkout session initialized. Redirecting to SSLCommerz...");
        window.location.replace(result.GatewayPageURL);
      } else {
        toast.error(result?.message || "Payment initiation rejected by Render secure node.");
      }
    } catch (error) {
      console.error("Gateway interface connection error:", error);
      toast.error("Network interface connection failure.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/50 min-h-[85vh] select-none font-sans">
      <div className="w-full max-w-4xl bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 grid grid-cols-1 md:grid-cols-12">
        
        {/* বাম পাশ: ইন্টারেক্টিভ প্রগ্রেস প্যানেল */}
        <div className="md:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-xs font-bold text-rose-400 uppercase tracking-widest">
              <Ticket className="w-3.5 h-3.5" /> Secure Checkout
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight leading-tight">RentNest Premium Billing Gateway</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                You are transferring to SSLCommerz local banking node. Complete verification protocols instantly.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-12 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-black">✓</div>
              <p className="text-xs font-bold text-neutral-300">Lease Specification Locked</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-black animate-pulse">2</div>
              <p className="text-xs font-bold text-white">Awaiting Digital Remittance</p>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold">3</div>
              <p className="text-xs font-bold text-neutral-400">Inventory Handover Complete</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex items-center gap-2 text-[10px] font-bold text-neutral-500 tracking-wider uppercase relative z-10">
            <Building2 className="w-3.5 h-3.5" /> Platform Secured Node
          </div>
        </div>

        {/* ডান পাশ: লাক্সারি ইনভয়েস প্যানেল */}
        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center space-y-8 bg-white relative">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40" />
          
          <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Payment Processor</p>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">SSLCommerz Digital Hub</h3>
            </div>
            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
              <CreditCard className="w-6 h-6 stroke-[1.5]" />
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/60 p-5 rounded-2xl space-y-3 font-mono text-xs shadow-inner">
            <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
              <span className="text-neutral-400 font-bold">INVOICE TARGET ID</span>
              <span className="text-gray-900 font-black tracking-tighter bg-white border border-neutral-200 px-2 py-0.5 rounded-md shadow-2xs max-w-[150px] truncate">{rentalId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-neutral-200/40 pb-2.5">
              <span className="text-neutral-400 font-bold">REMITTANCE METHOD</span>
              <span className="text-rose-500 font-black tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> SSLCOMMERZ BDT
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-neutral-400 font-bold">PROCESSING CHARGE</span>
              <span className="text-emerald-600 font-black uppercase">৳0.00 (Free Node)</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleInitializePayment} 
              disabled={isProcessing} 
              className="w-full h-13 bg-gradient-to-r from-gray-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-black text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                  <span className="tracking-wide">Deploying Encryption Safeguards...</span>
                </>
              ) : (
                <span className="tracking-wide">Authorize & Redirect to Payment</span>
              )}
            </Button>
            
            <button 
              onClick={() => router.back()} 
              className="text-xs font-bold text-neutral-400 hover:text-gray-900 transition-colors flex items-center gap-1 justify-center mx-auto cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
              Abort Transaction & Return
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% AES-256 Encrypted Ledger Verification</span>
          </div>
        </div>

      </div>
    </div>
  );
}

