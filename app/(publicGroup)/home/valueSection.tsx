"use client";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Headphones, Zap } from "lucide-react";

export default function ValueSection() {
  const benefits = [
    { icon: ShieldCheck, title: "Verified Listings", desc: "Every landlord and property is manually verified for your safety." },
    { icon: Zap, title: "Instant Booking", desc: "No more waiting. Book your favorite nest with a single click." },
    { icon: CreditCard, title: "Secure Payments", desc: "All transactions are encrypted and secured through Stripe." },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center space-y-4"
            >
              <div className="w-16 h-16 bg-rose-50 text-[#FF385C] rounded-2xl flex items-center justify-center mx-auto">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
