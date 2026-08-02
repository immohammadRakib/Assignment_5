"use client";
import { ShieldCheck, Sparkles, UserCheck } from "lucide-react";

interface BannerProps {
  userRole: "ADMIN" | "LANDLORD" | "TENANT" | null;
  userName: string;
}

export default function WelcomeBanner({ userRole, userName }: BannerProps) {
  const getRoleTheme = () => {
    if (userRole === "ADMIN")
      return {
        title: "System Super-Admin",
        gradient: "from-slate-900 via-purple-900 to-indigo-950",
        tagline:
          "Global overview of RentNest infrastructure, platform analytics, and security audits.",
        icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      };
    if (userRole === "LANDLORD")
      return {
        title: "Premium Landlord",
        gradient: "from-amber-600 via-orange-600 to-rose-700",
        tagline:
          "Track your property performances, lease requests, and monthly rental revenue updates.",
        icon: <Sparkles className="w-5 h-5 text-amber-300" />,
      };
    return {
      title: "Verified Tenant",
      gradient: "from-rose-500 via-pink-500 to-purple-600",
      tagline:
        "Explore active listings, monitor your rental bookings, and review billing invoices.",
      icon: <UserCheck className="w-5 h-5 text-pink-200" />,
    };
  };

  const theme = getRoleTheme();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${theme.gradient} text-white p-8 md:p-10 shadow-xl shadow-slate-900/10 transition-all duration-700 transform hover:scale-[1.002]`}
    >
      <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border border-white/10 w-fit">
          {theme.icon}
          <span>{theme.title} Portal</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
          Welcome back,{" "}
          <span className="underline decoration-wavy decoration-rose-400/60">
            {userName}
          </span>
          !
        </h1>
        <p className="text-sm font-medium text-white/80 leading-relaxed">
          {theme.tagline}
        </p>
      </div>
    </div>
  );
}
