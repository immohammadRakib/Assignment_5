"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  UserPlus,
  Search,
  Eye,
  FileEdit,
  Clock,
  CreditCard,
  ShieldCheck,
  Star,
  Rocket,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });

  const rocketTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSteps = 8;
    const currentStep = Math.floor(latest * totalSteps);
    if (latest <= 0.02) {
      setActiveIndex(-1);
    } else if (currentStep >= 0 && currentStep < totalSteps) {
      setActiveIndex(currentStep);
    }
  });

  const steps = [
    {
      icon: UserPlus,
      title: "Register / Login",
      desc: "Create a secure account on RentNest to unlock personalized dashboards, live messaging, and trusted rental status badges.",
      features: [
        "One-click OAuth Login",
        "Role Selection System",
        "Secure Token Issuance",
      ],
    },
    {
      icon: Search,
      title: "Browse Properties",
      desc: "Filter through premium real estate, flats, and luxury commercial locations using our dynamic search params map.",
      features: [
        "Smart Area Filtering",
        "Category Grid Taxonomy",
        "Live Availability Status",
      ],
    },
    {
      icon: Eye,
      title: "View Luxury Details",
      desc: "Examine high-definition photo galleries, legal building descriptions, rent configurations, and certified landlord ratings.",
      features: [
        "Verified Asset Checking",
        "Transparent Pricing",
        "Direct Contact Links",
      ],
    },
    {
      icon: FileEdit,
      title: "Submit Request",
      desc: "Apply for tenancy directly with structural form validations, rental period declarations, and cryptographic safeguarding.",
      features: [
        "Anti-Crash Forms",
        "Tenant Profile Linking",
        "Instant Landlord Alert",
      ],
    },
    {
      icon: Clock,
      title: "Wait for Approval",
      desc: "Landlords review submissions in real-time. Transparent tracking ensures you stay updated at every micro audit checkpoint.",
      features: [
        "Automated Queue Tracking",
        "Host ID Synchronization",
        "Live Push Notification",
      ],
    },
    {
      icon: CreditCard,
      title: "Pay Now Secured",
      desc: "Once accepted, fulfill lease liabilities securely. Real-time balance calculations protect payment flows.",
      features: [
        "Instant Invoice Generation",
        "Billing Summary Split",
        "Encrypted Handshake",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Payment Success",
      desc: "Process deposits smoothly through production gateways like Stripe. Immediate reservation token locks the property.",
      features: [
        "Stripe Secured API",
        "Digital Money Invoicing",
        "Instant Property Locking",
      ],
    },
    {
      icon: Star,
      title: "Publish Review",
      desc: "Share your honest premium stay testimonials to guide community tenants and earn verified profile badges.",
      features: [
        "Star-Rating Submission",
        "Immutable Feedback Logs",
        "Community Trust Markers",
      ],
    },
  ];
  return (
    <section
      ref={targetRef}
      className="py-32 bg-slate-50 relative overflow-hidden dark:bg-background transition-colors duration-300"
    >
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-rose-500/[0.04] rounded-full blur-[120px] animate-pulse dark:bg-rose-500/[0.06]" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px] dark:bg-indigo-500/[0.06]" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-28 space-y-4">
          <span className="text-[#FF385C] font-black text-xs uppercase tracking-[0.25em] bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400">
            Tenancy Flow Chart
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter dark:text-slate-100">
            Our Booking Journey
          </h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto text-sm md:text-base leading-relaxed dark:text-slate-400">
            Follow these streamlined structural phases to effortlessly discover
            and secure your next premium rental nest.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-20 pb-10">
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-slate-200 md:-translate-x-1/2 border-l border-dashed border-slate-300 dark:bg-slate-800 dark:border-slate-700" />

          <motion.div
            style={{ top: rocketTop, scale: rocketScale }}
            className="absolute left-1.5 md:left-1/2 z-20 md:-translate-x-1/2 -mt-1 transition-all duration-75"
          >
            <div className="w-10 h-10 bg-[#FF385C] rounded-full shadow-[0_0_20px_rgba(255,56,92,0.4)] flex items-center justify-center border-4 border-white dark:border-slate-900 dark:shadow-rose-950/60">
              <Rocket className="w-4 h-4 text-white transform -rotate-45" />
            </div>
          </motion.div>
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;
            const isStepActive = i === activeIndex;

            const isDarkMode =
              typeof window !== "undefined" &&
              document.documentElement.classList.contains("dark");

            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center w-full relative pl-14 pr-4 md:pl-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <motion.div
                  animate={{
                    scale: isStepActive ? 1.025 : 1,
                    opacity: activeIndex >= i ? 1 : 0.4,
                    backgroundColor: isStepActive
                      ? isDarkMode
                        ? "rgba(30, 41, 59, 0.9)"
                        : "rgba(255, 255, 255, 0.95)"
                      : isDarkMode
                        ? "rgba(15, 23, 42, 0.3)"
                        : "rgba(255, 255, 255, 0.4)",
                    borderColor: isStepActive
                      ? "rgba(255, 56, 92, 0.4)"
                      : isDarkMode
                        ? "rgba(51, 65, 85, 0.5)"
                        : "rgba(226, 232, 240, 0.8)",
                    boxShadow: isStepActive
                      ? isDarkMode
                        ? "0 20px 25px -5px rgba(255, 56, 92, 0.15)"
                        : "0 20px 25px -5px rgba(255, 56, 92, 0.1)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.01)",
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className={`w-full md:w-[45%] md:ml-0 backdrop-blur-md border p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-4 group transition-colors duration-300 ${isEven ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}
                >
                  <motion.div
                    animate={{
                      backgroundColor: isStepActive
                        ? "#FF385C"
                        : isDarkMode
                          ? "#311c24"
                          : "#FFF5F5",
                      color: isStepActive ? "#FFFFFF" : "#FF385C",
                      rotate: isStepActive ? [0, 8, -8, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-rose-100/50 dark:border-rose-900/20"
                  >
                    <Icon className="w-5 h-5 stroke-[2.5px]" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-black tracking-tight transition-colors duration-300 ${isStepActive ? "text-[#FF385C] dark:text-rose-400" : "text-slate-800 dark:text-slate-200"}`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-3 ml-14 md:ml-0 border-t border-slate-100 w-full text-left dark:border-slate-800/60">
                    {step.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-[11px] font-bold ${isStepActive ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"} ${isEven ? "md:justify-end" : "md:justify-start"}`}
                      >
                        {!isEven && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF385C]/60 shrink-0 dark:text-rose-500/60" />
                        )}
                        <span>{feat}</span>
                        {isEven && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF385C]/60 shrink-0 hidden md:block dark:text-rose-500/60" />
                        )}
                        {isEven && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF385C]/60 shrink-0 md:hidden dark:text-rose-500/60" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
