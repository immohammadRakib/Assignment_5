import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
               hostname: '//googleusercontent.com',  // এখানে যে ওয়েবসাইট থেকে ছবি নিচ্ছেন তার ডোমেইন দিন
      },
    ],
  },
};

export default nextConfig;
