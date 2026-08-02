"use client";

import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useUserStore } from "@/app/store/userStore";
import {
  Users,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UserRow from "./userRow";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function UserManagementContent() {
  const { setExpandedUserId } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const API_BASE =
    process.env.BACKEND_API_URL || "https://assignment-4-vnjw.onrender.com";

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rentnest_token")
          : null;
      const res = await fetch(
        `${API_BASE}/api/admin/users?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const rawUsers = apiResponse?.data?.data || apiResponse?.data || [];
  const totalPages = apiResponse?.data?.meta?.totalPage || 1;

  const filteredUsers = rawUsers.filter(
    (user: any) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      {/* হেডার */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg shadow-rose-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              User Management
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Monitor all Registered RentNest user Accounts
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          <input
            type="text"
            placeholder="Search on this page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all w-full shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-4">User Information</div>
          <div className="col-span-3">Email Address</div>
          <div className="col-span-2">System Role</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400/80">
              Querying Database...
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/70">
            {filteredUsers.map((user: any) => (
              <UserRow key={user.id} user={user} />
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p className="text-sm font-medium">
                  No system users found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 border border-slate-100 rounded-2xl shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Showing page{" "}
            <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-800">{totalPages}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                setExpandedUserId(null);
              }}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                setExpandedUserId(null);
              }}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserManagementContent />
    </QueryClientProvider>
  );
}
