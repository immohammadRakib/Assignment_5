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
import CategorySlider from "./home/categorySlider"; 
import FeaturedProperties from "./home/featuredProperties";
import ValueSection from "./home/valueSection";
import HowItWorks from "./home/howWorks"
import JoinCommunity from "./home/joinCommunity";





export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* ১. হিরো সেকশন */}
      <Hero />
      <FeaturedProperties />
      
      <HowItWorks />
      <ValueSection />
      <JoinCommunity />
      
    </main>
  );
}

