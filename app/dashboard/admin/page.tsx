'use client';

import { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Building2, Users, Receipt, CalendarDays, TrendingUp, LayoutDashboard } from 'lucide-react';
import jwt from 'jsonwebtoken';
import WelcomeBanner from './overview/welcomeBanner'; // উপরে তৈরি করা ব্যানার
import DashboardBottomGrid from './overview/bottomGrid'; // উপরে তৈরি করা বটম প্যানেল

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function DashboardHomeContent() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'LANDLORD' | 'TENANT' | null>(null);
  const [userName, setUserName] = useState('User');
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
    if (token) {
      try {
        const decoded = jwt.decode(token) as any;
        if (decoded) {
          setUserRole(decoded.role || 'TENANT');
          setUserName(decoded.name || 'User');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
      const res = await fetch(`${API_BASE}/api/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch data');

      const resData = await res.json();
    console.log("ড্যাশবোর্ড এপিআই থেকে আসা আসল অবজেক্ট:", resData);
    
    return resData;
      
      // return res.json();
    },
  });

  const stats = apiResponse?.data || {};


  // বড় টাকাকে M, B, T ফরম্যাটে রূপান্তর করার ইন্টারন্যাশনাল ফাংশন
const formatEarnings = (num: number) => {
  if (!num) return "0";
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2).replace(/\.00$/, "") + " T"; // Trillion (টি)
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2).replace(/\.00$/, "") + " B"; // Billion (বি)
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2).replace(/\.00$/, "") + " M"; // Million (এম)
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K"; // Thousand (কে)
  }
  return num.toString();
};


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      
      {/* 🚀 পার্ট ১: ব্যানার কল করা হলো */}
      <WelcomeBanner userRole={userRole} userName={userName} />

      {/* 📊 লাইভ ম্যাট্রিক্স কার্ডস */}
      {/* <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <LayoutDashboard className="w-4 h-4 text-rose-500" /> Live Platform Metrics
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Properties</span>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.totalProperties ?? 0}</h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> System Live</span>
              </div>
              <div className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Registered Users</span>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.totalUsers ?? 0}</h3>
                <span className="text-[10px] text-indigo-500 font-bold">Active Members</span>
              </div>
              <div className="p-3.5 bg-indigo-50 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.totalBookings || stats.totalRentals || 0}</h3>
                <span className="text-[10px] text-amber-500 font-bold">Lease Contracts</span>
              </div>
              <div className="p-3.5 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <CalendarDays className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gross Payments</span>
                <h3 className="text-3xl font-black text-emerald-600 tracking-tight">{stats.totalPayments || stats.totalRevenue || 0} BDT</h3>
                <span className="text-[10px] text-slate-400 font-semibold">Processed Secured</span>
              </div>
              <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <Receipt className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}
      </div> */}

<div className="space-y-4">
  <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
    <LayoutDashboard className="w-4 h-4 text-rose-500" /> Live Platform Metrics
  </h2>

  {isLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse h-28" />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* কার্ড ১: মোট প্রপার্টি (totalProperties) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Properties</span>
          {/* <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.totalProperties ?? 0}</h3> */}
          <h3 className="text-3xl font-black text-emerald-600 tracking-tight">
  {formatEarnings(stats.totalPlatformEarnings)} BDT
</h3>

          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> System Live</span>
        </div>
        <div className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* 🚀 কার্ড ২: মোট রেজিস্টার্ড ইউজার (Tenants + Landlords এর যোগফল) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Registered Users</span>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">
            {(Number(stats.totalTenants || 0) + Number(stats.totalLandlords || 0))}
          </h3>
          <span className="text-[10px] text-indigo-500 font-bold">{stats.totalLandlords ?? 0} Owners | {stats.totalTenants ?? 0} Tenants</span>
        </div>
        <div className="p-3.5 bg-indigo-50 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* 🚀 কার্ড ৩: মোট কনফার্মড বুকিং (totalConfirmedBookings) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Leases</span>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.totalConfirmedBookings ?? 0}</h3>
          <span className="text-[10px] text-amber-500 font-bold">{stats.totalRentalRequests ?? 0} Pending Requests</span>
        </div>
        <div className="p-3.5 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
          <CalendarDays className="w-6 h-6" />
        </div>
      </div>

      {/* 🚀 কার্ড ৪: মোট প্লাটফর্ম আর্নিং (totalPlatformEarnings) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300 group">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gross Earnings</span>
          <h3 className="text-3xl font-black text-emerald-600 tracking-tight">{stats.totalPlatformEarnings ?? 0} BDT</h3>
          <span className="text-[10px] text-slate-400 font-semibold">100% Processed Secured</span>
        </div>
        <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
          <Receipt className="w-6 h-6" />
        </div>
      </div>

    </div>
  )}
</div>


      {/* 🚀 পার্ট ২: বটম গ্রিড প্যানেল কল করা হলো */}
      <DashboardBottomGrid />

    </div>
  );
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardHomeContent />
    </QueryClientProvider>
  );
}
