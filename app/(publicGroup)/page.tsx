
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
      <Hero />
      <FeaturedProperties />
      <CategorySlider/>
      <HowItWorks />
      <ValueSection />
      <JoinCommunity />
    </main>
  );
}

