"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CreditCard, Calendar, RefreshCw, CheckCircle2, XCircle, AlertTriangle, Eye, ShieldCheck } from "lucide-react";
import Link from "next/link";

const badgeStyles = {
  VALID: "bg-emerald-50 border-emerald-200 text-emerald-700",
  SUCCESS: "bg-emerald-50 border-emerald-200 text-emerald-700",
  FAILED: "bg-rose-50 border-rose-200 text-rose-700",
  CANCELLED: "bg-amber-50 border-amber-200 text-amber-700",
  PENDING: "bg-neutral-50 border-neutral-200 text-neutral-600"
};

export default function PaymentRow({ pay, index }: { pay: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatus = pay.status || "PENDING";
  const currentBookingId = pay.bookingId || pay.booking?._id || pay.booking?.id || pay.booking;

  return (
    <>
      {/* 📊 প্রধান টেবিল রো */}
      <tr className="hover:bg-neutral-50/40 transition-colors">
        {/* ১. ট্রানজেকশন আইডি */}
        <td className="p-4 font-mono text-xs font-bold text-gray-900 max-w-[140px] truncate">
          {pay.transactionId || pay.tranId || "N/A"}
        </td>

        {/* ২. রিয়াল প্রপার্টি টাইটেল */}
        <td className="p-4">
          <p className="text-gray-900 font-bold line-clamp-1">
            {pay.booking?.property?.title || pay.propertyTitle || "Premium Rental Unit"}
          </p>
        </td>

        {/* ৩. আসল পেমেন্ট টাকা */}
        <td className="p-4 text-rose-500 font-black text-sm">
          ৳{Number(pay.amount || 0).toLocaleString()}
        </td>

        {/* ৪. শর্ট মেথড */}
        <td className="p-4 text-xs text-neutral-500 font-bold uppercase tracking-tight">
          {pay.cardIssuer || pay.cardBrand || pay.paymentMethod || "SSLCommerz"}
        </td>

        {/* ৫. গেটওয়ে স্ট্যাটাস */}
        <td className="p-4">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider inline-flex items-center gap-1 ${badgeStyles[currentStatus as keyof typeof badgeStyles] || badgeStyles.PENDING}`}>
            {(currentStatus === "VALID" || currentStatus === "SUCCESS") && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
            {currentStatus === "FAILED" && <XCircle className="w-3 h-3 text-rose-500" />}
            {currentStatus === "CANCELLED" && <AlertTriangle className="w-3 h-3 text-amber-500" />}
            {currentStatus}
          </span>
        </td>

        {/* 🚀 ৬. অ্যাকশন হাব: ডিটেইলস এবং রি-ট্রাই বাটন কন্ট্রোলার */}
        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            {/* ইন্টারেক্টিভ ডিটেইলস টগল বাটন */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-500 hover:text-gray-900 hover:bg-neutral-100 rounded-xl transition-all border border-neutral-200/50 bg-neutral-50/50 cursor-pointer"
              title="View Invoice Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* ফেইল বা ক্যানসেল হলে রি-ট্রাই করার সুযোগ */}
            {currentStatus === "FAILED" || currentStatus === "CANCELLED" || currentStatus === "PENDING" ? (
              <Link href={`/dashboard/tenant/requests/${currentBookingId}/pay`}>
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95 cursor-pointer inline-flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-pulse" /> Retry Pay
                </button>
              </Link>
            ) : currentStatus === "VALID" || currentStatus === "SUCCESS" ? (
              <span className="text-[10px] text-emerald-600 font-black uppercase bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">Settled</span>
            ) : (
              <span className="text-xs text-neutral-400 italic font-medium">Processed</span>
            )}
          </div>
        </td>
      </tr>

      {/* 🎯 ৭. গ্লাস-মরফিজম ইন্টারেক্টিভ পেমেন্ট ডিটেইলস সাব-প্যানেল */}
      {isOpen && (
        <tr>
          <td colSpan={6} className="p-4 bg-neutral-50/50 border-t border-b border-neutral-100/70">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-left p-2 animate-fadeIn">
              
              {/* বক্স ১: মেথড ও টাইপ কার্ড */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-rose-500" /> Channel Specifications
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>METHOD: <span className="text-rose-500">{pay.cardType || "Digital Wallet"}</span></p>
                  <p>ISSUER: <span className="text-neutral-700">{pay.cardIssuer || pay.bankTranId || "SSLCommerz Node"}</span></p>
                  <p>BRAND: <span className="text-neutral-700">{pay.cardBrand || "MOBILE / CARD"}</span></p>
                </div>
              </div>

              {/* বক্স ২: ট্রানজেকশন মেটাডাটা */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Security Telemetry
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>GATEWAY REF: <span className="text-neutral-600 truncate max-w-[150px] inline-block align-bottom">{pay.bankTranId || pay.tranId}</span></p>
                  <p>CURRENCY: <span className="text-neutral-700">{pay.currency || "BDT (৳)"}</span></p>
                  <p>STORE AMOUNT: <span className="text-emerald-600">৳{Number(pay.storeAmount || pay.amount).toLocaleString()}</span></p>
                </div>
              </div>

              {/* বক্স ৩: তারিখ ও বুকিং ম্যাপ */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Timestamp Node
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>SETTLED DATE: <span className="text-neutral-600">{pay.createdAt ? new Date(pay.createdAt).toLocaleString() : new Date().toLocaleDateString()}</span></p>
                  <p>BOOKING REF ID: <span className="text-indigo-600 truncate max-w-[130px] inline-block align-bottom">{currentBookingId}</span></p>
                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}
