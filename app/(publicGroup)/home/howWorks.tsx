

"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { UserPlus, Search, Eye, FileEdit, Clock, CreditCard, ShieldCheck, Star, Rocket } from "lucide-react";

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 🚀 ১. স্ক্রোল প্রগ্রেস ট্র্যাক করা (অফসেট আরও স্ট্রং করা হলো যেন রকেটের চাকা ঘোরে)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });

  // 🚀 ২. রকেটের একদম ডাইনামিক মুভমেন্ট (Top পার্সেন্টেজ লজিক)
  const rocketTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1]);

  // 🚀 ৩. লাইভ স্টেপ অন-অফ এবং বাউন্স লজিক
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
    { icon: UserPlus, title: "Register / Login", desc: "Join the premium RentNest family instantly." },
    { icon: Search, title: "Browse Properties", desc: "Find your perfect verified dream nest." },
    { icon: Eye, title: "View Luxury Details", desc: "Check every corner, amenities & facilities." },
    { icon: FileEdit, title: "Submit Request", desc: "Apply seamlessly with structural validation." },
    { icon: Clock, title: "Wait for Approval", desc: "Quick verification from our secure landlords." },
    { icon: CreditCard, title: "Pay Now Secured", desc: "Book instantly using encrypted credit cards." },
    { icon: ShieldCheck, title: "Payment Success", desc: "Processed smoothly through Stripe gateway." },
    { icon: Star, title: "Publish Review", desc: "Share your honest premium stay experience." },
  ];

  return (
    <section ref={targetRef} className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* হেডার */}
        <div className="text-center mb-28 space-y-3">
          <span className="text-[#FF385C] font-black text-xs uppercase tracking-[0.2em]">Step-by-Step Guide</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Our Booking Journey
          </h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto text-sm">
            Follow these simple phases to successfully lock your next rental nest securely.
          </p>
        </div>

        {/* 🛣️ টাইমলাইন কন্টেইনার */}
        <div className="relative grid grid-cols-1 gap-28 pb-10">
          
          {/* মাঝখানের ভার্টিক্যাল ড্যাশড ট্র্যাক লাইন */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-slate-100 md:-translate-x-1/2 border-l border-dashed border-slate-200" />

          {/* 🚀 মুভিং রকেট ইন্ডিকেটর (ফিক্সড ডাইনামিক টপ আর্কিটেকচার) */}
          <motion.div 
            style={{ top: rocketTop, scale: rocketScale }} 
            className="absolute left-2 md:left-1/2 z-20 md:-translate-x-1/2 -mt-2 transition-all duration-75"
          >
            {/* এয়ারবিএনবি রোজ কালার গ্লোয়িং রকেট */}
            <div className="w-10 h-10 bg-[#FF385C] rounded-full shadow-[0_0_20px_rgba(255,56,92,0.4)] flex items-center justify-center border-4 border-white">
              <Rocket className="w-4 h-4 text-white transform -rotate-45 animate-pulse" />
            </div>
          </motion.div>

          {/* 📋 স্টেপস রেন্ডারিং */}
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;
            const isStepActive = i === activeIndex;

            return (
              <div 
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* আইকন ও টেক্সট কন্টেন্ট */}
                <motion.div 
                  animate={{ 
                    scale: isStepActive ? 1.04 : 1,
                    opacity: activeIndex >= i ? 1 : 0.35
                  }}
                  transition={{ type: "spring", stiffness: 90 }}
                  className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                    isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'
                  } flex flex-col gap-2.5`}
                >
                  {/* আইকন বক্স */}
                  <motion.div 
                    animate={{
                      backgroundColor: isStepActive ? "#FF385C" : "#FFF5F5",
                      color: isStepActive ? "#FFFFFF" : "#FF385C",
                      rotate: isStepActive ? [0, 8, -8, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-rose-100/50"
                  >
                    <Icon className="w-5 h-5 stroke-[2.5px]" />
                  </motion.div>
                  
                  {/* টেক্সট */}
                  <div className="space-y-1">
                    <h3 className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                      isStepActive ? 'text-[#FF385C]' : 'text-slate-800'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* মিডল স্পেসার */}
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

