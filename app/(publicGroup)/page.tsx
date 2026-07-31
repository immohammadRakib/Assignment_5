// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search, Home, MapPin, DollarSign, ShieldCheck, Star } from "lucide-react";
// import Link from "next/link";

// // ডামি প্রিমিয়াম প্রপার্টি ডাটা (হোম পেজ আকর্ষণীয় করার জন্য)
// const featuredProperties = [
//   {
//     id: 1,
//     title: "Luxury Modern Villa",
//     location: "Gulshan, Dhaka",
//     price: "৳45,000",
//     image: "https://unsplash.com",
//     rating: "4.9",
//   },
//   {
//     id: 2,
//     title: "Cozy Family Apartment",
//     location: "Dhanmondi, Dhaka",
//     price: "৳28,000",
//     image: "https://unsplash.com",
//     rating: "4.7",
//   },
//   {
//     id: 3,
//     title: "Minimalist Studio Flat",
//     location: "Banani, Dhaka",
//     price: "৳18,000",
//     image: "https://unsplash.com",
//     rating: "4.8",
//   },
// ];

// export default async function HomePage() {
//   return (
//     <div className="flex-1 w-full bg-neutral-50/50">
      
//       {/* 🏡 Hero Section */}
//       <section className="relative bg-white border-b border-neutral-100 py-16 md:py-24 px-4 md:px-10 lg:px-20">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-full animate-pulse">
//             <Home className="w-3.5 h-3.5" /> Find Your Next Nest
//           </span>
//           <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 leading-[1.1]">
//             Discover Premium Rental{" "}
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
//               Properties Easily
//             </span>
//           </h1>
//           <p className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
//             RentNest connects tenants and landlords seamlessly. Safe payments, structured listings, and fully responsive management dashboard at your fingertips.
//           </p>

//           {/* 🔍 Premium Search Bar */}
//           <div className="max-w-2xl mx-auto mt-8 bg-white p-2 rounded-2xl shadow-xl border border-neutral-100 flex flex-col sm:flex-row gap-2 items-center">
//             <div className="flex items-center gap-2 px-3 w-full border-b sm:border-b-0 sm:border-r border-neutral-100 pb-2 sm:pb-0">
//               <MapPin className="text-gray-400 w-5 h-5 shrink-0" />
//               <Input placeholder="Where are you looking for?" className="border-none shadow-none focus-visible:ring-0 text-sm h-10 p-0" />
//             </div>
//             <Button className="w-full sm:w-auto h-11 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl px-6 flex items-center gap-2 shrink-0 cursor-pointer shadow-sm">
//               <Search className="w-4 h-4" /> Search
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* ⭐️ Featured Properties Section */}
//       <section className="py-16 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
//           <div>
//             <h2 className="text-2xl font-bold text-neutral-900">Featured Rental Listings</h2>
//             <p className="text-sm text-muted-foreground">Explore our most popular and verified premium properties</p>
//           </div>
//           <Link href="/properties">
//             <Button variant="outline" className="text-neutral-600 text-sm border-neutral-200 rounded-xl cursor-pointer">
//               View All Properties
//             </Button>
//           </Link>
//         </div>  

//         {/* Properties Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredProperties.map((property) => (
//             <div key={property.id} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
//               <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
//                 <img 
//                   src={property.image} 
//                   alt={property.title} 
//                   className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
//                 />
//                 <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
//                   <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {property.rating}
//                 </span>
//               </div>
//               <div className="p-5 space-y-3">
//                 <h3 className="font-bold text-gray-900 text-lg group-hover:text-rose-500 transition-colors">
//                   {property.title}
//                 </h3>
//                 <p className="text-xs text-neutral-500 flex items-center gap-1">
//                   <MapPin className="w-3.5 h-3.5 text-neutral-400" /> {property.location}
//                 </p>
//                 <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
//                   <span className="text-lg font-extrabold text-neutral-900 flex items-center">
//                     {property.price}<span className="text-xs font-normal text-neutral-400">/day</span>
//                   </span>
//                   <Link href={`/properties/${property.id}`}>
//                     <Button size="sm" className="bg-neutral-900 hover:bg-black text-white text-xs rounded-xl px-4 cursor-pointer shadow-none">
//                       Details
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🛡️ Trust / Features Section */}
//       <section className="bg-white border-t border-neutral-100 py-16 px-4 md:px-10 lg:px-20">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <h3 className="font-bold text-neutral-900 text-base">Verified Hosts</h3>
//             <p className="text-xs text-neutral-500 max-w-xs">All landlords are verified with real identity checking for maximum rental security.</p>
//           </div>
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl border border-pink-100">
//               <DollarSign className="w-6 h-6" />
//             </div>
//             <h3 className="font-bold text-neutral-900 text-base">Secured Gateway</h3>
//             <p className="text-xs text-neutral-500 max-w-xs">Mandatory secure integration with Stripe to handle real and smooth credit card processing [⚠].</p>
//           </div>
//           <div className="flex flex-col items-center text-center space-y-2">
//             <div className="p-3 bg-neutral-50 text-neutral-800 rounded-2xl border border-neutral-100">
//               <Search className="w-6 h-6" />
//             </div>
//             <h3 className="font-bold text-neutral-900 text-base">Easy Discovery</h3>
//             <p className="text-xs text-neutral-500 max-w-xs">Advanced role-based routing dashboard to effortlessly track your properties and daily rents [⚠].</p>
//           </div>
//         </div>
//       </section>
      
