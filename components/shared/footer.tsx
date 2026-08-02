// import Link from "next/link";
// import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100 mt-24 md:mt-32 pt-16 pb-8 px-4 md:px-10 lg:px-20 select-none">
//       <div className="max-w-7xl mx-auto">
        
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-neutral-200/60">
          
//           <div className="md:col-span-5 space-y-5">
//             <Link href="/" className="inline-block">
//               <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 tracking-tight">
//                 RentNest
//               </span>
//             </Link>
//             <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
//               Discover a reimagined way of finding your next home. We connect premium tenants with verified hosts seamlessly across verified real properties.
//             </p>
            
//             <div className="flex items-center gap-3 pt-2">
//               {["FB", "X", "IG", "LN"].map((network) => (
//                 <a
//                   key={network}
//                   href="#"
//                   className="w-8 h-8 rounded-xl bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-sm flex items-center justify-center transition-all duration-200"
//                 >
//                   {network}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="md:col-span-2 space-y-4">
//             <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Explore</h4>
//             <ul className="space-y-2.5 text-sm text-neutral-500">
//               <li><Link href="/" className="hover:text-rose-500 transition-colors flex items-center group">Home <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
//               <li><Link href="/properties" className="hover:text-rose-500 transition-colors flex items-center group">Properties <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
//               <li><Link href="/about" className="hover:text-rose-500 transition-colors flex items-center group">About Us <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
//             </ul>
//           </div>

//           <div className="md:col-span-2 space-y-4">
//             <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Legal</h4>
//             <ul className="space-y-2.5 text-sm text-neutral-500">
//               <li><Link href="/contact" className="hover:text-rose-500 transition-colors">Contact</Link></li>
//               <li><Link href="/faq" className="hover:text-rose-500 transition-colors">FAQs</Link></li>
//               <li><span className="cursor-pointer hover:text-rose-500 transition-colors">Privacy Policy</span></li>
//               <li><span className="cursor-pointer hover:text-rose-500 transition-colors">Terms of Use</span></li>
//             </ul>
//           </div>

//           <div className="md:col-span-3 space-y-4 bg-white p-5 rounded-2xl border border-neutral-200/60 shadow-sm">
//             <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Get In Touch</h4>
//             <ul className="space-y-3 text-xs text-neutral-500">
//               <li className="flex items-start gap-2.5">
//                 <MapPin size={15} className="text-rose-500 shrink-0 mt-0.5" />
//                 <span className="leading-relaxed">Gulshan-2, Dhaka, Bangladesh</span>
//               </li>
//               <li className="flex items-center gap-2.5">
//                 <Phone size={15} className="text-rose-500 shrink-0" />
//                 <span>+880 1234-567890</span>
//               </li>
//               <li className="flex items-center gap-2.5">
//                 <Mail size={15} className="text-rose-500 shrink-0" />
//                 <span className="truncate">support@rentnest.com</span>
//               </li>
//             </ul>
//           </div>

//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left">
//           <p className="text-xs text-neutral-400 font-medium">
//             &copy; {currentYear} RentNest Inc. All rights reserved.
//           </p>
//           <div className="text-[11px] text-neutral-400 font-semibold bg-neutral-100/80 border border-neutral-200 px-3 py-1 rounded-full">
//             Programming Hero Level-2 Assignment 5
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }





"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    // 🎯 মেইন ফুটার ব্যাকগ্রাউন্ড ডার্ক মোডে গাঢ় গ্রাডিয়েন্ট শেড নিবে
    <footer className="w-full bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100 mt-24 md:mt-32 pt-16 pb-8 px-4 md:px-10 lg:px-20 select-none dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* গ্রিড কন্টেইনার */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-neutral-200/60 dark:border-slate-800">
          
          {/* ব্র্যান্ডিং সেকশন */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 tracking-tight dark:from-rose-400 dark:to-pink-500">
                RentNest
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm dark:text-slate-400">
              Discover a reimagined way of finding your next home. We connect premium tenants with verified hosts seamlessly across verified real properties.
            </p>
            {/* সোশ্যাল আইকনসমূহ - ডার্ক মোডে ব্যাকগ্রাউন্ড চেঞ্জ হবে */}
            <div className="flex items-center gap-3 pt-2">
              {["FB", "X", "IG", "LN"].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="w-8 h-8 rounded-xl bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-sm flex items-center justify-center transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:border-rose-900/50"
                >
                  {network}
                </a>
              ))}
            </div>
          </div>

          {/* এক্সপ্লোর লিংকস */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-rose-500 transition-colors flex items-center group dark:hover:text-rose-400">
                  Home <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-rose-500 transition-colors flex items-center group dark:hover:text-rose-400">
                  Properties <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-500 transition-colors flex items-center group dark:hover:text-rose-400">
                  About Us <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* লিগ্যাল লিংকস */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-slate-200">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-500 dark:text-slate-400">
              <li><Link href="/contact" className="hover:text-rose-500 transition-colors dark:hover:text-rose-400">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-rose-500 transition-colors dark:hover:text-rose-400">FAQs</Link></li>
              <li><span className="cursor-pointer hover:text-rose-500 transition-colors dark:hover:text-rose-400">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-rose-500 transition-colors dark:hover:text-rose-400">Terms of Use</span></li>
            </ul>
          </div>

          {/* 🎯 গ্লসি কন্টাক্ট বক্স - ডার্ক মোডে স্লট-৮০০ শেড ও ম্যাচিং বর্ডার নিবে */}
          <div className="md:col-span-3 space-y-4 bg-white p-5 rounded-2xl border border-neutral-200/60 shadow-sm dark:bg-slate-800/60 dark:border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-slate-200">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs text-neutral-500 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-rose-500 shrink-0 mt-0.5 dark:text-rose-400" />
                <span className="leading-relaxed">Gulshan-2, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-rose-500 shrink-0 dark:text-rose-400" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-rose-500 shrink-0 dark:text-rose-400" />
                <span className="truncate">support@rentnest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* বটম সাব-ফুটার কপিরাইট এরিয়া */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left">
          <p className="text-xs text-neutral-400 font-medium dark:text-slate-500">
            &copy; {currentYear} RentNest Inc. All rights reserved.
          </p>
          {/* অ্যাসাইনমেন্ট ব্যাজ - ডার্ক মোড কালার টিউনিং */}
          <div className="text-[11px] text-neutral-400 font-semibold bg-neutral-100/80 border border-neutral-200 px-3 py-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
            Programming Hero Level-2 Assignment 5
          </div>
        </div>

      </div>
    </footer>
  );
}
