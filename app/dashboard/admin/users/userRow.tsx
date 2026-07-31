
'use client';

import { useUserStore } from '@/app/store/userStore';
import { useQueryClient } from '@tanstack/react-query'; // 🚀 TanStack Query ম্যাজিক ইমপোর্ট
import { UserCircle, Shield, Mail, Activity, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function UserRow({ user }: { user: any }) {
  const { expandedUserId, setExpandedUserId } = useUserStore();
  const queryClient = useQueryClient(); // 🚀 এটি দিয়ে আমরা ডাটা ক্যাশ রিফ্রেশ করবো
  const isExpanded = expandedUserId === user.id;
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  const currentStatus = user.activeStatus || 'ACTIVE';

  // 🔧 ইউজার স্ট্যাটাস আপডেট করার লোকাল ফাংশন
  const handleStatusUpdate = async (newStatus: 'ACTIVE' | 'BLOCKED') => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`User successfully ${newStatus === 'ACTIVE' ? 'Activated' : 'Blocked'}!`);
        // 🚀 [ম্যাজিক লাইন] এটি করার সাথে সাথে TanStack Query ব্যাকগ্রাউন্ডে ডেটা রি-ফেচ করে স্ক্রিন আপডেট করে দেবে!
        queryClient.invalidateQueries({ queryKey: ['users'] }); 
      } else {
        toast.error('Failed to update status on server.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className={`bg-white transition-all ${isExpanded ? 'bg-slate-50/40 shadow-inner' : 'hover:bg-slate-50/30'}`}>
      <div 
        onClick={() => setExpandedUserId(isExpanded ? null : user.id)} 
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 py-4 cursor-pointer text-slate-700 select-none group"
      >
        <div className="col-span-1 lg:col-span-4 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${currentStatus === 'BLOCKED' ? 'bg-red-50 text-red-500' : 'bg-rose-50 text-rose-500'}`}>
            <UserCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{user.name || 'N/A'}</h3>
            <span className="lg:hidden text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md mt-1 inline-block">
              {user.role}
            </span>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 text-sm font-medium text-slate-500 break-all lg:break-normal">
          {user.email}
        </div>

        <div className="hidden lg:block col-span-2 text-xs font-black uppercase tracking-wider text-slate-400">
          {user.role}
        </div>

        <div className="col-span-1 lg:col-span-2 text-left lg:text-center">
          <span className={`px-3 py-1 rounded-full text-[11px] font-black ${currentStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {currentStatus}
          </span>
        </div>

        <div className="col-span-1 lg:col-span-1 text-right flex items-center justify-end gap-2">
          {isExpanded ? <EyeOff className="w-4 h-4 text-rose-500" /> : <Eye className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Privilege Level: <strong className="text-slate-700">{user.role}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Link 
                href={`/dashboard/admin/users/${user.id}/activity`} 
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition-all"
              >
                <Activity className="w-3.5 h-3.5" /> Activity
              </Link>
              <button 
                onClick={() => handleStatusUpdate(currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE')} 
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  currentStatus === 'ACTIVE' 
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100/70' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/70'
                }`}
              >
                {currentStatus === 'ACTIVE' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                {currentStatus === 'ACTIVE' ? 'Block' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