//     </div>
//   );
// }



// import React from "react";
// import Hero from "./home/hero";
// import FeaturedProperties from "./home/featuredProperties";
// import ValueSection from "./home/valueSection";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-white">
//       <Hero />
//       <FeaturedProperties />
//       <ValueSection />
      
//       {/* 🚀 ফাইনাল কল-টু-অ্যাকশন */}
//       <section className="py-20 text-center">
//         <div className="container mx-auto px-6">
//           <div className="bg-[#aac] p-12 md:p-20 rounded-[rem] text-white space-y-6 relative overflow-hidden">
//              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC]/20 blur-[px]" />
//              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Join the RentNest <br/> Family Today</h2>
//              <p className="text-slate-400 max-w-xl mx-auto font-medium">Over 5000+ people already found their dream homes. Why wait?</p>
//              <button className="mt-8 bg-white text-black px-12 py-4 rounded-full font-black hover:bg-[#FFC] hover:text-white transition-all cursor-pointer active:scale-95 shadow-lg">
//                 Get Started Now
//              </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Mail, Sparkles, Search, CalendarCheck, Home } from "lucide-react";
import Hero from "./home/hero";
import FeaturedProperties from "./home/featuredProperties";
import ValueSection from "./home/valueSection";
import HowItWorks from "./home/howWorks"





export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* ১. হিরো সেকশন */}
      <Hero />

      {/* ২. প্রপার্টি গ্রিড */}
      <FeaturedProperties />


      {/* ৪. ভ্যালু/বেনিফিট সেকশন */}
      <ValueSection />

      {/* ৩. প্রসেস সেকশন (নতুন) */}
      <HowItWorks />
      
      {/* ৫. ফাইনাল কল-টু-অ্যাকশন (কালার ও এনিমেশন ফিক্সড) */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-rose-500 via-[#FFC] to-rose-600 p-12 md:p-20 rounded-3xl text-white space-y-6 overflow-hidden shadow-2xl shadow-rose-500/10 border border-white/10"
          >
            {/* সফট গ্লো ইফেক্টস */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-white/15 rounded-full blur-[px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-900/30 rounded-full blur-[px]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              {/* লাইটার কমিউনিটি ট্যাগ */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white text-[px] font-bold backdrop-blur-md border border-white/20 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" /> 
                  Join Our Community
                </span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-">
                Join the RentNest <br className="hidden sm:inline" /> Family Today
              </h2>
              <p className="text-rose-50/90 text-sm md:text-base max-w-md mx-auto font-medium">
                Over 5,000+ people already found their dream homes. Let's find yours next.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 bg-white text-[#FFC] px-12 py-4 rounded-full font-black text-sm md:text-base hover:bg-rose-50 transition-all cursor-pointer active:scale-95 shadow-xl shadow-rose-950/10"
              >
                Get Started Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* কন্টাক্ট মডাল */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z- flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-100 z-10 space-y-6"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>

              <div className="text-left space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Get in Touch</h3>
                <p className="text-slate-500 text-xs font-medium">We'll reach out within 24 hours.</p>
              </div>

              {/* কন্টাক্ট ফর্ম শর্টকাট */}
              <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="space-y-4 text-left">
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FFC]/20 focus:border-[#FFC] outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FFC]/20 focus:border-[#FFC] outline-none" />
                <textarea rows={3} placeholder="Your Message" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FFC]/20 focus:border-[#FFC] outline-none resize-none" />
                <button type="submit" className="w-full py-4 bg-[#FFC] hover:bg-[#ECF] text-white font-black text-sm rounded-xl transition-all active:scale- flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

