"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h1 className="text-5xl font-black">Find Your Dream Nest</h1>
    </motion.div>
  );
}
