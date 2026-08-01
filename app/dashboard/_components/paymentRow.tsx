"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Calendar,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { ReviewActionButton } from "@/app/(publicGroup)/_components/properties/reviewButton";

const badgeStyles = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "APPROVED":
      return "bg-sky-50 text-sky-700 border-sky-200/60";
    case "REJECTED":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "COMPLETED":
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
};

export default function PaymentRow({
  pay,
  index,
}: {
  pay: any;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatus = pay.status || "PENDING";
  const currentBookingId =
    pay.bookingId || pay.booking?._id || pay.booking?.id || pay.booking;

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
            {pay.booking?.property?.title ||
              pay.propertyTitle ||
              "Premium Rental Unit"}
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
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider inline-flex items-center gap-1 ${badgeStyles(currentStatus)}`}
          >
            {(currentStatus === "VALID" || currentStatus === "SUCCESS") && (
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            )}
            {currentStatus === "FAILED" && (
              <XCircle className="w-3 h-3 text-rose-500" />
            )}
            {currentStatus === "CANCELLED" && (
              <AlertTriangle className="w-3 h-3 text-amber-500" />
            )}
            {currentStatus}
          </span>
        </td>

        {/* 🚀 ৬. অ্যাকশন হাব: ডিটেইলস এবং রি-ট্রাই বাটন কন্ট্রোলার */}
        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            {/* ১. ডিটেইলস দেখার বাটন */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-500 hover:text-gray-900 hover:bg-neutral-100 rounded-xl transition-all border border-neutral-200/50 bg-neutral-50/50 cursor-pointer"
            >
              <Eye className="size-3.5" />
            </button>

            {/* 🚀 ২. কিলার বাটন লজিক: পেমেন্ট হিস্ট্রি অবজেক্ট থেকে রিভিউ বাটন এক্সট্র্যাক্ট করা */}
            {(() => {
              const stat = (pay.status || "").toLowerCase();

              // 🎯 মোস্ট ইম্পর্ট্যান্ট: পেমেন্ট অবজেক্ট থেকে নিখুঁতভাবে আইডিগুলো বের করা
              // পেমেন্ট এপিআই-তে সাধারণত ডাটা থাকে pay.booking.property.id ফরম্যাটে
              const bookingRef = pay.booking || {};
              const bID = pay.bookingId || bookingRef.id || bookingRef._id;
              const pID =
                bookingRef.property?.id ||
                bookingRef.property?._id ||
                pay.propertyId;

              // কন্ডিশন A: পেমেন্ট ফেইল বা ক্যানসেল হলে রি-ট্রাই বাটন
              if (["failed", "fail", "cancelled", "cancel"].includes(stat)) {
                return (
                  <Link href={`/dashboard/tenant/requests/${bID}/pay`}>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-[px] px-3 py-1.5 rounded-lg shadow-sm transition active:scale-95 cursor-pointer inline-flex items-center gap-1">
                      <RefreshCw className="size-3 animate-pulse" /> Retry Pay
                    </button>
                  </Link>
                );
              }

              // 🎯 কন্ডিশন B: পেমেন্ট সফল হলে রিভিউ বাটন (যা এখন কাজ করবেই!)
              if (
                ["success", "valid", "paid", "active", "completed"].includes(
                  stat,
                )
              ) {
                return (
                  <ReviewActionButton pID={pID} bID={bID} status={stat} />

                  // <Link href={`/dashboard/tenant/reviews/write?propertyId=${pID}&bookingId=${bID}`}>
                  //   <button className="bg-gray-950 hover:bg-black text-white font-black font-semibold text-[px] px-3 py-1.5 rounded-lg shadow-sm transition active:scale-95 cursor-pointer inline-flex items-center gap-1">
                  //     Leave Review <Star className="size-3 fill-amber-400 text-amber-400" />
                  //   </button>
                  // </Link>
                );
              }

              // ডিফল্ট: অন্য কোনো স্ট্যাটাস থাকলে সাধারণ ব্যাজ
              return (
                <span className="text-[px] text-neutral-400 italic font-medium bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100/50 uppercase">
                  Processed
                </span>
              );
            })()}
          </div>
        </td>
      </tr>

      {/* 🎯 ৭. গ্লাস-মরফিজম ইন্টারেক্টিভ পেমেন্ট ডিটেইলস সাব-প্যানেল */}
      {isOpen && (
        <tr>
          <td
            colSpan={6}
            className="p-4 bg-neutral-50/50 border-t border-b border-neutral-100/70"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-left p-2 animate-fadeIn">
              {/* বক্স ১: মেথড ও টাইপ কার্ড */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-rose-500" /> Channel
                  Specifications
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>
                    METHOD:{" "}
                    <span className="text-rose-500">
                      {pay.cardType || "Digital Wallet"}
                    </span>
                  </p>
                  <p>
                    ISSUER:{" "}
                    <span className="text-neutral-700">
                      {pay.cardIssuer || pay.bankTranId || "SSLCommerz Node"}
                    </span>
                  </p>
                  <p>
                    BRAND:{" "}
                    <span className="text-neutral-700">
                      {pay.cardBrand || "MOBILE / CARD"}
                    </span>
                  </p>
                </div>
              </div>

              {/* বক্স ২: ট্রানজেকশন মেটাডাটা */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                  Security Telemetry
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>
                    GATEWAY REF:{" "}
                    <span className="text-neutral-600 truncate max-w-[150px] inline-block align-bottom">
                      {pay.bankTranId || pay.tranId}
                    </span>
                  </p>
                  <p>
                    CURRENCY:{" "}
                    <span className="text-neutral-700">
                      {pay.currency || "BDT (৳)"}
                    </span>
                  </p>
                  <p>
                    STORE AMOUNT:{" "}
                    <span className="text-emerald-600">
                      ৳{Number(pay.storeAmount || pay.amount).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* বক্স ৩: তারিখ ও বুকিং ম্যাপ */}
              <div className="bg-white border border-neutral-200/60 p-4 rounded-xl space-y-2 shadow-3xs">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Timestamp
                  Node
                </p>
                <div className="space-y-1 pt-1 text-gray-900 font-bold">
                  <p>
                    SETTLED DATE:{" "}
                    <span className="text-neutral-600">
                      {pay.createdAt
                        ? new Date(pay.createdAt).toLocaleString()
                        : new Date().toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    BOOKING REF ID:{" "}
                    <span className="text-indigo-600 truncate max-w-[130px] inline-block align-bottom">
                      {currentBookingId}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
