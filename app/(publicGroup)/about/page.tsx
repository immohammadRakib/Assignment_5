// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { 
//   ShieldCheck, 
//   Heart, 
//   Users, 
//   Sparkles, 
//   Building2, 
//   Globe, 
//   Briefcase, 
//   Terminal, 
//   Mail, 
//   CheckCircle2 
// } from "lucide-react";
// import Link from "next/link";

// export default function AboutPage() {
//   const stats = [
//     { label: "Verified Nests", value: "35K+" },
//     { label: "Happy Tenants", value: "10M+" },
//     { label: "Active Cities", value: "500+" },
//     { label: "Safety Score", value: "99%" },
//   ];

//   const values = [
//     { 
//       icon: ShieldCheck, 
//       title: "Total Security", 
//       desc: "Every listing and landlord undergoes a rigorous -step verification process to ensure a safe community" 
//     },
//     { 
//       icon: Heart, 
//       title: "Tenant First", 
//       desc: "Our platform is optimized to find the most comfortable and budget-friendly nests matching your lifestyle" 
//     },
//     { 
//       icon: Globe, 
//       title: "Seamless Search", 
//       desc: "Find your preferred location using our high-speed filtered search algorithms with zero latency" 
//     }
//   ];

//   return (
//     <main className="min-h-screen bg-white">
      
//       <section className="relative pt-24 pb-20 overflow-hidden bg-slate-50">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[px]" />
        
//         <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[#FF385C] text-xs font-black uppercase tracking-widest mb-6">
//               <Building2 className="w-4 h-4" /> About RentNest
//             </span>
//             <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight">
//               Reimagining the way <br /> 
//               you find your <span className="text-[#FF385C]">Home</span>.
//             </h1>
//             <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
//               RentNest is more than just a listing site. We are a community-driven ecosystem 
//               designed to bridge the gap between premium landlords and verified tenants.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
//             {stats.map((stat, i) => (
//               <motion.div 
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.2 + i * 0.1 }}
//                 className="text-center"
//               >
//                 <p className="text-3xl md:text-4xl font-black text-[#FF385C]">{stat.value}</p>
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-24">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16 space-y-3">
//             <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Why Choose Us?</h2>
//             <p className="text-slate-500 font-medium">Built with trust, security, and premium user experience.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {values.map((value, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10 }}
//                 className="p-10 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-rose-500/5 text-center space-y-5 transition-all"
//               >
//                 <div className="w-16 h-16 bg-rose-50 text-[#FF385C] rounded-2xl flex items-center justify-center mx-auto border border-rose-100/50">
//                   <value.icon className="w-8 h-8 stroke-[px]" />
//                 </div>
//                 <h3 className="text-xl font-black text-slate-800">{value.title}</h3>
//                 <p className="text-sm text-slate-500 font-medium leading-relaxed">{value.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-slate-50 border-t border-slate-100">
//         <div className="container mx-auto px-6">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="max-w-5xl mx-auto bg-white rounded-2xl p-8 md:p-16 border border-slate-200 shadow-2xl shadow-rose-500/5 flex flex-col md:flex-row items-center gap-12"
//           >
//             <div className="w-48 h-48 md:w-64 md:h-64 rounded-[rem] bg-rose-50 border-4 border-white shadow-xl overflow-hidden flex-shrink-0 rotate-3 hover:rotate-0 transition-transform duration-500">
//                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br text-[#FF385C] to-pink-600">
//                  <Users className="w-20 h-20 text-white opacity-40" />
//                </div>
//             </div>

//             <div className="space-y-6 text-center md:text-left flex-1">
//               <div>
//                 <span className="text-[#FF385C] font-black text-xs uppercase tracking-widest mb-2 block">Lead Software Engineer</span>
//                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Md Abdur Rahman Rakib</h2>
//                 <p className="mt-4 text-slate-500 font-medium leading-relaxed">
//                   Hi, I'm Rakib! A passionate full-stack developer based in Sylhet, Bangladesh. 
//                   I built RentNest to solve the complexities of modern-day rental management, 
//                   focusing on scalability, performance, and world-class UI design.
//                 </p>
//               </div>

//               <div className="flex flex-wrap justify-center md:justify-start gap-4">
//                 {[
//                   { icon: Terminal, label: "GitHub", link: "#" },
//                   { icon: Briefcase, label: "LinkedIn", link: "#" },
//                   { icon: Mail, label: "Contact", link: "mailto:rakib@examplecom" }
//                 ].map((social, i) => (
//                   <a 
//                     key={i} 
//                     href={social.link} 
//                     className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-[#FF385C] bg-white hover:bg-[#FF385C] hover:text-white border border-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
//                   >
//                     <social.icon className="w-4 h-4" /> {social.label}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-24 text-center">
//         <div className="container mx-auto px-6 space-y-6">
//           <Sparkles className="w-10 h-10 text-[#FF385C] mx-auto animate-pulse" />
//           <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Ready to find your nest?</h2>
//           <p className="text-slate-500 font-medium max-w-sm mx-auto">Discover your dream nest or list your property with RentNest today.</p>
//           <Link href="/properties">
//             <button className="mt-8 px-12 py-4 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-black rounded-full transition-all shadow-xl shadow-rose-500/20 active:scale-95 cursor-pointer">
//               Explore All Listings
//             </button>
//           </Link>
//         </div>
//       </section>

