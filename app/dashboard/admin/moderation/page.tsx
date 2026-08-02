"use client";

import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useUserStore } from "@/app/store/userStore";
import {
  ShieldAlert,
  Loader2,
  Home,
  CheckCircle2,
  AlertCircle,
  Layers,
} from "lucide-react";
import PropertyRow from "./propertyRow";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function ModerationContent() {
  const { setExpandedPropertyId } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");
  const API_BASE =
    process.env.BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["adminProperties", currentPage],
    queryFn: async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rentnest_token")
          : null;
      const res = await fetch(
        `${API_BASE}/api/admin/properties?page=${currentPage}&limit=100`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  const rawProperties = apiResponse?.data?.data || apiResponse?.data || [];

  const filteredProperties = rawProperties.filter((p: any) => {
    if (activeFilter === "ALL") return true;
    return (p.status || "PENDING") === activeFilter;
  });

  const totalCount = rawProperties.length;
  const pendingCount = rawProperties.filter(
    (p: any) => (p.status || "PENDING") === "PENDING",
  ).length;
  const approvedCount = rawProperties.filter(
    (p: any) => p.status === "APPROVED",
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Property Approvals
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Control submissions, verify landlord listings, and update RentNest
              statuses
            </p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/40 self-start md:self-center">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveFilter(tab);
                setExpandedPropertyId(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === tab
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Submissions
            </span>
            <h3 className="text-2xl font-black text-slate-800">
              {isLoading ? "..." : totalCount}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Home className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Awaiting Review
            </span>
            <h3 className="text-2xl font-black text-amber-600">
              {isLoading ? "..." : pendingCount}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl animate-pulse">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Live Properties
            </span>
            <h3 className="text-2xl font-black text-emerald-600">
              {isLoading ? "..." : approvedCount}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-4">Property Information</div>
          <div className="col-span-3">Landlord / Owner</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-right">Details</div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400/80">
              Scanning Property Directory...
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/70">
            {filteredProperties.map((property: any) => (
              <PropertyRow key={property.id} property={property} />
            ))}

            {filteredProperties.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 flex items-center justify-center rounded-2xl mx-auto mb-3 border border-slate-100">
                  <Layers className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium">
                  No properties found matching "{activeFilter}" filter.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertyModerationPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModerationContent />
    </QueryClientProvider>
  );
}
