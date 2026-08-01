"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinCommunity() {
  return (
    <section className="py-24 text-center bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-rose-50/50 to-rose-200/50 p-12 md:p-20 rounded-[2rem] shadow-2xl text-slate-900 overflow-hidden shadow-2xl shadow-rose-500/5 border border-rose-100"
        >
          {/* গ্লাসমরফিজম ডেকোরেশন */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-[px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-300/10 rounded-full blur-[px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-8">
            {/* মাইক্রো ট্যাগ */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 text-xs font-black uppercase tracking-widest border border-rose-200 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                RentNest Community
              </span>
            </div>

            {/* টেক্সট সেকশন */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">
                Join the RentNest <br /> Family Today
              </h2>
              <p className="text-slate-500 text-sm md:text-lg font-medium max-w-sm mx-auto leading-relaxed">
                Unlock premium listings and secure stays with our trusted community of 5,000+ members.
              </p>
            </div>

            {/* 🚀 Rose Glass Button with Snappy Shake */}
            <div className="pt-4">
              <Link href="/contact" className="inline-block">
                <motion.button
                  // ⚡ [ফিক্সড লজিক] ঝাঁকুনি এবং পালস ইফেক্ট
                  animate={{
                 rotate: [0, -2, 2, -2, 2, 0], // হালকা রোটেশন দিয়ে জ্যাকি জ্যাকি ইফেক্ট
                    scale: [1, 1.05, 1], 
                  }}
                  transition={{
                    duration: 0.6,      // অ্যানিমেশন কত দ্রুত হবে
                    repeat: Infinity,   // অনন্তকাল লুপ হবে
                    repeatDelay: 2.5,   // প্রতি ২.৫ সেকেন্ড বিরতি দিয়ে কাঁপবে
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.08 }} // মাউস নিলে বড় হবে
                  whileTap={{ scale: 0.92 }}   // ক্লিক করলে ডেবে যাবে
                  className="px-12 h-16 text-white font-black text-lg rounded-full transition-all duration-300 shadow-xl bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center gap-3 cursor-pointer group border border-white/20 backdrop-blur-sm"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 stroke-[px] group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
