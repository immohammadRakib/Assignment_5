'use client';
import { UserCheck } from 'lucide-react';

interface BannerProps {
  userName: string;
}

export default function TenantBanner({ userName }: BannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-8 md:p-10 shadow-xl shadow-slate-900/10 transition-all duration-700 transform hover:scale-[1.002]">
      <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border border-white/10 w-fit">
          <UserCheck className="w-4 h-4 text-pink-200" />
          <span>Verified Tenant Portal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
          Welcome back, <span className="underline decoration-wavy decoration-rose-400/60">{userName}</span>!
        </h1>
        <p className="text-sm font-medium text-white/80 leading-relaxed">
          Manage your RentNest rental journey, review payment invoices, and track your active stays or pending applications.
        </p>
      </div>
    </div>
  );
}
