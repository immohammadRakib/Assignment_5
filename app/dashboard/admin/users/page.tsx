'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/app/store/userStore';
import { Users, Loader2, Search } from 'lucide-react';
import UserRow from './userRow';

export default function UserManagementPage() {
  const { users, isLoading, fetchUsers } = useUserStore();
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  useEffect(() => {
    fetchUsers(API_BASE);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-sm shadow-rose-100">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-0.5">Control access and monitor activity</p>
          </div>
        </div>

        {/* সার্চ বার (স্ট্যাটিক ডিজাইনের জন্য) */}
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-rose-200 transition-all w-full sm:w-64 shadow-sm"
          />
        </div>
      </div>

      {/* ইউজার লিস্ট */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          <p className="text-xs font-bold uppercase tracking-widest">Accessing User Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
          {users.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 text-sm">
              No users found in the system.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
