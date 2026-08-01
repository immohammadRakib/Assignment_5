"use client";

import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { LayoutDashboard, CalendarCheckIcon } from "lucide-react";
import jwt from "jsonwebtoken";
import WelcomeBanner from "./overview/welcomenBanner";
import StatsGrid from "./overview/statsGrid";
import { IncomingRequestsList } from "../_components/incomingRequest";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function LandlordDashboardContent() {
  const [userName, setUserName] = useState("User");
  const API_BASE =
    process.env.BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("rentnest_token")
        : null;
    if (token) {
      try {
        const decoded = jwt.decode(token) as any;
        if (decoded && decoded.name) {
          setUserName(decoded.name);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const { data: reqResponse } = useQuery({
    queryKey: ["incomingRequests"],
    queryFn: async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rentnest_token")
          : null;

      const res = await fetch(`${API_BASE}/api/rentals/landlord/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch requests");
      return res.json();
    },
  });

  const incomingRequests = reqResponse?.data?.data || reqResponse?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      <WelcomeBanner userName={userName} />

      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <LayoutDashboard className="w-4 h-4 text-rose-500" /> Live Portfolio
          Metrics
        </h2>
        <StatsGrid />
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <h2 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-rose-500 rounded-full inline-block" />
            Incoming Rental Applications
          </h2>
          <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
            Active Broadcast Queue
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden p-2">
          {incomingRequests.length > 0 ? (
            <IncomingRequestsList initialRequests={incomingRequests} />
          ) : (
            <div className="text-center py-20 text-slate-400 max-w-xl mx-auto">
              <div className="w-14 h-14 bg-slate-50 text-slate-400 flex items-center justify-center rounded-2xl mx-auto mb-4 border border-slate-100">
                <CalendarCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">
                Clear Broadcast Queue
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                No incoming tenant applications found. Active property listings
                are searching for tenants live.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LandlordDashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandlordDashboardContent />
    </QueryClientProvider>
  );
}
