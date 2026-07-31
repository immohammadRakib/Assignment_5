'use client';
import { Activity, Clock, Users, ShieldAlert, FolderHeart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardBottomGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
      {/* অডিট লগ টাইমলাইন */}
      <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-slate-400" /> Recent System Audit Logs
        </h3>
        
        <div className="relative border-l border-slate-100 pl-5 space-y-6 py-2">
          <div className="relative">
            <div className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-50" />
            <p className="text-xs font-bold text-slate-800">New Landlord Registration</p>
            <p className="text-[11px] text-slate-400 mt-0.5">User <span className="text-slate-600 font-medium">Amzad Hossain</span> updated access token status to active.</p>
            <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md mt-1.5 inline-block font-medium">10 mins ago</span>
          </div>

          <div className="relative">
            <div className="absolute -left-7 top-1 w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-50" />
            <p className="text-xs font-bold text-slate-800">Property Listing Submitted</p>
            <p className="text-[11px] text-slate-400 mt-0.5">A new rental unit was submitted to the moderation dashboard queue.</p>
            <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md mt-1.5 inline-block font-medium">1 hour ago</span>
          </div>
        </div>
      </div>

      {/* কুইক কমান্ড প্যানেল */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" /> Admin Command Center
        </h3>
        
        <Link href="/dashboard/admin/users" className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-rose-50/40 rounded-2xl border border-slate-100 group transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl"><Users className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-slate-700">Manage Users</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 transition-colors" />
        </Link>

        <Link href="/dashboard/admin/moderation" className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50/40 rounded-2xl border border-slate-100 group transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><ShieldAlert className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-slate-700">Moderate Properties</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
