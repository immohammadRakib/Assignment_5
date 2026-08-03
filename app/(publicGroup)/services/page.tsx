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
  Home,
  ShieldCheck,
  Compass,
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
    <main className="min-h-screen bg-white pt-24 pb-20 overflow-hidden dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FF385C] font-black text-xs uppercase tracking-widest px-4 py-2 bg-rose-50 rounded-full dark:bg-rose-950/40 dark:text-rose-400"
          >
            How RentNest Serves You
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight dark:text-slate-100">
            Tailored Experiences for <br />{" "}
            <span className="text-[#FF385C] dark:text-rose-400">Everyone.</span>
          </h1>
        </div>

        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center dark:bg-slate-800 border dark:border-slate-700/50">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
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
                viewport={{ once: false }}
                className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-default dark:bg-slate-900/50 dark:border-slate-800/60 dark:hover:bg-slate-900 dark:hover:border-rose-900/40 dark:hover:shadow-rose-950/10"
              >
                <div className="w-12 h-12 bg-white text-[#FF385C] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-6 dark:bg-slate-800 dark:text-rose-400">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 dark:text-slate-200">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed dark:text-slate-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#FF385C] text-white rounded-2xl flex items-center justify-center dark:bg-rose-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
              For Tenants
            </h2>
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
                viewport={{ once: false }}
                className="group p-8 bg-rose-50/30 rounded-3xl border border-rose-100/20 hover:bg-white hover:shadow-2xl hover:shadow-rose-500/10 transition-all cursor-default dark:bg-rose-950/10 dark:border-rose-900/20 dark:hover:bg-slate-900 dark:hover:border-rose-900/40 dark:hover:shadow-rose-950/20"
              >
                <div className="w-12 h-12 bg-white text-[#FF385C] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-6 dark:bg-slate-800 dark:text-rose-400">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 dark:text-slate-200">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed dark:text-slate-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-slate-900 p-10 md:p-16 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden dark:bg-slate-900 dark:border dark:border-slate-800"
        >
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight dark:text-slate-100">
              Ready to get started?
            </h2>
            <p className="text-slate-400 font-medium dark:text-slate-400">
              Choose your role and explore the possibilities.
            </p>
          </div>
          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <button
              onClick={() => router.push("/auth/register")}
              className="flex-1 md:flex-none px-8 py-4 bg-[#FF385C] text-white font-black rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-95 cursor-pointer dark:bg-rose-600 dark:hover:bg-rose-700"
            >
              I'm a Landlord
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="flex-1 md:flex-none px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all active:scale-95 cursor-pointer dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700/80"
            >
              I'm a Tenant
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
