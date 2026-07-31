'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/store/userStore';
import { Users, Loader2, Search, Ban, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import UserRow from './userRow';

export default function UserManagementPage() {
  const { users, isLoading, totalPages, fetchUsers } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 🚀 কারেন্ট পেজ স্টেট
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  // যখনই পেজ চেঞ্জ হবে, নতুন পেজের ডেটা এপিআই থেকে আসবে
  useEffect(() => {
    fetchUsers(API_BASE, currentPage);
  }, [currentPage]);

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Page {currentPage} of {totalPages} — Active sessions</p>
          </div>
        </div>

        {/* সার্চ বার */}
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

      {/* ইউজার টেবিল কন্টেইনার */}
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
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400/80">Securing Database Access...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/70">
            {filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p className="text-sm font-medium">No system users found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🚀 মডার্ন পেজিনেশন কন্ট্রোল বাটনস */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 border border-slate-100 rounded-2xl shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Showing page <span className="font-bold text-slate-800">{currentPage}</span> of <span className="font-bold text-slate-800">{totalPages}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
