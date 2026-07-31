"use client";
import { motion } from "framer-motion";
import { 
  UserPlus, Search, Eye, FileText,
  Hourglass, CreditCard, ShieldCheck, Star 
} from "lucide-react";
import { title } from "process";

export default function HowItWorks() {
  const steps = [
    { icon: UserPlus, title: "Register/Login", desc: "Start your journey" },
    { icon: Search, title: "Browse", desc: "Find your nest" },
    { icon: Eye, title: "View Details", desc: "Check every corner" },
    { icon: FileText, title: "Request", desc: "Submit the form" },
    { icon: Hourglass, title: "Approval", desc: "Wait for verification" },
    { icon: CreditCard, title: "Pay Now", desc: "Secure your spot" },
    { icon: ShieldCheck, title: "Redirect", desc: "Secure gateway" },
    { icon: Star, title: "Review", desc: "Share your experience" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: "100vw", skewX: -10 },
    visible: { 
      opacity: 1, x: 0, skewX: 0,
      transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 }
    }
  } as const;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-16 tracking-tight">Our Process</h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={cardVariants} className="group space-y-4">
              <div className="w-14 h-14 bg-rose-50 text-[#FFC] rounded-2xl flex items-center justify-center mx-auto transition-all group-hover:bg-[#FFC] group-hover:text-white group-hover:rotate-6">
                <step.icon className="w-6 h-6 stroke-[px]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{step.title}</h3>
                <p className="text-[px] text-slate-400 font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
