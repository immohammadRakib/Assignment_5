"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Zap } from "lucide-react";

export default function ValueSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      desc: "Every landlord and property is manually verified for your safety.",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      desc: "No more waiting. Book your favorite nest with a single click.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      desc: "All transactions are encrypted and secured through Stripe.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as const;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: "120vw",
      scale: 0.8,
      skewX: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      skewX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 22,
        mass: 0.5,
      },
    },
  } as const;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/60 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group relative bg-white p-8 rounded-2xl border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(255,56,92,0.1)] hover:border-rose-100/70 transition-all duration-300 text-left flex flex-col items-start gap-5 overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-12 h-12 bg-rose-50/70 text-[#FF385C] rounded-xl flex items-center justify-center transition-colors group-hover:bg-[#FF385C] group-hover:text-white duration-300">
                <item.icon className="w-6 h-6 stroke-[2.2px] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
