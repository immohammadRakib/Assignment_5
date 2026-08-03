// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Sparkles, ArrowRight } from "lucide-react";
// import Link from "next/link";

// export default function JoinCommunity() {
//   return (
//     <section className="py-24 text-center bg-white">
//       <div className="container mx-auto px-6 max-w-5xl">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative bg-gradient-to-br from-rose-50/50 to-rose-200/50 p-12 md:p-20 rounded-[2rem] shadow-2xl text-slate-900 overflow-hidden shadow-2xl shadow-rose-500/5 border border-rose-100"
//         >
//           <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-[px] pointer-events-none" />
//           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-300/10 rounded-full blur-[px] pointer-events-none" />

//           <div className="relative z-10 max-w-xl mx-auto space-y-8">
//             <div className="flex justify-center">
//               <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 text-xs font-black uppercase tracking-widest border border-rose-200 backdrop-blur-md">
//                 <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
//                 RentNest Community
//               </span>
//             </div>

//             <div className="space-y-4">
//               <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">
//                 Join the RentNest <br /> Family Today
//               </h2>
//               <p className="text-slate-500 text-sm md:text-lg font-medium max-w-sm mx-auto leading-relaxed">
//                 Unlock premium listings and secure stays with our trusted
//                 community of 5,000+ members.
//               </p>
//             </div>

//             <div className="pt-4">
//               <Link href="/auth/register" className="inline-block">
//                 <motion.button
//                   animate={{
//                     rotate: [0, -2, 2, -2, 2, 0],
//                     scale: [1, 1.05, 1],
//                   }}
//                   transition={{
//                     duration: 0.6,
//                     repeat: Infinity,
//                     repeatDelay: 2.5,
//                     ease: "easeInOut",
//                   }}
//                   whileHover={{ scale: 1.08 }}
//                   whileTap={{ scale: 0.92 }}
//                   className="px-12 h-16 text-white font-black text-lg rounded-full transition-all duration-300 shadow-xl bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center gap-3 cursor-pointer group border border-white/20 backdrop-blur-sm"
//                 >
//                   <span>Get Started Now</span>
//                   <ArrowRight className="w-5 h-5 stroke-[px] group-hover:translate-x-2 transition-transform" />
//                 </motion.button>
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinCommunity() {
  return (
    // 🎯 মেইন সেকশন ব্যাকগ্রাউন্ড - ডার্ক মোডে আপনার গ্লোবাল থিমের সাথে ব্লেন্ড হবে
    <section className="py-24 text-center bg-white dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* 🎯 মেইন ব্যানার কার্ড - ডার্ক মোডে এটিকে একটি প্রিমিয়াম ডার্ক রোজ গ্রাডিয়েন্ট এবং শ্যাড-সিএন বর্ডার দেওয়া হয়েছে */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-rose-50/50 to-rose-200/50 p-12 md:p-20 rounded-[2rem] shadow-2xl text-slate-900 overflow-hidden border border-rose-100 dark:from-rose-950/20 dark:to-slate-900/40 dark:border-slate-800 dark:shadow-black/40"
        >
          {/* ব্যাকগ্রাউন্ড গ্লো ফ্লিপারসমূহ */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-[100px] pointer-events-none dark:bg-rose-900/10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-300/10 rounded-full blur-[100px] pointer-events-none dark:bg-rose-950/10" />

          <div className="relative z-10 max-w-xl mx-auto space-y-8">
            
            {/* কম্যুনিটি ব্যাজ ট্যাগ */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 text-xs font-black uppercase tracking-widest border border-rose-200 backdrop-blur-md dark:bg-rose-950/50 dark:border-rose-900/50 dark:text-rose-400">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500 dark:text-rose-400 dark:fill-rose-400" /> 
                RentNest Community
              </span>
            </div>

            {/* টেক্সট মেসেজ এরিয়া */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900 dark:text-slate-100">
                Join the RentNest <br /> Family Today
              </h2>
              <p className="text-slate-500 text-sm md:text-lg font-medium max-w-sm mx-auto leading-relaxed dark:text-slate-400">
                Unlock premium listings and secure stays with our trusted community of 5,000+ members.
              </p>
            </div>

            {/* অ্যাকশন বাটন উইথ পালস অ্যানিমেশন */}
            <div className="pt-4">
              <Link href="/auth/register" className="inline-block">
                <motion.button
                  animate={{
                    rotate: [0, -2, 2, -2, 2, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="px-12 h-16 text-white font-black text-lg rounded-full transition-all duration-300 shadow-xl bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center gap-3 cursor-pointer group border border-white/20 backdrop-blur-sm dark:bg-rose-600 dark:hover:bg-rose-700 dark:shadow-rose-950/20"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5px] group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
