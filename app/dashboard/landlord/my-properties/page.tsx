"use client";

import { useEffect, useState } from "react";
import {
  getMyProperties,
  deleteProperty,
  toggleAvailability,
} from "../../_actions/landlordAction";
import { toast } from "sonner";
import {
  Trash2,
  RefreshCw,
  MapPin,
  Eye,
  Edit3,
  Plus,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import error from "@/app/error";

export default function MyListingsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে লাইভ লিস্ট লোড করা
  async function loadProperties() {
    setLoading(true);
    try {
      const res = await getMyProperties();
      if (Array.isArray(res)) {
        setProperties(res);
      } else if (res && Array.isArray(res.data)) {
        setProperties(res.data);
      } else if (res && res.data && Array.isArray(res.data.data)) {
        setProperties(res.data.data);
      } else {
        setProperties([]);
      }
    } catch (err) {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const handleToggle = async (propertyId: string, currentStatus: boolean) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("rentnest_token")
        : null;
    const newStatus = !currentStatus;

    try {
      // 📡 এবার খাঁটি ও স্থির প্রপার্টি আইডি দিয়ে এপিআই হিট (কোনো ৪0৪ আসবে না)
      const res = await fetch(
        `https://assignment-4-vnjw.onrender.com/api/landlord/properties/${propertyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          credentials: "include",
          body: JSON.stringify({ isAvailable: newStatus }), // 📦 বডিতে পিওর বুুলিয়ান ভ্যালু পাস
        },
      );

      if (res.ok) {
        // 💻 ব্যাকএন্ড সফল হলে ক্লায়েন্ট সাইড স্টেট লক হবে
        setProperties((prevProperties) =>
          prevProperties.map((p) => {
            const matchId = p._id || p.id;
            if (matchId === propertyId) {
              return { ...p, isAvailable: newStatus };
            }
            return p;
          }),
        );
        toast.success("Availability status synced with cloud database!");
      } else {
        const errRes = await res.json().catch(() => ({}));
        toast.error(errRes?.message || "Server validation error.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network connection failed!");
    }
  };

  const promptDelete = (id: string, title: string) => {
    toast(`Delete listing "${title}"?`, {
      description: "This action cannot be undone on the render database.",
      duration: Infinity,
      action: {
        label: "Confirm",
        onClick: async () => {
          // 🔑 LocalStorage থেকে টোকেন তুলে দুই পাশের ফালতু ডাবল-কোটেশন ক্লিয়ার করা হলো
          let rawToken =
            localStorage.getItem("accessToken") ||
            localStorage.getItem("rentnest_token") ||
            "";
          const cleanToken = rawToken.replace(/^"|"$/g, "").trim(); // 🚀 [ম্যাজিক ফিক্স]

          if (!cleanToken) {
            toast.error("Access token not found. Please log in again.");
            return;
          }

          // 🚀 আইডি এবং একদম ফ্রেশ টোকেন পাস করা হলো
          const res = await deleteProperty(id, cleanToken);

          if (res && res.success) {
            toast.success("Asset removed from cloud inventory.");
            setProperties((prev) =>
              prev.filter((p) => p.id !== id && p._id !== id),
            );
          } else {
            toast.error(res?.message || "Database rejected delete request.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-sm text-neutral-500 font-bold animate-pulse">
        Fetching live landlord inventory list...
      </div>
    );
  }
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* হেডার সেকশন উইথ কুইক লঞ্চ বাটন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-gray-900">
            Inventory Management
          </h1>
          <p className="text-xs text-neutral-500">
            Live grid-less operational registry of your assets.
          </p>
        </div>
        <Link
          href="/dashboard/landlord/properties/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Launch New Asset
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm bg-neutral-50/30">
          Your inventory is completely empty. Launch a new listing to populate
          this database registry!
        </div>
      ) : (
        /* 🛠️ তোমার রিকোয়েস্টেড চমৎকার কমপ্যাক্ট লিস্ট টেবিল ভিউ */
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 text-xs font-bold uppercase tracking-wider border-b border-neutral-100">
                  <th className="p-4">Property Name</th>
                  <th className="p-4">Location & Area</th>
                  <th className="p-4">Daily Rate</th>
                  <th className="p-4">Lease Status</th>
                  <th className="p-4 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700 font-medium">
                {properties.map((item) => (
                  <tr
                    key={item._id || item.id}
                    className="hover:bg-neutral-50/40 transition-colors"
                  >
                    {/* ১. প্রপার্টি নাম ও ক্যাটাগরি */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-100">
                          <img
                            src={item.images?.[0] || "https://unsplash.com"}
                            alt="thumb"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">
                            {item.title}
                          </p>
                          <span className="inline-flex items-center text-[10px] text-neutral-400 uppercase tracking-wide gap-0.5 mt-0.5">
                            <Tag className="w-2.5 h-2.5 text-indigo-500" />
                            {typeof item.categoryId === "object"
                              ? item.categoryId.name
                              : "Asset Listed"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* ২. লোকেশন */}
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-xs text-neutral-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {item.location || "N/A"}, {item.city || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* ৩. প্রাইস রেট */}
                    <td className="p-4">
                      <p className="font-black text-gray-900 text-sm">
                        ৳{item.pricePerDay}
                        <span className="text-[10px] font-normal text-neutral-400">
                          /day
                        </span>
                      </p>
                    </td>

                    {/* ৪. স্ট্যাটাস টগল বাটন */}
                    {/* <td className="p-4">
                      <button 
                        onClick={() => handleToggle(item._id || item.id)} 
                        className={`px-2.5 py-1 text-[11px] font-black rounded-lg border uppercase tracking-wider flex items-center gap-1 transition-all ${ 
                          item.isAvailable !== false 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" 
                            : "bg-neutral-50 text-neutral-500 border-neutral-100 hover:bg-neutral-100" 
                        }`}
                        title="Click to quickly flip operational status"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        {item.isAvailable !== false ? "Available" : "Booked"}
                      </button>
                    </td> */}

                    {/* 💛 তোমার রিকোয়েস্টেড কাস্টম হলুদ কালার এবং প্রফেশনাল স্ট্যাটাস বাটন */}
                    <td className="p-4">
                      {/* <button
                        // 🚀 এখানে item._id এর পাশাপাশি item.isAvailable ও পাস করা হলো
                        onClick={() =>
                          handleToggle(item._id || item.id, item.isAvailable)
                        }
                        className={`px-2.5 py-1 text-[11px] font-black rounded-lg border uppercase tracking-wider flex items-center gap-1 transition-all ${
                          item.isAvailable !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                        }`}
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        {item.isAvailable !== false
                          ? "Available"
                          : "Not Available"}
                      </button> */}

                      <button
                        // ⚡ [ম্যাজিক ফিক্স]: আইডির সোর্স ডাইনামিক করা হলো যাতে কোনো ভুল আইডি পাস না হয়
                        // onClick={() => {
                        //   const actualPropertyId = item.propertyId || item.property?.id || item.property?._id || item.id || item._id;
                        //   handleToggle(actualPropertyId, item.isAvailable);
                        // }}

                        onClick={() => {
                          // ⚡ [বুলেটপ্রুফ আইডি ট্র্যাকিং]: ব্যাকএন্ড যেভাবে প্রপার্টি বা প্রোডাক্ট আইডি পাঠাতে পারে:
                          const actualPropertyId =
                            item._id || // যদি মেইন লেভেলেই প্রপার্টি আইডি থাকে
                            item.id || // যদি প্রিজমা আইডি মেইন লেভেলে থাকে
                            item.property?._id || // যদি নেস্টেড অবজেক্টের ভেতর থাকে
                            item.property?.id ||
                            item.propertyId;

                          // কনসোলে চেক করার জন্য আসল আইডিটা প্রিন্ট হবে
                          console.log(
                            "🎯 Pure Product ID Found:",
                            actualPropertyId,
                          );

                          handleToggle(actualPropertyId, item.isAvailable);
                        }}
                        className={`px-2.5 py-1 text-[11px] font-black rounded-lg border uppercase tracking-wider flex items-center gap-1 transition-all ${
                          item.isAvailable !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                        }`}
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        {item.isAvailable !== false
                          ? "Available"
                          : "Not Available"}
                      </button>
                    </td>

                    {/* ৫. অ্যাকশন বাটন প্যানেল: Details, Update, Delete */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Details Button */}
                        <Link
                          href={`/properties/${item._id || item.id}`}
                          target="_blank"
                          className="p-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 rounded-xl transition-all border border-neutral-200/40"
                          title="View Live Public Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {/* Update / Edit Button */}
                        <Link
                          href={`/dashboard/landlord/properties/update/${item._id || item.id}`}
                          className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all border border-indigo-100/40"
                          title="Edit Core Specification Assets"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Custom Sonner Delete Button */}
                        <button
                          onClick={() =>
                            promptDelete(item._id || item.id, item.title)
                          }
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all border border-rose-100/40"
                          title="Evict Asset From Database"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
