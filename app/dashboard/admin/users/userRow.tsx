'use client';
import { useUserStore } from '@/app/store/userStore';
import { UserCircle, Shield, Mail, Activity, Lock, Unlock, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function UserRow({ user }: { user: any }) {
  const { expandedUserId, setExpandedUserId, updateUserStatus } = useUserStore();
  const isExpanded = expandedUserId === user.id;
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  return (
    <div className={`bg-white rounded-2xl border transition-all ${isExpanded ? 'border-rose-200 shadow-lg' : 'border-slate-100'}`}>
      {/* মেইন রো (ক্লিক করলে এক্সপ্যান্ড হবে) */}
      <div 
        onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl ${user.status === 'BLOCKED' ? 'bg-red-50 text-red-500' : 'bg-rose-50 text-rose-500'}`}>
            <UserCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{user.name}</h3>
            <p className="text-[px] font-black uppercase tracking-widest text-slate-400">{user.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-[px] font-black ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {user.status}
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-300" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
        </div>
      </div>

      {/* এক্সপ্যান্ডেবল ডিটেইলস প্যানেল */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-50 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* ইমেইল ও রোল */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">Role Privilege: {user.role}</span>
              </div>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="flex flex-wrap items-center gap-3 justify-end">
              {/* অ্যাক্টিভিটি বাটন */}
              <Link 
                href={`/dashboard/admin/users/${user.id}/activity`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition-all"
              >
                <Activity className="w-3.5 h-3.5" /> View Activity
              </Link>

              {/* ব্লক/আনব্লক বাটন */}
              <button
                onClick={() => updateUserStatus(API_BASE, user.id, user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  user.status === 'ACTIVE' 
                  ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                }`}
              >
                {user.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                {user.status === 'ACTIVE' ? 'Block User' : 'Activate User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
