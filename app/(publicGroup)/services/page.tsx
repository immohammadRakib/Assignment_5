"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserPlus,
  LayoutDashboard,
  FilePlus,
  CheckCircle2,
  Search,
  Eye,
  CreditCard,
  Star,
  ArrowRight,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function ServicePage() {
  const router = useRouter();

  const landlordSteps = [
    {
      icon: UserPlus,
      title: "Quick Onboarding",
      desc: "Register as a Landlord and set up your profile.",
    },
    {
      icon: LayoutDashboard,
      title: "Smart Dashboard",
      desc: "Manage all your properties from one central hub.",
    },
    {
      icon: FilePlus,
      title: "Create Listing",
      desc: "List your Apartment, Studio, or Store easily.",
    },
    {
      icon: CheckCircle2,
      title: "Instant Approval",
      desc: "Review tenant requests and approve with a click.",
    },
  ];

  const tenantSteps = [
    {
      icon: Search,
      title: "Easy Discovery",
      desc: "Browse thousands of verified properties.",
    },
    {
      icon: Eye,
      title: "Virtual Tour",
      desc: "View detailed photos and facilities.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      desc: "Pay rent via Stripe or SSLCommerz safely.",
    },
    {
      icon: Star,
      title: "Rate & Review",
      desc: "Share your stay experience with the community.",
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FF385C] font-black text-xs uppercase tracking-widest px-4 py-2 bg-rose-50 rounded-full"
          >
            How RentNest Serves You
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Tailored Experiences for <br />{" "}
            <span className="text-[#FF385C]">Everyone.</span>
          </h1>
        </div>

        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              For Landlords
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {landlordSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1,
                }}
                viewport={{ once: true }}
                className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-white text-[#FF385C] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#FF385C] text-white rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">For Tenants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tenantSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1,
                }}
                viewport={{ once: true }}
                className="group p-8 bg-rose-50/30 rounded-3xl border border-rose-100/20 hover:bg-white hover:shadow-2xl hover:shadow-rose-500/10 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-white text-[#FF385C] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-slate-900 p-10 md:p-16 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-slate-400 font-medium">
              Choose your role and explore the possibilities.
            </p>
          </div>
          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <button
              onClick={() => router.push("/auth/register")}
              className="flex-1 md:flex-none px-8 py-4 bg-[#FF385C] text-white font-black rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-95 cursor-pointer"
            >
              I'm a Landlord
            </button>

            <button
              onClick={() => router.push("/auth/register")}
              className="flex-1 md:flex-none px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
            >
              I'm a Tenant
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
