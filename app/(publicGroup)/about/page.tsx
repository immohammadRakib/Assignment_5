"use client";

import { motion } from "framer-motion";
import { 
  Users, Award, Building2, MapPin, 
  Home, Store, Trees, Presentation, Layout 
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Verified Listings", value: "+" },
    { label: "Happy Tenants", value: "+" },
    { label: "Property Owners", value: "+" },
    { label: "Cities Covered", value: "+" },
  ];

  const categories = [
    { icon: Home, title: "Apartments & Houses" },
    { icon: Layout, title: "Studios & Flats" },
    { icon: Trees, title: "Playgrounds & Parks" },
    { icon: Presentation, title: "Convention Centers" },
    { icon: Store, title: "Commercial Stores" },
    { icon: Building2, Buildingtitle: "Office Spaces" },
  ];

  // 📦 ঝটকা স্পিড এনিমেশন (ডান থেকে ছুটে আসা)
  const cardVariants = {
    hidden: { opacity: 0, x: "100vw", skewX: -10 },
    visible: { 
      opacity: 1, x: 0, skewX: 0,
      transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 }
    }
  } as const;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* 🏔️ Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-[#FFC] font-black text-xs uppercase tracking-widest px-4 py-2 bg-rose-50 rounded-full">
              Our Vision
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
              We provide the <br /> <span className="text-[#FFC]">Perfect Space</span> <br /> for your lifestyle.
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg">
              Started with a vision by Md Abdur Rahman Rakib, RentNest is now a one-stop destination for renting anything from a cozy studio to a grand convention hall.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://unsplash.com" 
              alt="Our Story" 
              className="w-full h-[px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
          </motion.div>
        </div>

        {/* 📊 Stats Grid (থাস থাস এনিমেশন) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} variants={cardVariants}
              className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center space-y-2"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">{stat.value}</h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🏢 Category Showcase */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Any Space, Anytime.</h2>
            <p className="text-slate-500 font-medium">We specialize in a diverse range of rental properties.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group p-10 bg-white border border-slate-100 rounded-[rem] shadow-sm hover:shadow-2xl hover:border-rose-100 transition-all flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 bg-rose-50 text-[#FFC] rounded-2xl flex items-center justify-center group-hover:bg-[#FFC] group-hover:text-white transition-all duration-300">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{cat.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 👤 Founder Quote (Optional/Personalized) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 bg-slate-900 rounded-[rem] text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://wwwtransparenttexturescom/patterns/carbon-fibrepng')] opacity-10" />
          <h2 className="text-2xl md:text-4xl font-black text-white italic leading-snug relative z-10">
            "My mission is to simplify the rental journey for both landlords and tenants in Sylhet and beyond."
          </h2>
          <div className="relative z-10">
            <p className="text-[#FFC] font-black text-lg">Md Abdur Rahman Rakib</p>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Founder, RentNest</p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
