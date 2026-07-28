import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 🛠️ mt-24 md:mt-32 দিয়ে হোম পেজের কন্টেন্ট থেকে ফুটারের দূরত্ব বাড়ানো হয়েছে
    <footer className="w-full bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100 mt-24 md:mt-32 pt-16 pb-8 px-4 md:px-10 lg:px-20 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* উপরের কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-neutral-200/60">
          
          {/* ব্র্যান্ডিং এবং বায়ো (কলাম স্প্যান: ৫) */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 tracking-tight">
                RentNest
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
              Discover a reimagined way of finding your next home. We connect premium tenants with verified hosts seamlessly across verified real properties.
            </p>
            
            {/* মডার্ন সোশ্যাল লিংক ডিজাইন */}
            <div className="flex items-center gap-3 pt-2">
              {["FB", "X", "IG", "LN"].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="w-8 h-8 rounded-xl bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-sm flex items-center justify-center transition-all duration-200"
                >
                  {network}
                </a>
              ))}
            </div>
          </div>

          {/* কুইক লিংক (কলাম স্প্যান: ২) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Explore</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-rose-500 transition-colors flex items-center group">Home <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/properties" className="hover:text-rose-500 transition-colors flex items-center group">Properties <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/about" className="hover:text-rose-500 transition-colors flex items-center group">About Us <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/premium" className="hover:text-rose-500 transition-colors flex items-center group">Premium <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* পলিসি ও সাপোর্ট (কলাম স্প্যান: ২) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Legal</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/contact" className="hover:text-rose-500 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-rose-500 transition-colors">FAQs</Link></li>
              <li><span className="cursor-pointer hover:text-rose-500 transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-rose-500 transition-colors">Terms of Use</span></li>
            </ul>
          </div>

          {/* কন্টাক্ট ইনফো কার্ড (কলাম স্প্যান: ৩) */}
          <div className="md:col-span-3 space-y-4 bg-white p-5 rounded-2xl border border-neutral-200/60 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Get In Touch</h4>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Gulshan-2, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-rose-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-rose-500 shrink-0" />
                <span className="truncate">support@rentnest.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* নিচের কপিরাইট পার্ট */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left">
          <p className="text-xs text-neutral-400 font-medium">
            &copy; {currentYear} RentNest Inc. All rights reserved.
          </p>
          <div className="text-[11px] text-neutral-400 font-semibold bg-neutral-100/80 border border-neutral-200 px-3 py-1 rounded-full">
            Programming Hero Level-2 Assignment 5
          </div>
        </div>

      </div>
    </footer>
  );
}
