import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { cookies } from "next/headers"; // 🛠️ কুকি রিড করার জন্য যোগ করা হলো
import jwt from "jsonwebtoken"; // 🛠️ টোকেন ডিকোড করার জন্য যোগ করা হলো
import { Navbar } from "@/components/shared/navbar"; // 🛠️ তোমার নেভবারের সঠিক পাথটি নিশ্চিত করে নিও
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ১. কুকি থেকে টোকেন নেওয়া
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // ২. ডিফল্ট ইউজার ডাটা অবজেক্ট (টাইপ এরর এড়াতে message সহ)
  let userData = { 
    success: false, 
    data: null, 
    message: "" 
  };

  // ৩. টোকেন থাকলে ডিকোড করে ডাটা রেডি করা
  if (token) {
    try {
      const decoded = jwt.decode(token) as any;
      if (decoded) {
        userData = {
          success: true,
          message: "User fetched successfully",
          data: {
            profile: {
              name: decoded.name || decoded.email.split("@")[0], // নাম না থাকলে ইমেইলের প্রথম অংশ নেবে
              email: decoded.email,
              role: decoded.role, // ADMIN, LANDLORD, TENANT
            }
          } as any
        };
      }
    } catch (error) {
      console.error("Layout token decoding failed:", error);
    }
  }

  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", inter.variable)} >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />
        
        {/* 🛠️ ডাইনামিক ইউজার ডাটাসহ নেভবার এখানে বসানো হলো */}
        <Navbar user={userData as any} /> 
        
        {/* মেইন কন্টেন্ট */}
        {children}
        
        {/* Footer */}
      </body>
    </html>
  );
}