//     </main>
//   );
// }




"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Sparkles, Building2, Globe, Briefcase, Terminal, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "Verified Nests", value: "35K+" },
    { label: "Happy Tenants", value: "10M+" },
    { label: "Active Cities", value: "500+" },
    { label: "Safety Score", value: "99%" },
  ];

  const values = [
    { icon: ShieldCheck, title: "Total Security", desc: "Every listing and landlord undergoes a rigorous verification process to ensure a safe community" },
    { icon: Heart, title: "Tenant First", desc: "Our platform is optimized to find the most comfortable and budget-friendly nests matching your lifestyle" },
    { icon: Globe, title: "Seamless Search", desc: "Find your preferred location using our high-speed filtered search algorithms with zero latency" }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-background transition-colors duration-300">
      {/* হিরো সেকশন */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-900/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] dark:bg-rose-500/10" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[#FF385C] text-xs font-black uppercase tracking-widest mb-6 dark:bg-rose-950/30 dark:border-rose-900/40 dark:text-rose-400">
              <Building2 className="w-4 h-4" /> About RentNest
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight dark:text-slate-100">
              Reimagining the way <br /> you find your <span className="text-[#FF385C] dark:text-rose-400">Home</span>.
            </h1>
            <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed dark:text-slate-400">
              RentNest is more than just a listing site. We are a community-driven ecosystem designed to bridge the gap between premium landlords and verified tenants.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-[#FF385C] dark:text-rose-400">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 dark:text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* হোয়াই চুজ আস সেকশন */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter dark:text-slate-100">Why Choose Us?</h2>
            <p className="text-slate-500 font-medium dark:text-slate-400">Built with trust, security, and premium user experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="p-10 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-rose-500/5 text-center space-y-5 transition-all dark:bg-card dark:border-border dark:shadow-rose-950/10">
                <div className="w-16 h-16 bg-rose-50 text-[#FF385C] rounded-2xl flex items-center justify-center mx-auto border border-rose-100/50 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50">
                  <value.icon className="w-8 h-8 stroke-[2px]" />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-200">{value.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed dark:text-slate-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* মেকার প্রোফাইল কার্ড */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 dark:bg-slate-900/30 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto bg-white rounded-2xl p-8 md:p-16 border border-slate-200 shadow-2xl shadow-rose-500/5 flex flex-col md:flex-row items-center gap-12 dark:bg-card dark:border-border">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-rose-50 border-4 border-white shadow-xl overflow-hidden flex-shrink-0 rotate-3 hover:rotate-0 transition-transform duration-500 dark:bg-rose-950/30 dark:border-slate-800">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-600">
                <Users className="w-20 h-20 text-white opacity-40" />
              </div>
            </div>
            <div className="space-y-6 text-center md:text-left flex-1">
              <div>
                <span className="text-[#FF385C] font-black text-xs uppercase tracking-widest mb-2 block dark:text-rose-400">Lead Software Engineer</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter dark:text-slate-100">Md Abdur Rahman Rakib</h2>
                <p className="mt-4 text-slate-500 font-medium leading-relaxed dark:text-slate-400">
                  Hi, I'm Rakib! A passionate full-stack developer based in Sylhet, Bangladesh. I built RentNest to solve the complexities of modern-day rental management.
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {[
                  { icon: Terminal, label: "GitHub", link: "#" },
                  { icon: Briefcase, label: "LinkedIn", link: "#" },
                  { icon: Mail, label: "Contact", link: "mailto:rakib@example.com" }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#FF385C] hover:bg-[#FF385C] hover:text-white border border-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white">
                    <social.icon className="w-4 h-4" /> {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* কল টু অ্যাকশন */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 space-y-6">
          <Sparkles className="w-10 h-10 text-[#FF385C] mx-auto animate-pulse dark:text-rose-400" />
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter dark:text-slate-100">Ready to find your nest?</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto dark:text-slate-400">Discover your dream nest or list your property with RentNest today.</p>
          <Link href="/properties">
            <button className="mt-8 px-12 py-4 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-black rounded-full transition-all shadow-xl shadow-rose-500/20 active:scale-95 cursor-pointer dark:bg-rose-600 dark:hover:bg-rose-700 dark:shadow-rose-950/20">
              Explore All Listings
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}









