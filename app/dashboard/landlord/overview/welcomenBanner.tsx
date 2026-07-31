'use client';
import { Sparkles } from 'lucide-react';

interface BannerProps {
  userName: string;
}

export default function WelcomeBanner({ userName }: BannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-8 md:p-10 shadow-xl shadow-slate-900/10 transition-all duration-700 transform hover:scale-[1.002]">
      <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border border-white/10 w-fit">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Premium Landlord Portal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
          Welcome back, <span className="underline decoration-wavy decoration-rose-400/60">{userName}</span>!
        </h1>
        <p className="text-sm font-medium text-white/80 leading-relaxed">
          Monitor real-time rental applications, track live revenue data, and oversee platform asset performances.
        </p>
      </div>
    </div>
  );
}
