"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight dark:text-slate-100">
                Let's talk about <br /> your{" "}
                <span className="text-[#FF385C] dark:text-rose-400">
                  Next Place
                </span>
              </h1>
              <p className="text-slate-500 font-medium max-w-md leading-relaxed dark:text-slate-400">
                Have questions about a property or our process? We're here to
                help you find the perfect nest.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email us", value: "rentnest@gmail.com" },
                { icon: Phone, label: "Call us", value: "+880 1875068566 " },
                {
                  icon: MapPin,
                  label: "Visit us",
                  value: "Sylhet, Bangladesh",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#FF385C] group-hover:bg-[#FF385C] group-hover:text-white transition-all dark:bg-slate-900 dark:text-rose-400 dark:group-hover:bg-rose-600 dark:group-hover:text-white border dark:border-slate-800">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-rose-500/5 border border-slate-100 relative overflow-hidden dark:bg-card dark:border-border"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 blur-3xl -z-10 dark:bg-rose-950/20" />

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 dark:text-slate-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-100 dark:focus:border-rose-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 dark:text-slate-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-100 dark:focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-100 dark:focus:border-rose-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="What can we help you with?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all resize-none dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-100 dark:focus:border-rose-500"
                />
              </div>

              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="w-full py-4 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-rose-500/20 dark:bg-rose-600 dark:hover:bg-rose-700 dark:shadow-rose-950/20"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
